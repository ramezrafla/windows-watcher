const WindowsWatcher = require("../src/watcher.js")
const DEBUG = process.env.NODE_ENV == 'development'
const watcher = new WindowsWatcher()

const callback = function(event){
  if (DEBUG) console.log(event)
  switch (event[0]) {
    case 'Changed':
      console.log("File Changed: " + event[1])
      break
    case 'Created':
      console.log("File Created: " + event[1])
      break
    case 'Deleted':
      console.log("File Deleted: " + event[1])
      break
    case 'Renamed':
      console.log("File Renamed: " + event[1] + " --> " + event[2])
      break
    case 'Ready':
      console.log("Received \"Ready\" signal")
      break
  }
}

watcher.watch('C:\\Users\\Ramez\\Desktop', callback, true, null, DEBUG)


setInterval(function() { }, 100000)