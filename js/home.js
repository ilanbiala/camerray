var child_process = require('child_process');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

var win, take_pic, take_vid;
var photos_taken, videos_taken;

function createWindow () {
  win = new BrowserWindow({width: 1200, height: 900});

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
  document.getElementById('photo_taken').innerHTML = '✗';

  take_pic = child_process.spawn('python', ['./take_pic.py']);

  take_pic.on('close', (code) => {
    console.log('picture taken');
    document.getElementById('photo_taken').innerHTML = '✓';
  });
}

function takeVideo() {
  document.getElementById('video_taken').innerHTML = '✗';

  take_vid = child_process.spawn('python', ['./take_vid.py']);

  take_vid.on('close', (code) => {
    console.log('video taken');
    document.getElementById('video_taken').innerHTML = '✓';
  });
}


var ul;
var li_items; 
var li_number;
var image_number = 0;
var slider_width = 0;
var image_width;
var current = 0;
function init(){  
  console.log('initializing');

  photos_taken = false;
  videos_taken = false;

  ul = document.getElementById('image_slider');
  li_items = ul.children;
  li_number = li_items.length;
  for (i = 0; i < li_number; i++){
    // nodeType == 1 means the node is an element.
    // in this way it's a cross-browser way.
    //if (li_items[i].nodeType == 1){
      //clietWidth and width???
      image_width = li_items[i].childNodes[0].clientWidth;
      slider_width += image_width;
      image_number++;
  }
  
  ul.style.width = parseInt(slider_width) + 'px';
  slider(ul);

  console.log('initialized');
}

function slider(){    
    animate({
      delay:1000,
      duration: 1000,
      delta:function(p){return Math.max(0, -1 + 2 * p)},
      step:function(delta){
          ul.style.left = '-' + parseInt(current * image_width + delta * image_width) + 'px';
        },
      callback:function(){
        current++;
        if(current < li_number-1){
          slider();
        }
        else{
          var left = (li_number - 1) * image_width;         
          setTimeout(function(){goBack(left)},1000);         
          setTimeout(slider, 1000);
        }
      }
    });
}
function goBack(left_limits){
  current = 0;  
  setInterval(function(){
    if(left_limits >= 0){
      ul.style.left = '-' + parseInt(left_limits) + 'px';
      left_limits -= image_width / 10;
    } 
  }, 17);
}
function animate(opts){
  var start = new Date;
  var id = setInterval(function(){
    var timePassed = new Date - start;
    var progress = timePassed / opts.duration
    if(progress > 1){
      progress = 1;
    }
    var delta = opts.delta(progress);
    opts.step(delta);
    if (progress == 1){
      clearInterval(id);
      opts.callback();
    }
  }, opts.dalay || 17);
}