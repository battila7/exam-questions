'use strict'

const Question = require('./question');

module.exports = function(type, contents, arr) {
  if (type === "json") {
    jsonParser(contents, arr);
  } else {
    simpleParser(contents, arr);
  }
}

const jsonParser = function(contents, arr) {
  const json  = JSON.parse(contents),
        topic = JSON.topic;

  json.questions.forEach(function(i) {
    arr.push(new Question(topic, i));
  });
}

const simpleParser = function(contents, arr) {
  const text  = contents.split('\n'),
        topic = text.shift();

  text.pop() // ignore last line break

  text.forEach(function(i) {
    arr.push(new Question(topic, i));
  });
}
