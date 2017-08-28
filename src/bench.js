import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules } from 'react-native';
import FriendsRe from '../lib/js/re/friends.js';
import FriendsJS from './friends.js';
import FriendsFJS from './ffriends.js';
const ReasonNative = NativeModules.ReasonNative;

function bench (name, n, fn) {
  var start = new Date().getTime();
  let result;
  for (let i=0; i<n; ++i) {
    result = fn()
  }
  const end = new Date().getTime();
  var time = end - start;
  return time;
}

const row = ({title, time}, i) => (
  <View style={styles.rowContainer} key={i}>
      <Text style={[styles.rowText]}>{title}</Text>
      <Text style={[styles.rowText]}>{time}</Text>
  </View>
);

export default class BenchMark extends Component {
  N = 100000;

  constructor() {
    super();
    this.state = {
      items: []
    };
  }
 
  runBenchmark(label, N, benchmark) {
    requestAnimationFrame(() => {
        const time = bench(label, N, benchmark);
        this.setState((previousState) => (
        { items: [...previousState.items, {title: label, time}]})
        );
    })
  }

  async runNativeBenchmark() {
    var start = new Date().getTime();
    await ReasonNative.runBenchmark();
    const end = new Date().getTime();
    const time = end - start;
    this.setState((previousState) => (
        { items: [...previousState.items, {title: 'ReasonNative', time}]}
    ));
  }

  componentDidMount() {
    const b1_label = "friends Reason: (BuckleScript Records)";
    this.runBenchmark(b1_label, this.N, FriendsRe.friends);
  }

  componentDidUpdate() {
    switch(this.state.items.length) {
      case 1: 
        const b2_label = "friends JS: (Object mutation)"
        this.runBenchmark(b2_label, this.N, FriendsFJS.friends);
        break;
      case 2:
        const b3_label = "friends JS: (Object.assign)"
        this.runBenchmark(b3_label, this.N, FriendsJS.friends);
        break;
      case 3:
        this.runNativeBenchmark();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Benchmarks</Text>
        <View style={styles.block} >
            {this.state.items.map(row)}
        </View> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#106EE8',
    paddingTop: 20,
    flex: 1,
    paddingBottom: 20
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Arial',
    textAlign: 'center',
    marginBottom: 10
  },
  block: {
    backgroundColor: '#0FC1A1',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
  },
  rowText: {
    color: 'white',
    fontSize: 20
  }
});