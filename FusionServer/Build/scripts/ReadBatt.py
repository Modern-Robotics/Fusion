import smbus

BACKPACK_ADDRESS    = 0x08
BATT_LOW            = 0x41
BATT_HIGH           = 0x42

bus = smbus.SMBus(1)
temp = bus.read_i2c_block_data(BACKPACK_ADDRESS, BATT_LOW, 2)
batt_temp = ((temp[1] << 8) | temp[0]) / 125.89

percent = int((batt_temp - 5.2) / .018)

if(batt_temp < 2): 
    print -1
else:
    if(percent > 100): percent = 100
    if(percent < 0): percent = 0 
    print (percent)