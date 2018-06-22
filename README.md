# Node-Scripten
A small terminal system built in node that provide a method of creating or using utillity scripts simply 

## How to Install
```
npm install node-script
```

## How to use
```bash
node-script
```

## uninstall/install libraries
```node-script
uninstall print
install https://gist.githubusercontent.com/barkermn01/bd175036a8d2e65c69f0ce4f1b3120d1/raw/dfdb8ecf93252c84a539fadfe787b317e7eefa08/print.js
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

# License
MIT