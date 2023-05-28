const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'pages' });
});

const { exec } = require('child_process');
const gulpProcess = exec('npx gulp');

gulpProcess.stdout.on('data', function(data) {
  console.log('Gulp: ' + data.toString());
});

gulpProcess.stderr.on('data', function(data) {
  console.error('Gulp error: ' + data.toString());
});

gulpProcess.on('exit', function(code) {
  console.log('Gulp process exited with code ' + code);
});

app.listen(3000, function() {
  console.log('Servidor rodando na porta 3000');
});