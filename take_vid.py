import subprocess


def captureVideo(seconds):
    subprocess.run('adb shell "am start -a android.media.action.VIDEO_CAPTURE"', shell=True)
    subprocess.run('sleep 1', shell=True)
    subprocess.run('adb shell "input tap 475 825"', shell=True)
    subprocess.run('sleep %s' % seconds, shell=True)
    subprocess.run('adb shell "input tap 475 825"', shell=True)
    subprocess.run('sleep 1', shell=True)
    subprocess.run('adb shell "input tap 475 825"', shell=True)
    

def moveFile(filename):
    #for entry in /sdcard/DCIM/Camera/* ; do ; echo "$entry" ; done | head -1
    pass
