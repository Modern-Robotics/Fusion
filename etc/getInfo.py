import commands
import Fusion
import pkg_resources 

f = Fusion.driver()
print 
with open("fusion.info", 'w') as outF:
    outF.write("======================================================================\n")
    outF.write("Fusion System Information\n")
    outF.write(str(commands.getstatusoutput("date")[1]) + "\n\n")
    outF.write(str(commands.getstatusoutput("tail -3 /proc/cpuinfo")[1]) + "\n\n")
    outF.write(str(commands.getstatusoutput("cat /etc/os-release")[1]) + "\n\n")
    outF.write(str(commands.getstatusoutput("uname -a")[1]) + "\n\n")
    outF.write(str(commands.getstatusoutput("ifconfig -a | grep \"HWaddr\"")[1]) + "\n\n")
    outF.write("Fusion information:\nFirmware version = " + str(f.info) + "\n")
    outF.write("Library version = " + str(pkg_resources.get_distribution("Fusion").version) + "\n")
    outF.write("Git commit = " + str(commands.getstatusoutput("git --git-dir=/usr/Fusion/.git rev-parse --short origin/release")[1]) + "\n\n")
    outF.write(str(commands.getstatusoutput("cat /etc/hostapd/hostapd.conf | grep \"ssid=\"")[1]) + "\n")
    outF.write("======================================================================\n")