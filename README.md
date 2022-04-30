![WindowsWatcher](/WindowsWatcher.png?raw=true)

# Windows Watcher

A Windows file system watcher utilizing the native FileSystemWatcher api for file events.

## Installation

    npm install windows-watcher

## Pkg

Use pre-built binaries from here: https://github.com/vercel/pkg-fetch/releases

`sh
pkg -t node16.14.2-win-x64 index.js
`
Copy NativeWatcher.dll over
Rename index.exe to node.exe


## Usage Example

### Watching Directories and files

```javascript
WindowsWatcher = require("windows-watcher");
watcher = new WindowsWatcher();
callback = function(event){
  switch (data[0]) {
    case 'Changed':
      console.log("File Changed: " + data[1]);
      break;
    case 'Created':
      console.log("File Created: " + data[1]);
      break;
    case 'Deleted':
      console.log("File Deleted: " + data[1]);
      break;
    case 'Renamed':
      console.log("File Renamed: " + data[1] + " --> " + data[2]);
      break;
    case 'Ready':
      console.log("Ready)
  }
}
watcher.watch("C:/", callback);
watcher.watch("A:/", callback);
watcher.watch("B:/", callback);
watcher.watch("D:/", callback);
watcher.watch("E:/", callback);
watcher.watch("F:/", callback);
watcher.watch("G:/", callback);
watcher.watch("H:/", callback);
watcher.watch("Z:/path/to/file.extension", callback);
//....
watcher.unwatch("C:/");
watcher.unwatch("H:/");

```


### Advanced Watching Setup

#### Disable Recursive Listening
It is possible to make the watcher not care about sub-folders. The following script will yield resulst for files residing within `C:/` only. Changes to files like `C:/Users/whatever.txt` will not give a callback.

```javascript
WindowsWatcher = require("windows-watcher");
watcher = new WindowsWatcher();
watcher.watch("C:/",callback, false);

```

#### Filters
It is possible to provide filters to to filter out only certain file types. This filter is **exactly** the same as the native .NET [FileSystemWatcher filter](https://msdn.microsoft.com/en-us/library/system.io.filesystemwatcher.filter.aspx?cs-save-lang=1&cs-lang=csharp#code-snippet-1). This means that it is not possible to list more than one file type. If you want only `*.png` and `*.jpg`, then you have to call `watch` twice with both arguments. You can of course do the filtering yourself within the callback which might be an easier affair than dealing with the filter.

```javascript
//Given the above text, here is how to use the filter.
WindowsWatcher = require("windows-watcher");
watcher = new WindowsWatcher();
recursive = true; //or false. Whatever tickles your fancy.
watcher.watch("C:/",callback, recursive, "*.ogg");
```

To do your own filtering in JavaScript.

```javascript
WindowsWatcher = require("windows-watcher");
watcher = new WindowsWatcher();
callback = new function(data){
  if(data[1].match(/.*\.png|.*\.jpg|.*\.jpeg|.q\.tiff|.*\.gif/)){
    console.log("I care about you image! " + data[1] + ". You were " + data[0]);
  }
  else{
    console.log("I am ignoring you weird file " + data[1])
  }
}
recursive = true; //or false. Whatever tickles your fancy.
watcher.watch("C:/",callback);
```

## License

The MIT License (MIT)

Copyright 2015 Stephan Nordnes Eriksen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


### Thanks to
 - Cray-Cray Design for logo.
