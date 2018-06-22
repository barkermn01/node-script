let request = require('request');
let fs = require('fs');
let EOL = require('os').EOL;
let progress = require('request-progress');
const util = require('util');

let script = {
	run:async (argv, argc) => { 
		let unlinkPromise = util.promisify(fs.unlink);
		return new Promise( (resolve, reject) => {
			let path = argv[1];
			if(path == undefined){
				throw "Path has not been given.";
				
			}
			if(path.split('.').slice(-1)[0] !== "js"){
				throw "Path is not a javascript file";
			}
			let fileName = path.split("/").slice(-1)[0];
			
			if(fs.existsSync(__dirname+"/"+fileName)){
				throw "Script with the name '"+fileName.split(".")[0]+"' allready installed";
			}
			
			let file = fs.createWriteStream(__dirname+"/"+fileName);
			let commandName = fileName.split('.')[0];
			( () => {
				return new Promise((resolve, reject) => {
					let firstTime = true;
					let startTime = new Date();
					progress(request(path))
					.on('progress', function (state) {
						if(!firstTime){
							process.stdout.write("\033[2A");
						}
						let cols = process.stdout.columns-1;
						let completeChar = "=";
						let currentChar = "-";
						let progessBar = state.percent*cols;
						let progessWhole = Math.floor(progessBar);
						
						// output line 1
						let outputCharsLine1 = 1;
						process.stdout.write("[");
						for(let i = 0; i < progessWhole; i++){
							process.stdout.write(completeChar);
							outputCharsLine1++;
						}
						if(progessBar > progessWhole){
							process.stdout.write(currentChar);
							outputCharsLine1++;
						}
						for(let i = outputCharsLine1; i < cols; i++){
							process.stdout.write(" ");
						}
						process.stdout.write("]"+EOL);
						
						//output line 2
						let progressStr = "Downloaded "+state.size.transferred+"/"+state.size.total;
						let timeStr = "In: "+state.time.elapsed+" est: "+state.time.remaining;
						process.stdout.write(progressStr);
						
						let neededGap = cols-(timeStr.length+progressStr.length);
						for(let i = 0; i < neededGap; i++){
							process.stdout.write(" ");
						}
						process.stdout.write(timeStr);
						firstTime = false;
					})
					.on("error", reject)
					.on("end", () => {
						if(!firstTime){
							process.stdout.write("\033[2A");
						}
						let cols = process.stdout.columns-1;
						let completeChar = "=";
						let currentChar = "-";
						let progessBar = cols-1;
						let progessWhole = Math.floor(progessBar);
						
						// output line 1
						let outputCharsLine1 = 1;
						process.stdout.write("[");
						for(let i = 0; i < progessWhole; i++){
							process.stdout.write(completeChar);
							outputCharsLine1++;
						}
						if(progessBar > progessWhole){
							process.stdout.write(currentChar);
							outputCharsLine1++;
						}
						for(let i = outputCharsLine1; i < cols-1; i++){
							process.stdout.write(" ");
						}
						process.stdout.write("]"+EOL);
						
						//output line 2
						let stats = fs.statSync(__dirname+"/"+fileName);
						let progressStr = "Downloaded "+stats.size;
						let timeStr = "In: ";
						let now = new Date();
						let totalTime = ((now - startTime)/1000).toFixed(2);
						if(totalTime > 60*60){
							timeStr += (totalTime/60/60).toFixed(2)+" hours";
						}else if(totalTime > 60){
							timeStr += (totalTime/60).toFixed(2)+" minuets";
						}else{
							timeStr += totalTime+" seconds";
						}
						process.stdout.write(progressStr);
						
						let neededGap = cols-(timeStr.length+progressStr.length);
						for(let i = 0; i <= neededGap; i++){
							process.stdout.write(" ");
						}
						process.stdout.write(timeStr);
						firstTime = false;
						resolve();
					})
					.pipe(file);
				});
			})().then((response) => {
				try{
					require.resolve("./"+fileName);
					let test = require("./"+fileName);
					try{
						if(test.install != undefined){
							console.log("running post install commands");
							await test.install(args, args.length, process).then(() => {
								console.log("installed command '%s'", fileName);
								file.close();
								resolve();
							}).catch((err) => {
								console.error("Setup script for command '%s' failed and has been removed", commandName);
								file.close();
								unlinkPromise(__dirname+"/"+fileName).then(function(){}).catch(function(){});
								throw err;
							});
						}
						console.log("installed command '%s'", commandName);
						file.close();
						resolve();
					}catch(ex){
						console.error("Install of command '%s' failed", commandName);
						file.close();
						unlinkPromise(__dirname+"/"+fileName).then(function(){}).catch(function(){});
						throw ex;
					}
				}catch(ex){
					console.error(ex);
					console.error("Syntax of command '%s' is invalid and has been removed", commandName);
					file.close();
					unlinkPromise(__dirname+"/"+fileName).then(function(){}).catch(function(){});
					throw ex;
				}
			}).catch((err) => {
				console.error(err);
				console.error("failed to install '%s'", path);
				file.close();
				unlinkPromise(__dirname+"/"+fileName).then(function(){}).catch(function(){});
				throw err;
			});
		});
	}
}
module.exports = script;