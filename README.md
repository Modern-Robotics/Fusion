# Spartan Pi development

Version:    0.5.0 
Date:       12/16/16
Release:    DEVELOPMENT

12/9/16 (JM) --------------------------------------------------------
-   Version Change (0.1.3)
-   Created hostapd access point for direct connection to raspberry pi
    via WiFi
    
12/12/16 (JM) -------------------------------------------------------
-   Version Change (0.2.0)
-   WiFi now acts as a client and access point at the same time allowing
    the user to connect directly from a phone and setup local area WiFi 
    credentials. 
    * Direct connect to setup local WiFi if needed
    * Once local WiFi is connected and if internet is available on local 
      network, it will pipe the internet to the phone or laptop directly
      connected as well as the raspberry pi allowing the user to update
      or install packages not installed by default.

12/21/16 (JM) -------------------------------------------------------
- 	Version Change (0.2.2)
-	Noticed RPI took 1-2 minutes to boot if no local network was connected.
	*  This is due to the DHCP server sending out requests for an address 
	   but recieving nothing cause there is no network setup. 
	*  Fixed by finding a timeout feature in the dhclient.conf and setting
	   to 1 second. This means at boot the DHCP server doesnt wait for a 
	   response and continues on. DHCP will still connect in the background
	   after a period of time if a local network has been setup previously. 
       
2/15/17 (JM) --------------------------------------------------------
-   Version Change (0.3.0)
-   Network improvements:
    * wlan0 (onboard WiFi) is set up as a permanent host access point
    * wlan1 (external Wifi USB Dongle) set up as standard Wifi and when connected
      to an external network, will forward the traffic through wlan0 allowing the
      device connected on the access point to access the network and internet.
    * eth0 (onboard Ethernet) is set up as standard ethernet connection and when
      connected to an external network, will forward the traffic through wlan0 
      allowing the device connected on the access point to access the network
      and internet.
-   Libraries for current production sensors completed and basic testing performed. 
-   Known bugs:
    * Stoping a program with ctrl-z rather than ctrl-c at times misses the deconstructor
      for the driver() class among others. The destructor for the driver class performs
      the necessary cleanup procedure for stoping motors and disabling servos at the
      end of program termination. 
      
3/15/17 (JM) --------------------------------------------------------
-   Version Change (0.4.0)
-   Incorporates new web GUI into the install package:
    * Server files are in "modern_robotics/app"
    * Apache files are in "modern_robotics/web"
-   Includes the following librariy additions and improvements:
    * USB Web camera library for tracking colored objects and returning (x,y) coordinates
    * Joystick library for use with most USB wired and wireless game controllers
    * Stand-alone analog and digital constructors for devices such as touch, ods, light, etc. 