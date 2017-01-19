const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

var win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../home.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function takePhoto() {
  document.getElementById("photo_taken").innerHTML = "✗";

  PythonShell.run('take_pics.py', function (err) {
    if (err) throw err;
    console.log('pics taken');
    document.getElementById("photo_taken").innerHTML = "✓";
  });
}

function takeVideo() {
  document.getElementById("video_taken").innerHTML = "✗";

  $.ajax({
    type: "POST",
    url: "~/take_vid.py"
  }).done(function( o ) {
    document.getElementById("video_taken").innerHTML = "✓";
  });
}