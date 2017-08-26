/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { app } from "./lib/js/re/app.js";
import React from "react";
import {
  AppRegistry,
  NativeModules
} from 'react-native';
import Bench from './src/bench.js';

const ReasonNative = NativeModules.ReasonNative;

AppRegistry.registerComponent('ReasonMLReactNative', () => Bench);
