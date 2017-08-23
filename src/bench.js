import FriendsRe from '../lib/js/re/friends.js';
import FriendsJS from './friends.js';
import FriendsFJS from './ffriends.js';

function bench (name, n, fn) {
  var start = new Date().getTime();
  let result;
  for (let i=0; i<n; ++i) {
    result = fn()
  }
  const end = new Date().getTime();
  var time = end - start;
  console.log(name,time);
  return result
}

function runBenchmarks(N) {
  console.log("Timings:\n");
  const b1_label = "friends Reason: (BuckleScript Records)"
  const b1 = bench(b1_label, N, FriendsRe.friends)

  const b2_label = "friends JS: (Object.assign)"
  const b2 = bench(b2_label, N, FriendsJS.friends)

  const b3_label = "friends JS: (Object mutation)"
  const b3 = bench(b3_label, N, FriendsFJS.friends)
}

export default { runBenchmarks };
  
