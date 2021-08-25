# Building a Raspberry PI based dashboard

This guide might seem long as it covers the basic Raspberry Pi setup process, but trust me this isn't that difficult and once you have learned it most of it can be reused for any Pi projects you will be working on in the future.

## Creating the SD card

This guide assumes you are running linux. If not you may have to adjust some of the steps to your OS variant

First download "Rasberry Pi OS Lite" from [https://www.raspberrypi.org/software/operating-systems/](https://www.raspberrypi.org/software/operating-systems/), as we want one that does not come with any preinstalled graphical user interface.

Copy this to your target disk (`mmcblk0` in these examples)

```
# unzip -p 2021-05-07-raspios-buster-armhf-lite.zip | sudo dd of=/dev/mmcblk0 bs=4M conv=fsync
```

After that you need to mount it in order to do the headless setup

```
# mkdir -p /mnt/pi && mount /dev/mmcblk0p1 /mnt/pi
```

Next we need to add an empty file which tells Raspberry Pi OS to install SSH on next boot

```
# touch /mnt/pi/ssh
```

If you want wifi you will also have to add a `wpa_supplicant.conf` file with your wifi informations

```
# nano /mnt/pi/wpa_supplicant.conf
```

And add the content below, replacing `country`, `ssid` and `psk` with your values

```
country=us
update_config=1
ctrl_interface=/var/run/wpa_supplicant

network={
 scan_ssid=1
 ssid="MyNetworkSSID"
 psk="Pa55w0rd1234"
}
```

Lastly unmount the SD card to ensure all data has been written

```
# umount /mnt/pi
```

## Preparing the OS

Insert the SD card into the Pi and power it on. It should start up, install SSH and then connect to the network.

After this you need to find its IP. You can do that in your router or using a tool such as nmap (`nmap -p 22 192.168.0.0/24`). For our examples we will be assuming an IP of `192.168.0.11`.

Next SSH into the PI

```
$ ssh pi@192.168.0.11
```

The password should be `raspberry`

Once in here, it would be a good time to to change that password using `passwd`

Next thing is to do an update of the system just for good meassure

```
$ sudo apt update && sudo apt upgrade
```

Once this is done we need to change default to use `iptable` as docker requires it

```
$ sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
```

Now we can install docker and give our user (`pi`) access to issue commands on it

```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker pi
```

This may fail because of the issue with `iptable`, but no worry, we will restart after we are done, which should fix the issue.

Last thing to do on our target maching; to use `docker context` over ssh to run docker command from a development machine on this target machine we need to either add our SSH public key to `~/.ssh/authorized_keys` (recommended) or install `ssh-askpass` on the target machine (`sudo apt install ssh-askpass`).

## Setting up docker context

Back at our development machine we want to be able to issue docker commands that runs on the target machine. To do this we will be using `docker context`

```
$ docker context create pi --docker "host=ssh://pi@192.168.0.11"
```

Now we can switch which context to use when we run docker commands using

```
$ docker context use pi # Run docker commands on the target machine
$ docker context use default # Run docker commands locally
```

You can check which context you are using with `docker info`

So to build and deploy our project to the PI we can simply run

```
$ docker context use pi
$ yarn update
```

That's it. Now everythime we run `yarn update` with `pi` as our context it will build a new "production" image and create a new container using the image on our target machine.
