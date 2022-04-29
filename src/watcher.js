let edge = require("edge-js")
const fs = require('fs')
const path = require('path')

function Watcher() {
  this.bridgeObject = null
  if (fs.existsSync(path.resolve(__dirname, '..', 'bin', 'NativeWatcher.dll'))) {
    this.bridgeObject = edge.func({
      assemblyFile: path.resolve(__dirname, '..', 'bin', 'NativeWatcher.dll'),
      typeName: 'NativeWatcher.Startup',
      methodName: 'Invoke'
    })
  } else if (fs.existsSync(path.resolve('NativeWatcher.dll'))) {
    this.bridgeObject = edge.func({
      assemblyFile: path.resolve('NativeWatcher.dll'),
      typeName: 'NativeWatcher.Startup',
      methodName: 'Invoke'
    })
  } else {
    console.error('No NativeWatcher.dll found')
  }
}

Watcher.prototype.watch = function(fileSystemPath, callback, recursive, filter, debug) {
  var payload
  if (recursive == null) recursive = true
  if (filter == null) filter = ""
  if (this.bridgeObject === null) {
    console.error('watcher not initialized correctly')
  } else {
    payload = {
      path: fileSystemPath,
      filter: '',
      recursive: true,
      stopping: false,
      stoppingAll: false,
      debug: debug ? true : false,
      responseCallback: callback,
    }
    this.bridgeObject(payload, function(error, results) {
      if (error) {
        console.error('error', error)
      }
      else if (results) {
        console.log("Watcher started")
      }
    })
  }
}

Watcher.prototype.unwatch = function(fileSystemPath) {
  var payload
  if (this.bridgeObject === null) {
    return console.error('watcher not initialized correctly')
  } else {
    payload = {
      path: fileSystemPath,
      filter: '',
      recursive: true,
      stopping: true,
      stoppingAll: false,
      responseCallback: function() {}
    }
    return this.bridgeObject(payload, function(error, results) {
      if (error !== null) {
        console.log(error)
      }
    })
  }
}

Watcher.prototype.unwatchAll = function() {
  var payload
  if (this.bridgeObject === null) {
    return console.error('watcher not initialized correctly')
  } else {
    return payload = {
      path: fileSystemPath,
      filter: '',
      recursive: true,
      stopping: true,
      stoppingAll: true,
      responseCallback: function() {}
    }
  }
}



module.exports = Watcher

