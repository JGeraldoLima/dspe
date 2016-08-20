var monitor = require("os-monitor");
monitor.start({
  delay: 1000,
  stream: true });

monitor.pipe(process.stdout);
var fs = require('fs'),
logFile = fs.createWriteStream('server/scripts/results/mem_usage.txt', {flags: 'a'});
monitor.pipe(logFile);

function stop(){
  monitor.stop();
}

setTimeout(stop, 180000);