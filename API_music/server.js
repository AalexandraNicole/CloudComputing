const http = require('http');
const { getScores, getScore, createScore, updateScore, deleteScore } = require('./controllers/scoreController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/scores' && req.method === 'GET') {
    getScores(req, res);
  } else if (req.url.match(/\/api\/scores\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getScore(req, res, id);
  } else if (req.url === '/api/scores' && req.method === 'POST') {
    createScore(req, res);
  } else if (req.url.match(/\/api\/scores\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateScore(req, res, id);
  } else if (req.url.match(/\/api\/scores\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteScore(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

