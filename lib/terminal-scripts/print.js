let script = {
  run:(argv) => {
	  return new Promise(resolve => {
      console.log(argv.slice(1).join(" "));
      resolve();
	  });
  }
}

module.exports = script;