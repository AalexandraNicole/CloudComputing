let scores = require('../data/scores');
const { writeDataToFile } = require('../utils/writeToFile');

function findAll() {
  return new Promise((resolve) => {
    resolve(scores);
  });
}

function findById(id) {
  return new Promise((resolve) => {
    const score = scores.find((s) => s.id === id);
    resolve(score);
  });
}

function create(score) {
  return new Promise((resolve) => {
    const newScore = { id: (scores.length + 1).toString(), ...score };
    scores.push(newScore);
    writeDataToFile('./data/scores.json', scores);
    resolve(newScore);
  });
}

function update(id, scoreData) {
  return new Promise((resolve) => {
    const index = scores.findIndex((s) => s.id === id);
    scores[index] = { id, ...scoreData };
    writeDataToFile('./data/scores.json', scores);
    resolve(scores[index]);
  });
}

function patch(id, scoreData) {
  return new Promise((resolve, reject) => {
    const index = scores.findIndex((s) => s.id === id);

    if (index === -1) {
      reject(new Error(`Score with id ${id} not found`));
    } else {
      // Actualizare parțială
      scores[index] = { ...scores[index], ...scoreData };
      writeDataToFile('./data/scores.json', scores);
      resolve(scores[index]);
    }
  });
}


function remove(id) {
  return new Promise((resolve) => {
    scores = scores.filter((s) => s.id !== id);
    writeDataToFile('./data/scores.json', scores);
    resolve();
  });
}

function options() {
  return new Promise((resolve) => {
    resolve({
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]
    });
  });
}

function head(id) {
  return new Promise((resolve, reject) => {
    const score = scores.find((s) => s.id === id);

    if (!score) {
      reject(new Error(`Score with id ${id} not found`));
    } else {
      resolve({
        id: score.id,
        title: score.title,
        composer: score.composer
      });
    }
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
  options,
  head,
};
