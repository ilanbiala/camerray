# camerray
Build18 2017 project

## Image capture
```
adb shell "am start -a android.media.action.IMAGE_CAPTURE"
sleep 1
adb shell "input tap 400 850"
sleep 1
adb shell "input tap 400 850"
```

## Video capture
```
adb shell "am start -a android.media.action.VIDEO_CAPTURE"
sleep 1
adb shell "input tap 475 825"
sleep # of seconds to record
adb shell "input tap 475 825"
sleep 1
adb shell "input tap 475 825"
```
## To run
Install node.js
```
npm install (if not done already)
npm start
```