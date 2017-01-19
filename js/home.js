var child_process = require('child_process');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

var win, take_pic, take_vid;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../home.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
    take_pic.kill('SIGINT');
    take_vid.kill('SIGINT');
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

  take_pic = child_process.spawn('python', ['./take_pic.py']);

  take_pic.on('close', (code) => {
    console.log('picture taken');
    document.getElementById("photo_taken").innerHTML = "✓";
  });
}

function takeVideo() {
  document.getElementById("video_taken").innerHTML = "✗";

  take_vid = child_process.spawn('python', ['./take_vid.py']);

  take_vid.on('close', (code) => {
    console.log('video taken');
    document.getElementById("video_taken").innerHTML = "✓";
  });
}