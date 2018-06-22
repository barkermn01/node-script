let script = {
	run:async (argv, argc) => { 
		return new Promise((resolve, reject) => {
			process.terminalDebug = !process.terminalDebug;
			resolve();
		});
	}
}

module.exports = script;