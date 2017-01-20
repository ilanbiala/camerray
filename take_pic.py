import subprocess
from multiprocessing import Pool
import time

devices = { 0 : 'ZX1B728VZG',
            1 : 'ZX1B72GWL8',
            2 : 'ZX1B72HB7J',
            3 : 'ZX1B72D5G5',
            4 : 'ZX1B72FXB6',
            5 : 'ZX1B72KSTP',
            6 : 'ZX1B72DQCX',
            7 : 'ZX1B72LQN9',
            # 8 : 'ZX1B72HQHW',
            # 9 : 'ZX1PD22JKV',
            # 10 : 'ZX1B72BMZP',
            # 11 : 'ZX1B728WVP',
            # 12 : 'ZX1B72D4P4',
            # 13 : 'ZX1B72GW9H',
            # 14 : 'ZX1B72FCDP'
             }

def adb(device, command):
    return "adb -s {} {}".format(devices[device],command)

def captureImage(device):
    subprocess.run(adb(device, 'shell "am start -a android.media.action.IMAGE_CAPTURE"'), shell=True)
    time.sleep(2)
    subprocess.run(adb(device, 'shell "input tap 400 850"'), shell=True)
    time.sleep(2)
    subprocess.run(adb(device, 'shell "input tap 400 850"'), shell=True)
    return True



def moveFile(device):
    filename = subprocess.check_output(adb(device, 'shell "ls /sdcard/DCIM/Camera/*"'), shell=True, universal_newlines=True).split('\n',1)[0].strip('\r\n ')
    subprocess.run(adb(device, 'pull {} {}.jpg'.format(filename, device)), shell=True)
    subprocess.run(adb(device, 'shell "rm -rf /sdcard/DCIM/Camera/*"'), shell=True)

def captureAndCopy(device):
    captureImage(device)
    moveFile(device)

for i in range(8):
	captureAndCopy(i);

# Pool(len(devices)).map(captureAndCopy, range(len(devices)))

# freeze_support()