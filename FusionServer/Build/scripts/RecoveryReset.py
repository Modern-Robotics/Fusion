import time
import Fusion
from Display import RecruitLCD;

#---------------------------------------------------------------------------
# 1) Configure the two digital ports used by the recovery jumper
#
f = Fusion.driver()
f.digitalState(f.D0, f.INPUT)
f.digitalState(f.D7, f.OUTPUT)


# 2a) Assume that the jumper is calling for a recovery reset and check to
#     see if the jumper is present 10 times.  If any time shows the jumper
#     is NOT present, then we aren't in recovery mode.
#
external_reset = True
for i in range(10):
    f.digitalWrite(f.D7, 1)
    time.sleep(0.001)
    if (f.digitalRead(f.D0) != 1):
        external_reset = False
        break;
    time.sleep(0.001)
    f.digitalWrite(f.D7, 0)
    if (f.digitalRead(f.D0) != 0):
        external_reset = False
        break;


# 2b) Finished checking; if external_reset requested, light the two LEDs and
#     wait for the jumper to be removed before proceeding
#
time.sleep(0.1)
if (external_reset == True):
    # f.setLED(0, 1)
    # f.setLED(1, 1)
    # f.digitalWrite(f.D7, 1)
    lcd = RecruitLCD();
    lcd.show_text('Reset detected. Please remove the cables to continue.')
    while (f.digitalRead(f.D0)): pass