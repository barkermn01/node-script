let script = {
	run:function(argv, argc){ 
		return new Promise((resolve, reject) => {
			const { execSync } = require('child_process');
			const path = require('path');
			const compressor = require('node-minify');

			let fileSystem;
			let cwd = process.cwd()+path.sep;
			let args = {};

			for(var i = 1; i < argc; i++){
				console.log(argv[i]);
				let argName = argv[i].split("=")[0];
				args[argName] = argv[i].split("=")[1];
			}

			try {
				require.resolve("browserify");
			} catch(e) {
				console.error(" ----------------------------- ");
				console.error("| browserify is not installed |");
				console.error(" ----------------------------- ");
				console.error("|   Please install it using   |");
				console.error("|   npm install browserify    |");
				console.error(" ----------------------------- ");
				reject();
			}
			try {
				require.resolve("fs");
				fileSystem = require("fs");
			} catch(e) {
				console.error(" ----------------------------- ");
				console.error("|     fs is not installed     |");
				console.error(" ----------------------------- ");
				console.error("|   Please install it using   |");
				console.error("|   npm install fs            |");
				console.error(" ----------------------------- ");
				reject();
			}

			//setup vars for this script
			let outputDirectory = args["outDir"] == undefined? "build":args["outDir"];
			let outputFile = args["out"] == undefined? "bundle.js":args["out"];
			let inputFile = args["src"] == undefined? "main.js":args["src"];
			let inputDirectory = args["srcDir"] == undefined? "src":args["srcDir"];

			if(outputDirectory.substr(outputDirectory.length - 1) !== path.sep){
				outputDirectory += path.sep;
			}

			if(inputDirectory.substr(inputDirectory.length - 1) !== path.sep){
				inputDirectory += path.sep;
			}
			
			let minFileName = outputFile.split('.').slice(0, -1)+".min.js";

			let filePathIn = cwd+inputDirectory+inputFile;
			let filePathOut = cwd+outputDirectory+outputFile;
			let minFilePathOut = cwd+outputDirectory+minFileName;

			// check if build directory does not exists
			if(!fileSystem.existsSync(cwd+outputDirectory)){
				// if not create it
				fileSystem.mkdirSync(cwd+outputDirectory, 0744);
			}

			// check if file exists
			if(!fileSystem.existsSync(filePathOut)){
				fileSystem.unlink(filePathOut);
			}

			let browserify = execSync("browserify "+filePathIn+" > "+filePathOut, function(err, stdout, stderr) {
				if (err) {
					reject();
				}
			});

			console.log("Built from %s and produced %s\r\n", filePathIn, filePathOut);
			
			let minify = execSync("node-minify --compressor all --input "+filePathOut+" --output "+minFilePathOut, function(err, stdout, stderr) {
				if (err) {
					reject();
				}
			});
			
			resolve();
		});
	}
};

module.exports = script;