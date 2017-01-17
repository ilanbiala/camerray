import subprocess

def captureImage():
    subprocess.call(['adb shell "am start -a android.media.action.IMAGE_CAPTURE"'])
    subprocess.call(['sleep 1'])
    subprocess.call(['adb shell "input tap 400 850"'])
    subprocess.call(['sleep 1'])
    subprocess.call(['adb shell "input tap 400 850"'])
    return True
    
def captureVideo(seconds):
    subprocess.call(['adb shell "am start -a android.media.action.VIDEO_CAPTURE"'])
    subprocess.call(['sleep 1'])
    subprocess.call(['adb shell "input tap 475 825"'])
    subprocess.call(['sleep %s' % seconds])
    subprocess.call(['adb shell "input tap 475 825"'])
    subprocess.call(['sleep 1'])
    subprocess.call(['adb shell "input tap 475 825"'])
    
    
def moveFile(filename):
    #for entry in /sdcard/DCIM/Camera/* ; do ; echo "$entry" ; done | head -1
    pass

