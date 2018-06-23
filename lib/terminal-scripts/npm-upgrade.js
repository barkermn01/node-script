let script = {
	run:async function(argv, argc, process){ 
		const { spawn } = require('child_process');
		return new Promise((resolve, reject) => {
			try{
				let terminal = "powershell";
				if(process.platform !== "win32"){
					terminal = "/bin/bash";
				}
				let args = argv.slice(1);
				args.unshift("upgrade");
				args.unshift("npm");
				if(process.platform === "win32"){	
					args.unshift("/C");
				}else{
					args.unshift("\"");
					args.push("\"");
				}
				let cmd = spawn(terminal, args, {cwd:process.cwd(), env:process.env});
				cmd.on("close", (err) => {
					if(err){
						reject();
					}else{
						resolve();
					}
				})
				cmd.stderr.pipe(process.stderr);
				cmd.stdout.pipe(process.stdout);
			}catch(ex){
				throw ex;
			}
		});
	},
};
module.exports = script;