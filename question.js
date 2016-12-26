'use strict'

module.exports = Question;

function Question(topic, text) {
  this.topic = topic;
  this.text = text;
  this.attempts = 0;
  this.isSolved = false;
}

Question.prototype.attempt = function(callback) {
  this.attempts++;

  callback(this);
}

Question.prototype.solved = function(callback) {
  this.isSolved = true;

  callback(this);
}
