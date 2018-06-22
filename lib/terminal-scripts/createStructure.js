const fs = require('fs');

let script = {
	run:function(argv, argc){ 
		let fileContent = "module.export = {\r\n"+
		"};";

		fs.writeFile("./src/Structures/"+argv[1]+".js", fileContent, function(err){
			if (err) reject(err);
		});
		resolve();
	},
};

module.exports = script;