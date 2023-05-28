const { exec } = require('child_process');

const gulpProcess = exec('npx gulp');

gulpProcess.stdout.on('data', function(data) {
  console.log('Gulp: ' + data.toString());
});

gulpProcess.stderr.on('data', function(data) {
  console.error('Gulp error: ' + data.toString());
});

const timeout = 60000; // Tempo limite em milissegundos (60 segundos)

const timer = setTimeout(function() {
  console.log('Tempo limite excedido. Encerrando o processo Gulp.');
  gulpProcess.kill('SIGINT'); // Encerra o processo Gulp enviando um sinal SIGINT
}, timeout);

gulpProcess.on('exit', function(code) {
  clearTimeout(timer); // Limpa o temporizador
  console.log('Gulp process exited with code ' + code);
  process.exit(); // Encerra o programa após a conclusão do Gulp
});
