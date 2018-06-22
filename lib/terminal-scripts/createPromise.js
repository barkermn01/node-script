const fs = require('fs');

let script = {
	run:function(argv, argc){ 
		return new Promise((resolve, reject) => {
			let fileContent = "let "+argv[1]+" = function(){\r\n"+
			"	return new Promise(resolve => {\r\n"+
			"	});\r\n"+
			"}\r\n"+
			"\r\n"+
			"module.export = "+argv[1]+";";

			fs.writeFile("./src/Promises/"+argv[1]+".js", fileContent, function(err){
				if (err) reject(err);
			});
			resolve();
		});
	},
};

module.exports = script;