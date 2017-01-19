import subprocess

devices = { 0 : 'ZX1B728VZG',
            1 : 'ZX1B72GWL8',
            2 : '',
            3 : '',
            4 : '',
            5 : '',
            6 : '',
            7 : '',
            8 : '',
            9 : '',
            10 : '',
            11 : '',
            12 : '',
            13 : '',
            14 : '' }

def adb(device, command):
    return "adb -s {} {}".format(devices[device],command)

def captureImage(device):
    subprocess.run(adb(device, 'shell "am start -a android.media.action.IMAGE_CAPTURE"'), shell=True)
    subprocess.run('sleep 1', shell=True)
    subprocess.run(adb(device, 'shell "input tap 400 850"'), shell=True)
    subprocess.run('sleep 1', shell=True)
    subprocess.run(adb(device, 'shell "input tap 400 850"'), shell=True)
    return True



def moveFile(device):
    filename = subprocess.check_output(adb(device, 'shell "ls /sdcard/DCIM/Camera/*" | head -1'), shell=True, universal_newlines=True).strip('\r\n ')
    subprocess.run(adb(device, 'pull {} {}.jpg'.format(filename, device)), shell=True)
    subprocess.run(adb(device, 'shell "rm -rf /sdcard/DCIM/Camera/*"'), shell=True)

def captureAndCopy(device):
    captureImage(device)
    moveFile(device)


captureAndCopy(1);
