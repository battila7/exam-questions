'use strict'

const shuffle = function (arr) {
  var counter = arr.length;

  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      counter--;

      // Swap the last element
      let temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
  }
}

module.exports = shuffle;
