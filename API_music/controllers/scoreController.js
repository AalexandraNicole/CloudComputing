const Score = require('../models/scoreModel');
const { getPostData } = require('../utils/getPostData');

// @desc    Get All Scores
// @route   GET /api/scores
async function getScores(req, res) {
  try {
    const scores = await Score.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(scores));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error }));
  }
}

// @desc    Get Single Score
// @route   GET /api/scores/:id
async function getScore(req, res, id) {
  try {
    const score = await Score.findById(id);
    if (!score) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Score Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(score));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error }));
  }
}

// @desc    Create a Score
// @route   POST /api/scores
async function createScore(req, res) {
  try {
    const body = await getPostData(req);
    const { title, composer, notes, tempo } = JSON.parse(body);

    const score = {
      title,
      composer,
      notes,
      tempo,
    };

    const newScore = await Score.create(score);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newScore));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error }));
  }
}

// @desc    Update a Score
// @route   PUT /api/scores/:id
async function updateScore(req, res, id) {
  try {
    const score = await Score.findById(id);

    if (!score) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Score Not Found' }));
    } else {
      const body = await getPostData(req);
      const { title, composer, notes, tempo } = JSON.parse(body);

      const scoreData = {
        title: title || score.title,
        composer: composer || score.composer,
        notes: notes || score.notes,
        tempo: tempo || score.tempo,
      };

      const updScore = await Score.update(id, scoreData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updScore));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error }));
  }
}

// @desc    Delete a Score
// @route   DELETE /api/scores/:id
async function deleteScore(req, res, id) {
  try {
    const score = await Score.findById(id);

    if (!score) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Score Not Found' }));
    } else {
      await Score.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Score ${id} removed` }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error }));
  }
}

module.exports = {
  getScores,
  getScore,
  createScore,
  updateScore,
  deleteScore,
};
