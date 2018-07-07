# Node-Scripten
A small terminal system built in node that provide a method of creating or using utillity scripts simply 

### Please note that lines of code in this document starting `#` are for the `node-script` terminal once installed

## How to Install
```
npm install -g scripten
```

## How to use
```bash
node-script
```

## uninstall/install libraries
```node-script
#uninstall print
#install https://gist.githubusercontent.com/barkermn01/bd175036a8d2e65c69f0ce4f1b3120d1/raw/dfdb8ecf93252c84a539fadfe787b317e7eefa08/print.js
```

## Build a script for node-script
```javascript
let script = {
  install:() => {
    return new Promise(resolve => {
      console.log("installed this command do we need handle it?");
      resolve();
    });
  },
  run:(argv, argc) => {
    return new Promise(resolve => {
      console.log(argv.slice(1).join(" "));
      resolve();
    });
  },
  uninstall:()  => {
    return new Promise(resolve => {
      console.log("uninstalled this command do we need handle it?");
      resolve();
    });
  }
}

module.exports = script;
```

## pre-installed scripts / command

`# npm-update [package] [options` runs npm update allowing for the same options as `npm update`

`# npm-install <package> [options` runs npm install allowing for the same options as `npm install`

`# npm-remove <package> [options` runs npm remove allowing for the same options as `npm remove`

`# npm-upgrade [options` runs npm upgrade allowing for the same options as `npm upgrade`

`# npm-publish [options` runs npm publish allowing for the same options as `npm publish`

`# install <location>` installs a node-script command file location is an online url

`# uninstall <commandName>` removes a node-script command file

`# cd <path>` changes the current working directory also set up to override `process.cwd()`

`# clear` clears the terminal

`# debug` shows terminal debugging so if a command it not working you can see why

`# exit` exits ther node-script terminal

`# print` echos what ever follows it.

# License
MIT