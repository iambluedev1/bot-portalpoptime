const spawn = require('child_process').spawn;

function launch() {
  console.log("executing bot");
  var bot = spawn('node', ['index.js']);

  bot.stdout.on('data', function (data) {
    var output = data.toString();
    process.stdout.write('stdout: ' + output.replace("[+] ", ""));
  });

  bot.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });

  bot.on('exit', function (code) {
    if(code.toString()){
      console.log('stdout: task finished');
    }else{
      console.log('child process exited with code ' + code.toString());
    }
  });
}

function start() {
	launch();
	
	setInterval(function () {
		launch();
	}, 1000*60*3.5);
}

start();