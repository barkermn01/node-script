let fs = require('fs');
let util = require('util');

let script = {
  run:(argv) => {
		let unlinkPromise = util.promisify(fs.unlink);
		
		return new Promise(resolve => {
			if(argv[1] == undefined){
				throw "no command has been supplied for uninstall";
				
			}
			let fileName = argv[1]+".js"
			let commandName = argv[1];
			if(!fs.existsSync(__dirname+"/"+fileName)){
				throw "Commmand is not installed ";
			}
			try{
				require.resolve("./"+fileName);
				let test = require("./"+fileName);
				try{
					if(test.uninstall != undefined){
						console.log("running pre uninstall commands");
						await test.uninstall(args, args.length, process).then(() => {
							console.log("uninstall scripts completed");
						}).catch((err) => {
							console.error("Uninstall script for command '%s' failed", commandName);
						});
					}
					unlinkPromise(__dirname+"/"+fileName).then(function(){
						console.log("command '%s' removed", commandName);
						resolve();
					}).catch(function(){
						console.error("could not remove command '%s'", commandName);
						reject();
					});
				}catch(ex){
					unlinkPromise(__dirname+"/"+fileName).then(function(){
						 console.log("command '%s' removed", commandName);
						 resolve();
					}).catch(function(){
						console.error("could not remove command '%s'", commandName);
						reject();
					});
				}
			}catch(ex){
				console.error(ex);
				console.error("command '%s' is not stable for removal", commandName);
				throw ex;
			}
		});
  }
}

module.exports = script;