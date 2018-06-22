let script = {
	run:() => {
		return new Promise((resolve) => {
			process.stdout.write('\033c');
			resolve();
		});
	}
}

module.exports = script;