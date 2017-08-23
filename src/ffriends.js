'use strict';

const {Person} = require('./friends')

function addFriend (friend, person) {
    person.friends.push(friend.name)
    return person;
}

function friends () {
  let tom = new Person("Tom", 23, []);
  let mary = new Person("Mary", 25, []);
  let john = new Person("John", 27, []);
  let sara = new Person("Sara", 21, []);
  let smiths = [tom, mary];
  let millers = [john, sara];

  millers = millers.map(p=>addFriend(tom, p))
  smiths = smiths.map(p=>addFriend(john, p))
  millers = millers.map(p=>addFriend(mary, p))
  smiths = smiths.map(p=>addFriend(sara, p))
  return millers.concat(smiths);
}

module.exports = {
  friends
}