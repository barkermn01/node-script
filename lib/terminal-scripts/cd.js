let script = {
	run:function(argv, argc, process){
		return new Promise((resolve, reject) => {
			process.chdir(argv[1]);
			resolve(process.cwd);
		});
	}
}

module.exports = script;