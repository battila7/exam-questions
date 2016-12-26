'use strict'

const chalk = require("chalk");

const stats = {
  "roundStart": roundStart,
  "overallEnd": overallEnd,
  "attempt": attempt,
  "solved": solved,
  statData : {
    rounds: []
  }
};

function attempt() {

}

function solved() {

}

function roundStart(round, remainingStart)  {
  const startTime = Date.now(),
        that = this;

  console.log(chalk.white("\nRound #%d - Questions remaining: %d"),
              round,
              remainingStart.length);

  console.log("---------------------");

  this.statData.rounds.push({
    startCount: remainingStart.length,
  });

  const roundData = this.statData.rounds[round - 1];

  return (function(remainingEnd) {
    roundData.endCount = remainingEnd.length;
    roundData.wrong = roundData.endCount;
    roundData.correct = roundData.startCount - roundData.wrong;
    roundData.relativeSuccessRate = (roundData.correct / roundData.startCount) * 100;

    var abs = roundData.correct / that.statData.rounds[0].startCount;

    roundData.absoluteSuccessRate = abs * 100;

    roundData.elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

    console.log("\n");
    printRound(0, roundData, round - 1);
  });
};

function overallEnd() {
  console.log("\n\nOverall statistics");

  console.log("  Rounds - ", this.statData.rounds.length);

  this.statData.rounds.forEach(printRound.bind(null, 2));

  this.statData.totalWrong = this.statData.rounds.reduce(function (acc, r) {
    return acc + r.wrong;
  }, 0);

  this.statData.totalElapsed = this.statData.rounds.reduce(function (acc, r) {
    return acc + r.elapsedSeconds;
  }, 0);

  console.log("\n");

  console.log("  Total wrong ansers: %d", this.statData.totalWrong);

  console.log("  Total time elapsed: %s", secondsToTimeString(this.statData.totalElapsed));
};

function printRound(level, r, i) {
  const tab = ' '.repeat(level * 2);

  console.log("%sRound #%d - Qs: %d | Time: %s",
              tab, i + 1, r.startCount, secondsToTimeString(r.elapsedSeconds));

  console.log(chalk.green("%s  \u2713 - %d"), tab, r.correct);
  console.log(chalk.red("%s  \u2717 - %d"), tab, r.wrong);
  console.log("%s  Relative success - %d%", tab, r.relativeSuccessRate.toFixed(2));
  console.log("%s  Absolute success - %d%", tab, r.absoluteSuccessRate.toFixed(2));
}

function secondsToTimeString(secs) {
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  const minutes = Math.floor(secs / 60),
        seconds = secs % 60;

  return pad(minutes, 2) + ":" + pad(seconds, 2);
}

module.exports = stats;
