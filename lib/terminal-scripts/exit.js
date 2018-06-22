let script = {
	run:function(argv, argc){ 
		return new Promise((resolve, reject) => {
			process.exit(); 
			resolve();
		});
	},
};

module.exports = script;