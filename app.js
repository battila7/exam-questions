'use strict'

/* node */
const fs = require("fs");

/* npm */
const readlineSync = require("readline-sync");

/* local */
const argv    = require("./argv"),
      parser  = require("./parser")
                .bind(null, argv.type),
      stats   = require("./stats"),
      shuffle = require("./shuffle");

let questions = [];

argv._.forEach(function(file) {
  parser(fs.readFileSync(file, 'utf8'), questions);
});

stats.source = questions;

shuffle(questions);

// wrap the logic into an IIFE to provide tighter scope
(function () {
  // shallow copy the array
  let remaining = questions.slice();
  let roundCounter = 1;

  do
  {
    let len = remaining.len,
        questionCounter = 0;

    shuffle(remaining);

    let roundEnd = stats.roundStart(roundCounter, remaining);

    remaining = remaining.filter(function(q) {
      questionCounter++;

      q.attempt(stats.attempt);

      const answer = readlineSync.keyInYN(q.topic + "\t - \t" + q.text);

      if (answer) {
        q.solved(stats.solved);

        return false;
      }

      return true;
    });

    roundEnd(remaining);

    roundCounter++;
  } while (remaining.length > 0);
})();

stats.overallEnd();
