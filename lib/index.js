const fs = require('fs');
const readline = require('readline');

let cwd = process.cwd();
process.terminalDebug = false;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let init = () => {
	let handleInput = async (line) => {
		rl.removeListener("line", handleInput);
		let args = line.split(' ');
		let lineCmd = args[0];
		if(line !== ""){
			try{
				let moduleName = require.resolve("./terminal-scripts/"+lineCmd);
				if(process.terminalDebug) console.log("found '"+moduleName+"'");
				
				if(require.cache[moduleName] != undefined){
					if(process.terminalDebug) console.log("deleting '"+moduleName+"' cache");
					delete require.cache[moduleName];
				}
				
				let test = require("./terminal-scripts/"+lineCmd);
				if(process.terminalDebug) console.log(test);
				try{
					let result = await test.run(args, args.length, process).then(() => {
						if(process.terminalDebug) console.log("successfully ran command '%s'", line);
					}).catch((err) => {
						if(process.terminalDebug) console.log("command '%s' failed'", line);
						throw err;
					})
					// handle if result != 0
					rl.on('line', handleInput);
				}catch(ex){
					console.error(ex);
					rl.on('line', handleInput);
				}
			}catch(ex){
				if(process.terminalDebug) console.error(ex);
				console.error("Command '%s' is not installed.", lineCmd);
				rl.on('line', handleInput);
			}
		}
		process.stdout.write(process.cwd()+"# ");
	}

	rl.on('line', handleInput);
	process.stdout.write(process.cwd()+"# ");
};

exports.init = init;