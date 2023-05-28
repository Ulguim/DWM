const { exec } = require('child_process');

const gulpProcess = exec('npx gulp');

gulpProcess.stdout.on('data', function(data) {
  console.log('Gulp: ' + data.toString());
});

gulpProcess.stderr.on('data', function(data) {
  console.error('Gulp error: ' + data.toString());
});

const timeout = 20000;

const timer = setTimeout(function() {
  console.log('Tempo limite excedido. Encerrando o processo Gulp.');
  process.kill(gulpProcess.pid, 'SIGKILL'); 
}, timeout);

gulpProcess.on('exit', function(code) {
  clearTimeout(timer); 
  console.log('Gulp process exited with code ' + code);
  process.exit(); 
});
