"""
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   
   Dependencies:
   apt-get install python-dev 
   pip install psutils  (Unless locally packaged)
   pip install remi     (Unless locally packaged)  
"""

import remi.gui as gui
from remi import start, App
import math
from threading import Timer 
import psutil
from subprocess import PIPE, Popen, check_output
import Fusion
import time 
import zipfile
import traceback
import os

f = Fusion.driver()

class Gauge(gui.Svg):
    def __init__(self, width, height, _min, _max):
        super(Gauge, self).__init__(width, height)
        self.width = width
        self.height = height
        self.min = _min
        self.max = _max
        self.scale_angle_range = math.pi*2-1.0
        self.scale_value_range = _max - _min
        self.base_angle =-self.scale_angle_range/2.0 + 1.5708

        self.radius = min(width, height)/2.0
        circle = gui.SvgCircle(width/2.0, height/2.0, self.radius)
        self.append(circle)
        circle.set_fill('gray')
        circle.set_stroke(1,'lightgray')

        circle = gui.SvgCircle(width/2.0, height/2.0, self.radius*92.0/100.0)
        self.append(circle)
        circle.set_fill('black')
        circle.set_stroke(1,'black')

        xy = [110, 175]
        textMin = gui.SvgText(xy[0], xy[1], str(_max))
        xy = [60, 175]
        textMax = gui.SvgText(xy[0], xy[1], str(_min))
        textMin.style['font-size'] = '20px'
        textMax.style['font-size'] = '20px'
        textMin.set_fill('white')
        textMax.set_fill('white')
        self.append(textMin)
        self.append(textMax)
            
        for i in range(18):
            xy1 = self.value_to_xy_tuple(-i-1, self.radius*91.0/100.0)
            xy2 = self.value_to_xy_tuple(-i-1, self.radius)
            tick = gui.SvgLine(xy1[0], xy1[1], xy2[0], xy2[1])
            tick.set_stroke(6, 'black')
            self.append(tick)
            
        for i in range( 0, 11 ):
            xy1 = self.value_to_xy_tuple(self.min + self.scale_value_range/10*i, self.radius*92.0/100.0)
            xy2 = self.value_to_xy_tuple(self.min + self.scale_value_range/10*i, self.radius)
            tick = gui.SvgLine(xy1[0], xy1[1], xy2[0], xy2[1])
            tick.set_stroke(3, 'white')
            self.append(tick)

        text = gui.SvgText(67, 75, "CPU", style={'font-size': '30px'})
        text.set_fill('lightblue')
        self.append(text)
        
        self.value_text = gui.SvgText(55, 115, '0.0%', style={'font-size': '40px'})
        self.value_text.set_fill('lightblue')
        self.append(self.value_text)
    
        self.arrow = gui.SvgPolyline()
        self.arrow.add_coord(-self.radius*20.0/100.0,0)
        self.arrow.add_coord(-self.radius*23.0/100.0,self.radius*10.0/100.0)
        self.arrow.add_coord(0,0)
        self.arrow.add_coord(-self.radius*23.0/100.0,-self.radius*10.0/100.0)
        self.arrow.add_coord(-self.radius*20.0/100.0,0)
        self.arrow.style['fill'] = 'white'
        self.arrow.set_stroke(1.0, 'white')
        self.append(self.arrow)
        self.set_value(_min)

    def value_to_angle(self, value):
        return self.base_angle + (value-self.min) * self.scale_angle_range / self.scale_value_range #substraction in order to go clockwise
    
    def angle_to_value(self, angle):
        return (angle-self.base_angle) * self.scale_value_range / self.scale_angle_range + self.min

    def value_to_xy_tuple(self, value, radius):
        return [math.cos(self.value_to_angle(value))*radius + self.radius, self.radius - math.sin(self.value_to_angle(value))*radius]

    def xy_tuple_to_value(self, xy):
        return self.angle_to_value(math.atan2(xy[1], xy[0])%(math.pi*2))

    def set_value(self, value):
        value = self.max-value
        if value<self.min:
            value = self.min
        if value>self.max:
            value = self.max
        self.value = value
        angle = self.value_to_angle(value)
        xy = self.value_to_xy_tuple(value, self.radius-10)
        self.arrow.attributes['transform'] = "translate(%s,%s) rotate(%s)" % (xy[0], xy[1], math.degrees(-angle))
        
        self.value_text.set_text(str(self.max-value) + '%')
        if((self.max-value) < 10): self.value_text.set_position(55, 115)
        elif((self.max-value) >= 100): self.value_text.set_position(35, 115)
        else: self.value_text.set_position(45, 115)
        
class diskGauge(gui.Svg):
    def __init__(self, width, height, _min, _max):
        super(diskGauge, self).__init__(width, height)
        self.width = width
        self.height = height
        self.min = _min
        self.max = _max
        self.scale_angle_range = math.pi*2-1.0
        self.scale_value_range = _max - _min
        self.base_angle =-self.scale_angle_range/2.0 + 1.5708

        self.radius = min(width, height)/2.0
        circle = gui.SvgCircle(width/2.0, height/2.0, self.radius)
        self.append(circle)
        circle.set_fill('gray')
        circle.set_stroke(1,'lightgray')

        circle = gui.SvgCircle(width/2.0, height/2.0, self.radius*87.0/100.0)
        self.append(circle)
        circle.set_fill('black')
        circle.set_stroke(1,'black')
        
        for i in range(18):
            xy1 = self.value_to_xy_tuple(-i-1, self.radius*86.0/100.0)
            xy2 = self.value_to_xy_tuple(-i-1, self.radius)
            tick = gui.SvgLine(xy1[0], xy1[1], xy2[0], xy2[1])
            tick.set_stroke(6, 'black')
            self.append(tick)

        for i in range( 0, 11 ):
            xy1 = self.value_to_xy_tuple(self.min + self.scale_value_range/10*i, self.radius*87.0/100.0)
            xy2 = self.value_to_xy_tuple(self.min + self.scale_value_range/10*i, self.radius)
            tick = gui.SvgLine(xy1[0], xy1[1], xy2[0], xy2[1])
            tick.set_stroke(2, 'white')
            self.append(tick)
        
        text = gui.SvgText(32, 44, "Disk", style={'font-size': '18px'})
        text.set_fill('lightblue')
        self.append(text)
        
        self.value_text = gui.SvgText(29, 63, '0.0%', style={'font-size': '18px'})
        self.value_text.set_fill('lightblue')
        self.append(self.value_text)
    
        self.arrow = gui.SvgPolyline()
        self.arrow.add_coord(-self.radius*20.0/100.0,0)
        self.arrow.add_coord(-self.radius*23.0/100.0,self.radius*10.0/100.0)
        self.arrow.add_coord(0,0)
        self.arrow.add_coord(-self.radius*23.0/100.0,-self.radius*10.0/100.0)
        self.arrow.add_coord(-self.radius*20.0/100.0,0)
        self.arrow.style['fill'] = 'white'
        self.arrow.set_stroke(1.0, 'white')
        self.append(self.arrow)
        self.set_value(_min)

    def value_to_angle(self, value):
        return self.base_angle + (value-self.min) * self.scale_angle_range / self.scale_value_range #substraction in order to go clockwise
    
    def angle_to_value(self, angle):
        return (angle-self.base_angle) * self.scale_value_range / self.scale_angle_range + self.min

    def value_to_xy_tuple(self, value, radius):
        return [math.cos(self.value_to_angle(value))*radius + self.radius, self.radius - math.sin(self.value_to_angle(value))*radius]

    def xy_tuple_to_value(self, xy):
        return self.angle_to_value(math.atan2(xy[1], xy[0])%(math.pi*2))

    def set_value(self, value):
        value = self.max-value
        if value<self.min:
            value = self.min
        if value>self.max:
            value = self.max
        self.value = value
        angle = self.value_to_angle(value)
        xy = self.value_to_xy_tuple(value, self.radius-10)
        self.arrow.attributes['transform'] = "translate(%s,%s) rotate(%s)" % (xy[0], xy[1], math.degrees(-angle))
        
        self.value_text.set_text(str(self.max-value) + '%')
        if((self.max-value) < 10): self.value_text.set_position(29, 63)
        elif((self.max-value) >= 100): self.value_text.set_position(20, 63)
        else: self.value_text.set_position(25, 63)

class memGauge(gui.Svg):
    def __init__(self, width, height, _min, _max):
        super(memGauge, self).__init__(width, height)
        self.width = width
        self.height = height
        self.min = _min
        self.max = _max
        self.scale_angle_range = math.pi*2-1.0
        self.scale_value_range = _max - _min
        self.base_angle =-self.scale_angle_range/2.0 + 1.5708

        self.radius = min(width, height)/2.0
        circle = gui.SvgCircle(width/2.0, height/2.0, self.radius)
        self.append(circle)
        circle.set_fill('gray')
        circle.set_stroke(1,'lightgray')

        circle = gui.SvgCircle(width/2.0, height/2.0, self.radius*87.0/100.0)
        self.append(circle)
        circle.set_fill('black')
        circle.set_stroke(1,'black')
        
        for i in range(18):
            xy1 = self.value_to_xy_tuple(-i-1, self.radius*86.0/100.0)
            xy2 = self.value_to_xy_tuple(-i-1, self.radius)
            tick = gui.SvgLine(xy1[0], xy1[1], xy2[0], xy2[1])
            tick.set_stroke(6, 'black')
            self.append(tick)

        for i in range(0, 11):
            xy1 = self.value_to_xy_tuple(self.min + self.scale_value_range/10*i, self.radius*87.0/100.0)
            xy2 = self.value_to_xy_tuple(self.min + self.scale_value_range/10*i, self.radius)
            tick = gui.SvgLine(xy1[0], xy1[1], xy2[0], xy2[1])
            tick.set_stroke(2, 'white')
            self.append(tick)
        
        text = gui.SvgText(30, 44, "Mem", style={'font-size': '18px'})
        text.set_fill('lightblue')
        self.append(text)
        
        self.value_text = gui.SvgText(29, 63, '0.0%', style={'font-size': '18px'})
        self.value_text.set_fill('lightblue')
        self.append(self.value_text)
    
        self.arrow = gui.SvgPolyline()
        self.arrow.add_coord(-self.radius*20.0/100.0,0)
        self.arrow.add_coord(-self.radius*23.0/100.0,self.radius*10.0/100.0)
        self.arrow.add_coord(0,0)
        self.arrow.add_coord(-self.radius*23.0/100.0,-self.radius*10.0/100.0)
        self.arrow.add_coord(-self.radius*20.0/100.0,0)
        self.arrow.style['fill'] = 'white'
        self.arrow.set_stroke(1.0, 'white')
        self.append(self.arrow)
        self.set_value(_min)

    def value_to_angle(self, value):
        return self.base_angle + (value-self.min) * self.scale_angle_range / self.scale_value_range #substraction in order to go clockwise
    
    def angle_to_value(self, angle):
        return (angle-self.base_angle) * self.scale_value_range / self.scale_angle_range + self.min

    def value_to_xy_tuple(self, value, radius):
        return [math.cos(self.value_to_angle(value))*radius + self.radius, self.radius - math.sin(self.value_to_angle(value))*radius]

    def xy_tuple_to_value(self, xy):
        return self.angle_to_value(math.atan2(xy[1], xy[0])%(math.pi*2))

    def set_value(self, value):
        value = self.max-value
        if value<self.min:
            value = self.min
        if value>self.max:
            value = self.max
        self.value = value
        angle = self.value_to_angle(value)
        xy = self.value_to_xy_tuple(value, self.radius-10)
        self.arrow.attributes['transform'] = "translate(%s,%s) rotate(%s)" % (xy[0], xy[1], math.degrees(-angle))
        
        self.value_text.set_text(str(self.max-value) + '%')
        if((self.max-value) < 10): self.value_text.set_position(29, 63)
        elif((self.max-value) >= 100): self.value_text.set_position(20, 63)
        else: self.value_text.set_position(25, 63)

class FusionDiagnostics(App):
    def __init__(self, *args):
        super(FusionDiagnostics, self).__init__(*args)        

    def main(self):        
# Upper left container --------------------------------------------------------------------------------------------------
        # OnBoard LED container
        self.onboard_led_container = gui.Widget(width=220, height=100, margin='15px auto', style={'text-align': 'left', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})                   
        self.onboard_led_label = gui.Label(' OnBoard LEDs', height=25, width='100%', style={'white-space': 'pre', 'background-color': 'lightgray','font-family': 'Consolas',  'font-weight': 'bold', 'font-size': '20px'})
        self.onboard_led_container.append(self.onboard_led_label)
        
        # Blue led checkbox and label
        self.blue_led_horizontal = gui.Widget(width=200, layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '10px', 'left': '10px', 'display': 'block', 'overflow': 'auto'})
        self.blue_led_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '0px', 'left': '0px'})
        self.blue_led_label = gui.Label('BLUE LED Enabled', height=30, style={'position': 'relative', 'left': '5px'})
        self.blue_led_horizontal.append(self.blue_led_checkbox) 
        self.blue_led_horizontal.append(self.blue_led_label)
        self.onboard_led_container.append(self.blue_led_horizontal)
        
        # Red led checkbox and label 
        self.yellow_led_horizontal = gui.Widget(width=200, layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '10px', 'left': '10px', 'display': 'block', 'overflow': 'auto'})
        self.yellow_led_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '0px', 'left': '0px'})
        self.yellow_led_label = gui.Label('YELLOW LED Enabled', height=30, style={'position': 'relative', 'left': '5px'})
        self.yellow_led_horizontal.append(self.yellow_led_checkbox)
        self.yellow_led_horizontal.append(self.yellow_led_label)
        self.onboard_led_container.append(self.yellow_led_horizontal)
        
        # Servo control container 
        self.servo_container = gui.Widget(width=220, height=185, margin='5px auto', style={'text-align': 'left', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})                   
        self.servo_label = gui.Label(' Servo Ports', height=25, width='100%', style={'white-space': 'pre', 'background-color': 'lightgray','font-family': 'Consolas',  'font-weight': 'bold', 'font-size': '20px'})
        self.servo_container.append(self.servo_label)
        
        # Servo 3 horizontal container 
        self.servo_3_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '10px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.servo_3_label = gui.Label('Port S3 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.servo_3_entry = gui.SpinBox(128, 0, 255, 5, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.servo_3_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.servo_3_horizontal.append(self.servo_3_label)
        self.servo_3_horizontal.append(self.servo_3_entry)
        self.servo_3_horizontal.append(self.servo_3_checkbox)
        self.servo_container.append(self.servo_3_horizontal)
        
        # Servo 2 horizontal container 
        self.servo_2_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '20px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.servo_2_label = gui.Label('Port S2 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.servo_2_entry = gui.SpinBox(128, 0, 255, 5, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.servo_2_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.servo_2_horizontal.append(self.servo_2_label)
        self.servo_2_horizontal.append(self.servo_2_entry)
        self.servo_2_horizontal.append(self.servo_2_checkbox)
        self.servo_container.append(self.servo_2_horizontal)
        
        # Servo 1 horizontal container 
        self.servo_1_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '30px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.servo_1_label = gui.Label('Port S1 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.servo_1_entry = gui.SpinBox(128, 0, 255, 5, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.servo_1_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.servo_1_horizontal.append(self.servo_1_label)
        self.servo_1_horizontal.append(self.servo_1_entry)
        self.servo_1_horizontal.append(self.servo_1_checkbox)
        self.servo_container.append(self.servo_1_horizontal)
        
        # Servo 0 horizontal container 
        self.servo_0_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '40px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.servo_0_label = gui.Label('Port S0 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.servo_0_entry = gui.SpinBox(128, 0, 255, 5, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.servo_0_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.servo_0_horizontal.append(self.servo_0_label)
        self.servo_0_horizontal.append(self.servo_0_entry)
        self.servo_0_horizontal.append(self.servo_0_checkbox)
        self.servo_container.append(self.servo_0_horizontal)
        
        # Sub container for the upper left side of the main window
        self.sub_container_left = gui.Widget(width=235, style={'display': 'block', 'overflow': 'auto', 'text-align': 'center'})
        self.sub_container_left.append(self.onboard_led_container)
        self.sub_container_left.append(self.servo_container)
        
#--------------------------------------------------------------------------------------------------               
        # Cpu gauge container
        self.cpu_vertical = gui.VBox(width='100%', margin='0px auto')
        self.cpu_container = Gauge(200, 200, 0, 100)
        self.cpu_vertical.append(self.cpu_container)
        
        # Disk and memory horizontal containers 
        self.disk_mem_container = gui.Widget(width='100%', height=120, layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'display': 'block', 'overflow': 'auto'})
        self.disk_vertical = gui.VBox(width='50%', height=100, margin='0px auto')
        self.disk_container = diskGauge(100, 100, 0, 100)
        self.disk_vertical.append(self.disk_container)
        self.mem_vertical = gui.VBox(width='50%', height=100, margin='0px auto')
        self.mem_container = memGauge(100, 100, 0, 100)
        self.mem_vertical.append(self.mem_container)        
        self.disk_mem_container.append(self.disk_vertical)
        self.disk_mem_container.append(self.mem_vertical)
        
        # Sub container for the upper center of the main window
        self.sub_container_center = gui.Widget(width=290, margin='0px auto', style={'position': 'relative', 'top': '10px', 'left': '0px', 'display': 'block', 'overflow': 'auto', 'text-align': 'center'})
        self.sub_container_center.append(self.cpu_vertical)
        self.sub_container_center.append(self.disk_mem_container)
        
#--------------------------------------------------------------------------------------------------                
        # Raspberry Pi performance status container
        self.rpi_stats_container = gui.Widget(width=310, height=200, margin='10px auto', style={'text-align': 'left', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})    
        self.rpi_stats_label = gui.Label(' RPi Performance', height=25, width='100%', style={'white-space': 'pre', 'background-color': 'lightgray', 'font-family': 'Consolas',  'font-weight': 'bold', 'font-size': '20px'})
        self.rpi_stats_container.append(self.rpi_stats_label)
                
        # Left hand descriptor side
        self.left_side = gui.Widget(width='40%')       
        self.cpu_percents = gui.Label(' Per CPU %', height=25, width='100%', style={'white-space':'pre', 'font-weight': 'bold', 'font-size': '14px', 'color': 'gray'})
        self.left_side.append(self.cpu_percents)        
        self.cpu_temp = gui.Label(' CPU Temp', height=25, width='100%', style={'white-space':'pre', 'font-weight': 'bold', 'font-size': '14px', 'color': 'gray'})
        self.left_side.append(self.cpu_temp)             
        self.disk_usage = gui.Label(' Disk Usage', height=25, width='100%', style={'white-space':'pre', 'font-weight': 'bold', 'font-size': '14px', 'color': 'gray'})
        self.left_side.append(self.disk_usage)         
        self.mem_usage = gui.Label(' Mem Usage', height=25, width='100%', style={'white-space':'pre', 'font-weight': 'bold', 'font-size': '14px', 'color': 'gray'})
        self.left_side.append(self.mem_usage)        
        self.batt_voltage = gui.Label(' Batt Voltage', height=25, width='100%', style={'white-space':'pre', 'font-weight': 'bold', 'font-size': '14px', 'color': 'gray'})
        self.left_side.append(self.batt_voltage)
        
        # Right side values 
        self.right_side = gui.Widget(width='60%')       
        self.cpu_percents_value = gui.Label('0%', height=25, width='100%', style={'font-weight': 'normal', 'font-size': '14px'})
        self.right_side.append(self.cpu_percents_value)        
        self.cpu_temp_value = gui.Label('0Far', height=25, width='100%', style={'font-weight': 'normal', 'font-size': '14px'})
        self.right_side.append(self.cpu_temp_value)             
        self.disk_usage_value = gui.Label('0MB', height=25, width='100%', style={'font-weight': 'normal', 'font-size': '14px'})
        self.right_side.append(self.disk_usage_value)         
        self.mem_usage_value = gui.Label('0MB', height=25, width='100%', style={'font-weight': 'normal', 'font-size': '14px'})
        self.right_side.append(self.mem_usage_value)        
        self.batt_voltage_value = gui.Label('0V', height=25, width='100%', style={'font-weight': 'normal', 'font-size': '14px'})
        self.right_side.append(self.batt_voltage_value)
        
        self.stats_container = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL)  
        self.stats_container.append(self.left_side)
        self.stats_container.append(self.right_side)
        self.stats_button = gui.Button('System Information', width=200, height=30, style={'position':'relative', 'top':'10px', 'left':'60px'})
        self.stats_button.set_on_click_listener(self.on_stats_pressed)
        self.rpi_stats_container.append(self.stats_container)        
        self.rpi_stats_container.append(self.stats_button)
        
        # Motor Control Container
        self.motor_container = gui.Widget(width=310, height=110, margin='10px auto', style={'text-align': 'left', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})    
        self.motor_label = gui.Label(' Motor Control', height=25, width='100%', style={'white-space': 'pre', 'background-color': 'lightgray', 'font-family': 'Consolas',  'font-weight': 'bold', 'font-size': '20px'})
        self.motor_container.append(self.motor_label)
        
        # Vertical container for motor and stop button        
        self.motor_vertcal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, margin='0px auto')
        
        # Left Side of the motor container 
        self.motor_left_side = gui.Widget(width='60%')
        self.motor_0_horizontal = gui.Widget(width=200, layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '10px', 'left': '10px', 'display': 'block', 'overflow': 'auto'})
        self.motor_0_label = gui.Label('Port M0 = ', height=25, style={'position': 'relative', 'left': '5px'})
        self.motor_0_entry = gui.SpinBox(0, -100, 100, 10, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '30px'})        
        self.motor_0_horizontal.append(self.motor_0_label)
        self.motor_0_horizontal.append(self.motor_0_entry)
        self.motor_left_side.append(self.motor_0_horizontal)        
        self.motor_1_horizontal = gui.Widget(width=200, layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '20px', 'left': '10px', 'display': 'block', 'overflow': 'auto'})
        self.motor_1_label = gui.Label('Port M1 = ', height=25, style={'position': 'relative', 'left': '5px'})
        self.motor_1_entry = gui.SpinBox(0, -100, 100, 10, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '30px'})        
        self.motor_1_horizontal.append(self.motor_1_label)
        self.motor_1_horizontal.append(self.motor_1_entry)
        self.motor_left_side.append(self.motor_1_horizontal)
        
        # Right side of the motor container 
        self.motor_right_side = gui.Widget(width='40%', margin='0px auto')
        # self.motor_stop_button = gui.Button('E STOP', width='90px', height='50px', style={'position': 'relative', 'top': '15px', 'left': '8px', 'display': 'block', 'overflow': 'auto'})
        self.motor_stop_button = gui.Image('/res/stop.png', width='70px', height='70px', style={'position': 'relative', 'top': '8px', 'left': '15px', 'display': 'block', 'overflow': 'auto'})
        self.motor_stop_button.set_on_click_listener(self.on_estop_pressed)
        self.motor_right_side.append(self.motor_stop_button)

        self.motor_vertcal.append(self.motor_left_side)
        self.motor_vertcal.append(self.motor_right_side)
        self.motor_container.append(self.motor_vertcal)
        
        # Sub container for the upper right side of the main window
        self.sub_container_right = gui.Widget(width=325, margin='0px auto', style={'display': 'block', 'overflow': 'auto', 'text-align': 'center'})
        self.sub_container_right.append(self.rpi_stats_container)
        self.sub_container_right.append(self.motor_container)
        
#--------------------------------------------------------------------------------------------------
        # I2C sub container 
        self.i2c_main_container = gui.Widget(width=450, height=300, style={'position': 'relative', 'top': '0px', 'left': '5px', 'text-align': 'left', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})                   
        self.i2c_main_label = gui.Label(' Digital I2C Ports', height=25, width='100%', style={'white-space': 'pre', 'background-color': 'lightgray','font-family': 'Consolas',  'font-weight': 'bold', 'font-size': '20px'})
        self.i2c_main_container.append(self.i2c_main_label)

        # I2C main horizontal container 
        self.i2c_main_horizontal = gui.Widget(width=445, height=270, layout_orientation=gui.Widget.LAYOUT_HORIZONTAL)
        self.i2c_main_container.append(self.i2c_main_horizontal)
        
        # I2C device vertical container 
        self.i2c_dev_vertical = gui.Widget(width=213, height=259, style={'position': 'relative', 'top': '5px', 'left': '5px', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})                   
        self.i2c_main_horizontal.append(self.i2c_dev_vertical)
        
        # I2C device buttons
        self.i2c_dev_buttons = []
        self.i2c_dev_buttons.append(gui.Button('', width=200, height=40, style={'position': 'relative', 'top': '5px', 'left': '6px', 'font-size': '15px'}))
        self.i2c_dev_buttons[0].set_enabled(False)
        self.i2c_dev_vertical.append(self.i2c_dev_buttons[0])
        
        self.i2c_dev_buttons.append(gui.Button('', width=200, height=40, style={'position': 'relative', 'top': '10px', 'left': '6px', 'font-size': '15px'}))
        self.i2c_dev_buttons[1].set_enabled(False)
        self.i2c_dev_vertical.append(self.i2c_dev_buttons[1])
        
        self.i2c_dev_buttons.append(gui.Button('', width=200, height=40, style={'position': 'relative', 'top': '15px', 'left': '6px', 'font-size': '15px'}))
        self.i2c_dev_buttons[2].set_enabled(False)
        self.i2c_dev_vertical.append(self.i2c_dev_buttons[2])
        
        self.i2c_dev_buttons.append(gui.Button('', width=200, height=40, style={'position': 'relative', 'top': '20px', 'left': '6px', 'font-size': '15px'}))
        self.i2c_dev_buttons[3].set_enabled(False)
        self.i2c_dev_vertical.append(self.i2c_dev_buttons[3])
        
        self.i2c_refresh_button = gui.Button('Refresh', width=120, height=60, style={'position': 'relative', 'top': '30px', 'left': '45px', 'font-size': '15px'})
        self.i2c_refresh_button.set_on_click_listener(self.on_refresh_pressed)
        self.refresh_flag = False
        self.i2c_dev_vertical.append(self.i2c_refresh_button)
        
        # I2C Command vertical container 
        self.i2c_command_vertical = gui.Widget(width=213, height=259, style={'position': 'relative', 'top': '5px', 'left': '10px', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})                   
        self.i2c_main_horizontal.append(self.i2c_command_vertical)
        
        self.i2c_addr_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '10px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.i2c_addr_label = gui.Label('Address =', height=25, style={'position': 'relative', 'left': '10px'})
        self.i2c_addr_entry = gui.TextInput(single_line=True, hint='addr', width=60, height=25, style={'line-height': '25px', 'text-align': 'center', 'position': 'relative', 'left': '50px', 'border-color': 'gray', 'border-width': '1px', 'border-style': 'solid'})
        self.i2c_addr_horizontal.append(self.i2c_addr_label)
        self.i2c_addr_horizontal.append(self.i2c_addr_entry)
        self.i2c_command_vertical.append(self.i2c_addr_horizontal)
        
        self.i2c_reg_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '20px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.i2c_reg_label = gui.Label('Register =', height=25, style={'position': 'relative', 'left': '10px'})
        self.i2c_16reg_entry = gui.TextInput(single_line=True, hint='msb', width=40, height=25, style={'line-height': '25px', 'text-align': 'center', 'position': 'relative', 'left': '35px', 'border-color': 'gray', 'border-width': '1px', 'border-style': 'solid'})
        self.i2c_8reg_entry = gui.TextInput(single_line=True, hint='lsb', width=40, height=25, style={'line-height': '25px', 'text-align': 'center', 'position': 'relative', 'left': '45px', 'border-color': 'gray', 'border-width': '1px', 'border-style': 'solid'})
        self.i2c_reg_horizontal.append(self.i2c_reg_label)
        self.i2c_reg_horizontal.append(self.i2c_16reg_entry)
        self.i2c_reg_horizontal.append(self.i2c_8reg_entry)
        self.i2c_command_vertical.append(self.i2c_reg_horizontal)
        
        self.i2c_value_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '30px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.i2c_value_label = gui.Label('    Value =', height=25, style={'white-space': 'pre', 'position': 'relative', 'left': '10px'})
        self.i2c_value_entry = gui.TextInput(single_line=True, hint='00000  [0x0000]', width=110, height=25, style={'line-height': '25px', 'text-align': 'center', 'position': 'relative', 'left': '23px', 'border-color': 'gray', 'border-width': '1px', 'border-style': 'solid'})
        self.i2c_value_horizontal.append(self.i2c_value_label)
        self.i2c_value_horizontal.append(self.i2c_value_entry)
        self.i2c_command_vertical.append(self.i2c_value_horizontal) 
        
        self.i2c_poll_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '55px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.i2c_poll_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '0px', 'left': '60px'})
        self.i2c_poll_label = gui.Label('Poll Read', height=25, style={'white-space': 'pre', 'position': 'relative', 'left': '70px'})
        self.i2c_poll_horizontal.append(self.i2c_poll_checkbox)
        self.i2c_poll_horizontal.append(self.i2c_poll_label)
        self.i2c_command_vertical.append(self.i2c_poll_horizontal)
        
        self.i2c_read_button = gui.Button('Read', width=120, height=30, style={'position': 'relative', 'top': '65px', 'left': '45px', 'font-size': '15px'})
        self.i2c_read_button.set_on_click_listener(self.on_read_pressed)
        self.i2c_command_vertical.append(self.i2c_read_button)
        
        self.i2c_write_button = gui.Button('Write', width=120, height=30, style={'position': 'relative', 'top': '75px', 'left': '45px', 'font-size': '15px'})
        self.i2c_write_button.set_on_click_listener(self.on_write_pressed)
        self.i2c_command_vertical.append(self.i2c_write_button)

        # Analog sub container 
        self.analog_main_container = gui.Widget(width=170, height=300, style={'position': 'relative', 'top': '0px', 'left': '10px', 'text-align': 'left', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})                   
        self.analog_main_label = gui.Label(' Analog Inputs', height=25, width='100%', style={'white-space': 'pre', 'background-color': 'lightgray','font-family': 'Consolas',  'font-weight': 'bold', 'font-size': '20px'})
        self.analog_main_container.append(self.analog_main_label)

        # Analog Port listing 
        self.a7_horizontal = gui.Widget(width='98%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '6px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.a7_label = gui.Label('Port A7 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.a7_entry = gui.SpinBox(0, 0, 1023, 1, False, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.a7_entry.set_enabled(False)
        self.a7_horizontal.append(self.a7_label)
        self.a7_horizontal.append(self.a7_entry)
        self.analog_main_container.append(self.a7_horizontal)
        
        self.a6_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '12px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.a6_label = gui.Label('Port A6 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.a6_entry = gui.SpinBox(0, 0, 1023, 1, False, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.a6_entry.set_enabled(False)
        self.a6_horizontal.append(self.a6_label)
        self.a6_horizontal.append(self.a6_entry)
        self.analog_main_container.append(self.a6_horizontal)
        
        self.a5_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '18px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.a5_label = gui.Label('Port A5 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.a5_entry = gui.SpinBox(0, 0, 1023, 1, False, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.a5_entry.set_enabled(False)
        self.a5_horizontal.append(self.a5_label)
        self.a5_horizontal.append(self.a5_entry)
        self.analog_main_container.append(self.a5_horizontal)
        
        self.a4_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '24px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.a4_label = gui.Label('Port A4 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.a4_entry = gui.SpinBox(0, 0, 1023, 1, False, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.a4_entry.set_enabled(False)
        self.a4_horizontal.append(self.a4_label)
        self.a4_horizontal.append(self.a4_entry)
        self.analog_main_container.append(self.a4_horizontal)
        
        self.a3_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '30px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.a3_label = gui.Label('Port A3 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.a3_entry = gui.SpinBox(0, 0, 1023, 1, False, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.a3_entry.set_enabled(False)
        self.a3_horizontal.append(self.a3_label)
        self.a3_horizontal.append(self.a3_entry)
        self.analog_main_container.append(self.a3_horizontal)
        
        self.a2_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '36px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.a2_label = gui.Label('Port A2 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.a2_entry = gui.SpinBox(0, 0, 1023, 1, False, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.a2_entry.set_enabled(False)
        self.a2_horizontal.append(self.a2_label)
        self.a2_horizontal.append(self.a2_entry)
        self.analog_main_container.append(self.a2_horizontal)
        
        self.a1_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '42px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.a1_label = gui.Label('Port A1 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.a1_entry = gui.SpinBox(0, 0, 1023, 1, False, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.a1_entry.set_enabled(False)
        self.a1_horizontal.append(self.a1_label)
        self.a1_horizontal.append(self.a1_entry)
        self.analog_main_container.append(self.a1_horizontal)
        
        self.a0_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '48px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.a0_label = gui.Label('Port A0 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.a0_entry = gui.SpinBox(0, 0, 1023, 1, False, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.a0_entry.set_enabled(False)
        self.a0_horizontal.append(self.a0_label)
        self.a0_horizontal.append(self.a0_entry)
        self.analog_main_container.append(self.a0_horizontal)
        
        #Digital sub container 
        self.digital_main_container = gui.Widget(width=200, height=300, style={'position': 'relative', 'top': '0px', 'left': '15px', 'text-align': 'left', 'border-color': "#c0c0c0", 'border-width': '2px', 'border-style': 'solid'})                   
        self.digital_main_label = gui.Label(' Digital Ports', height=25, width='100%', style={'white-space': 'pre', 'background-color': 'lightgray','font-family': 'Consolas',  'font-weight': 'bold', 'font-size': '20px'})
        self.digital_main_container.append(self.digital_main_label)
        
        # Digital Port listing 
        self.d7_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '6px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.d7_label = gui.Label('Port D7 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.d7_entry = gui.SpinBox(0, 0, 1, 1, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.d7_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.d7_horizontal.append(self.d7_label)
        self.d7_horizontal.append(self.d7_entry)
        self.d7_horizontal.append(self.d7_checkbox)
        self.digital_main_container.append(self.d7_horizontal)
        
        self.d6_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '12px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.d6_label = gui.Label('Port D6 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.d6_entry = gui.SpinBox(0, 0, 1, 1, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.d6_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.d6_horizontal.append(self.d6_label)
        self.d6_horizontal.append(self.d6_entry)
        self.d6_horizontal.append(self.d6_checkbox)
        self.digital_main_container.append(self.d6_horizontal)
        
        self.d5_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '18px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.d5_label = gui.Label('Port D5 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.d5_entry = gui.SpinBox(0, 0, 1, 1, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.d5_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.d5_horizontal.append(self.d5_label)
        self.d5_horizontal.append(self.d5_entry)
        self.d5_horizontal.append(self.d5_checkbox)
        self.digital_main_container.append(self.d5_horizontal)
        
        self.d4_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '24px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.d4_label = gui.Label('Port D4 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.d4_entry = gui.SpinBox(0, 0, 1, 1, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.d4_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.d4_horizontal.append(self.d4_label)
        self.d4_horizontal.append(self.d4_entry)
        self.d4_horizontal.append(self.d4_checkbox)
        self.digital_main_container.append(self.d4_horizontal)
        
        self.d3_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '30px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.d3_label = gui.Label('Port D3 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.d3_entry = gui.SpinBox(0, 0, 1, 1, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.d3_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.d3_horizontal.append(self.d3_label)
        self.d3_horizontal.append(self.d3_entry)        
        self.d3_horizontal.append(self.d3_checkbox)        
        self.digital_main_container.append(self.d3_horizontal)
        
        self.d2_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '36px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.d2_label = gui.Label('Port D2 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.d2_entry = gui.SpinBox(0, 0, 1, 1, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.d2_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.d2_horizontal.append(self.d2_label)
        self.d2_horizontal.append(self.d2_entry)
        self.d2_horizontal.append(self.d2_checkbox)
        self.digital_main_container.append(self.d2_horizontal)
        
        self.d1_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '42px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.d1_label = gui.Label('Port D1 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.d1_entry = gui.SpinBox(0, 0, 1, 1, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.d1_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.d1_horizontal.append(self.d1_label)
        self.d1_horizontal.append(self.d1_entry)
        self.d1_horizontal.append(self.d1_checkbox)
        self.digital_main_container.append(self.d1_horizontal)
        
        self.d0_horizontal = gui.Widget(width='100%', layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, style={'position': 'relative', 'top': '48px', 'left': '0px', 'display': 'block', 'overflow': 'auto'})
        self.d0_label = gui.Label('Port D0 =', height=25, style={'position': 'relative', 'left': '15px'})
        self.d0_entry = gui.SpinBox(0, 0, 1, 1, True, width=50, height=25, style={'text-align': 'center', 'position': 'relative', 'left': '35px'})
        self.d0_checkbox = gui.CheckBox(False, width=20, height=20, style={'position': 'relative', 'top': '3px', 'left': '50px'})
        self.d0_horizontal.append(self.d0_label)
        self.d0_horizontal.append(self.d0_entry)
        self.d0_horizontal.append(self.d0_checkbox)
        self.digital_main_container.append(self.d0_horizontal)
        
#--------------------------------------------------------------------------------------------------
        # Top Menu Bar
        self.menu = gui.Menu(width='100%', height='30px', style={'background-color': '#009688'})
        # self.m1 = gui.MenuItem('File', width=100, height=30)
        # self.m2 = gui.MenuItem('View', width=100, height=30)
        # self.m11 = gui.MenuItem('Save', width=100, height=30)
        # self.m12 = gui.MenuItem('Open', width=100, height=30)
        # self.m111 = gui.MenuItem('Save', width=100, height=30)
        # self.m112 = gui.MenuItem('Save as', width=100, height=30)
        # self.m3 = gui.MenuItem('Dialog', width=100, height=30)
        # self.menu.append(self.m1)
        # self.menu.append(self.m2)
        # self.menu.append(self.m3)
        self.menu.append(gui.Label('Fusion Diagnostic Tool V1.0', height=30, style={'white-space':'pre', 'position':'relative', 'top':'3px', 'left':'295px', 'font-size':'20px', 'font-weight':'bold'}))
        # self.m1.append(self.m11)
        # self.m1.append(self.m12)
        # self.m11.append(self.m111)
        # self.m11.append(self.m112)
        self.menubar = gui.MenuBar(width='100%', height='30px')
        self.menubar.append(self.menu)

#--------------------------------------------------------------------------------------------------   
        # Build main window          
        # Makes a vertical container to append layers to
        self.vertical_container = gui.Widget(width=853, height=690, margin='0px auto', style={'display': 'block', 'overflow': 'hidden'})
        
        # Sub container for the upper half of the main window 
        self.upper_horizontal_container = gui.Widget(width=900, layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, margin='0px auto', style={'display': 'block', 'overflow': 'auto'})
        
        # Sub container for the lower half of the main window 
        self.lower_horizontal_container = gui.Widget(width=900, layout_orientation=gui.Widget.LAYOUT_HORIZONTAL, margin='0px auto', style={'display': 'block', 'overflow': 'auto'})
        
        self.upper_horizontal_container.append(self.sub_container_left)
        self.upper_horizontal_container.append(self.sub_container_center)
        self.upper_horizontal_container.append(self.sub_container_right)
        
        self.lower_horizontal_container.append(self.i2c_main_container)
        self.lower_horizontal_container.append(self.analog_main_container)
        self.lower_horizontal_container.append(self.digital_main_container)
        
        self.vertical_container.append(self.menubar)
        self.vertical_container.append(self.upper_horizontal_container)
        self.vertical_container.append(self.lower_horizontal_container)
        
        # Start a timer thread to update the Performance Stats
        self.statisticUpdateThread()
        
        # Start a timer thread to update the Controller Values
        self.controllerUpdateThread()
               
        return self.vertical_container;  
        
    def on_stats_pressed(self, widget):
        text_output = ""
        
        # Get cpu info 
        process = Popen(['tail', '-3', '/proc/cpuinfo'], stdout=PIPE)
        output, _error = process.communicate()
        text_output += str(output) + '\n\n'
        
        # Get OS info 
        process = Popen(['cat', '/etc/os-release'], stdout=PIPE)
        output, _error = process.communicate()
        text_output += str(output) + '\n\n'
        
        # Get uname 
        process = Popen(['uname', '-a'], stdout=PIPE)
        output, _error = process.communicate()
        text_output += str(output) + '\n\n'
        
        # Get network configuration
        process1 = Popen(['ifconfig', '-a'], stdout=PIPE)
        process2 = Popen(['grep', 'HWaddr'], stdin=process1.stdout, stdout=PIPE)
        process1.stdout.close()
        output, _error = process2.communicate()
        text_output += str(output) + '\n\n'
        
        # Print the firmware info of the Fusion Controller
        text_output += 'Fusion Firmware:\n' + str(f.info) + '\n\n'
        
        # Read power state 
        text_output += 'Power State:\n' + str(f.getPowerState()) + '\n\n'
        
        # Get device configuration
        # process = Popen(['vcgencmd', 'get_config', 'int'], stdout=PIPE)
        # output, _error = process.communicate()
        # text_output += str(output) + '\n\n'
        
        self.stats = gui.GenericDialog(title='System Information', width=900)
        self.txt = gui.TextInput(width='100%', height=500, style={'background-color':'white', 'font-family':'Lucida Console'})
        self.txt.set_enabled(False)
        self.txt.set_text(text_output)
        self.stats.add_field('stext', self.txt)
        
        download_container = gui.HBox(width='100%', height=20, style={'align-items':'center'})
        diag_down = self.diagnosticDownload('Full Support Diagnostic Download', 'fusionSupport.zip', width=300) #, style={'position':'relative', 'top':'0px', 'left':'50px'})
        download_container.append(diag_down)
        self.stats.add_field('sdiag_down', download_container)
        
        self.stats.show(self)
        
    class diagnosticDownload(gui.FileDownloader):
        def download(self):
            try:
                text_output = time.strftime('(%d/%m/%Y) %H:%M:%S\n\n')
                
                # Get cpu info 
                process = Popen(['tail', '-12', '/proc/cpuinfo'], stdout=PIPE)
                output, _error = process.communicate()
                text_output += str(output) + '\n\n'
                
                # Get OS info 
                process = Popen(['cat', '/etc/os-release'], stdout=PIPE)
                output, _error = process.communicate()
                text_output += str(output) + '\n\n'
                
                # Get uname 
                process = Popen(['uname', '-a'], stdout=PIPE)
                output, _error = process.communicate()
                text_output += str(output) + '\n\n'
                
                # Get network configuration
                process = Popen(['ifconfig', '-a'], stdout=PIPE)
                output, _error = process.communicate()
                text_output += str(output) + '\n\n'
                
                # Print the firmware info of the Fusion Controller
                text_output += 'Fusion Firmware:\n' + str(f.info) + '\n\n'
                
                # Read power state 
                text_output += 'Power State:\n' + str(f.getPowerState()) + '\n\n'
                
                # Get device configuration
                process = Popen(['vcgencmd', 'get_config', 'int'], stdout=PIPE)
                output, _error = process.communicate()
                text_output += str(output) + '\n\n'
                
                with open('fusionSupport.txt', 'w+') as outF:
                    outF.write(text_output)
                
                with zipfile.ZipFile(self._filename, 'w') as outF:
                    outF.write('fusionSupport.txt')
                    outF.write('/etc/dhcpcd.conf')
                    outF.write('/etc/dnsmasq.conf')
                    outF.write('/etc/default/hostapd')
                    outF.write('/etc/hostapd/hostapd.conf')
                    outF.write('/etc/network/interfaces')
                    outF.write('/etc/default/keyboard')
                    outF.write('/etc/rc.local')
                    outF.write('/etc/wpa_supplicant/wpa_supplicant.conf')
                                                
                with open(self._filename, 'r+b') as inF: content = inF.read()
                headers = {'Content-type': 'application/octet-stream',
                           'Content-Disposition': 'attachment; filename=%s' % os.path.basename(self._filename)}
                return [content, headers]
                
            except:
                print traceback.format_exc(1)
    
    def on_download_pressed(self, widget):
        try:
            text_output = time.strftime('(%d/%m/%Y) %H:%M:%S\n\n')
            
            # Get cpu info 
            process = Popen(['tail', '-12', '/proc/cpuinfo'], stdout=PIPE)
            output, _error = process.communicate()
            text_output += str(output) + '\n\n'
            
            # Get OS info 
            process = Popen(['cat', '/etc/os-release'], stdout=PIPE)
            output, _error = process.communicate()
            text_output += str(output) + '\n\n'
            
            # Get uname 
            process = Popen(['uname', '-a'], stdout=PIPE)
            output, _error = process.communicate()
            text_output += str(output) + '\n\n'
            
            # Get network configuration
            process = Popen(['ifconfig', '-a'], stdout=PIPE)
            output, _error = process.communicate()
            text_output += str(output) + '\n\n'
            
            # Print the firmware info of the Fusion Controller
            text_output += 'Fusion Firmware:\n' + str(f.info) + '\n\n'
            
            # Read power state 
            text_output += 'Power State:\n' + str(f.getPowerState()) + '\n\n'
            
            # Get device configuration
            process = Popen(['vcgencmd', 'get_config', 'int'], stdout=PIPE)
            output, _error = process.communicate()
            text_output += str(output) + '\n\n'
            print text_output
            with open('fullDiagnosticOutput.txt', 'w+') as outF:
                outF.write(text_output)
            
            with zipfile.ZipFile('FusionDiagnostics.zip', 'w') as outF:
                outF.write('fullDiagnosticOutput.txt')
                outF.write('/etc/network/interfaces')
            
            print "jma"
            # self.file_download_object.download()
            jmo = diagnosticDownload('jmo', 'fullDiagnosticOutput.txt', width=200)
            
        except:
            print traceback.format_exc(1)
    
    def on_estop_pressed(self, widget):
        self.motor_0_entry.set_value(0)
        self.motor_1_entry.set_value(0)
        
        
    def on_refresh_pressed(self, widget):
        self.i2c_dev_buttons[0].set_text('Scanning')
        self.i2c_dev_buttons[1].set_text('Scanning')
        self.i2c_dev_buttons[2].set_text('Scanning')
        self.i2c_dev_buttons[3].set_text('Scanning')
        self.refresh_flag = True
        
    def on_read_pressed(self, widget):
        self.i2c_value_entry.set_enabled(True)
        self.i2c_poll_checkbox.set_value(False)
        self.i2c_value_entry.set_text('') 
        
        # Read address value and detect if value is good
        if(self.i2c_addr_entry.get_value() != ''):
            try:
                addr = int(self.i2c_addr_entry.get_value(), 0)
                self.i2c_addr_entry.style['background'] = 'white'
            except:
                addr = None
                self.i2c_addr_entry.style['background'] = 'salmon'
        else:
            addr = None
        
        # Read I2C msb value and detect if value is good 
        if(self.i2c_16reg_entry.get_value() != ''):
            try:
                msb = int(self.i2c_16reg_entry.get_value(), 0)
                self.i2c_16reg_entry.style['background'] = 'white'
            except:
                msb = None 
                self.i2c_16reg_entry.style['background'] = 'salmon'
        else:
            msb = None 
            
        # Read I2C lsb value and detect if value is good 
        if(self.i2c_8reg_entry.get_value() != ''):
            try:
                lsb = int(self.i2c_8reg_entry.get_value(), 0)
                self.i2c_8reg_entry.style['background'] = 'white'
            except:
                lsb = None
                self.i2c_8reg_entry.style['background'] = 'salmon'
        else:
            lsb = None
        
        if((msb!=None) and (lsb!=None) and (addr!=None)):
            msb_temp = f.i2cRead(addr, msb, 1)[0]
            lsb_temp = f.i2cRead(addr, lsb, 1)[0]
            value = (msb_temp << 8) | lsb_temp
            self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(value)), str(hex(value)))
            
        elif((msb==None) and (lsb!=None) and (addr!=None)):
            value = f.i2cRead(addr, lsb, 1)[0] 
            self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(value)), str(hex(value)))   

        elif((msb!=None) and (lsb==None) and (addr!=None)):
            value = f.i2cRead(addr, msb, 1)[0]
            #value = (temp << 8)
            self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(value)), str(hex(value)))
            
        else: 
            self.i2c_value_entry.style['background'] = 'salmon'
            self.i2c_value_entry.attributes['placeholder'] = '0 [0x0000]'
        
    def on_write_pressed(self, widget):
        self.i2c_value_entry.set_enabled(True)
        self.i2c_poll_checkbox.set_value(False)
        
        # Read address value and detect if value is good
        if(self.i2c_addr_entry.get_value() != ''):
            try:
                addr = int(self.i2c_addr_entry.get_value(), 0)
                self.i2c_addr_entry.style['background'] = 'white'
            except:
                addr = None
                self.i2c_addr_entry.style['background'] = 'salmon'
        else:
            addr = None
        
        # Read I2C msb value and detect if value is good 
        if(self.i2c_16reg_entry.get_value() != ''):
            try:
                msb = int(self.i2c_16reg_entry.get_value(), 0)
                self.i2c_16reg_entry.style['background'] = 'white'
            except:
                msb = None 
                self.i2c_16reg_entry.style['background'] = 'salmon'
        else:
            msb = None 
            
        # Read I2C lsb value and detect if value is good 
        if(self.i2c_8reg_entry.get_value() != ''):
            try:
                lsb = int(self.i2c_8reg_entry.get_value(), 0)
                self.i2c_8reg_entry.style['background'] = 'white'
            except:
                lsb = None 
                self.i2c_8reg_entry.style['background'] = 'salmon'
        else:
            lsb = None
            
        # Read I2C Value entry and detect if value is good 
        if(self.i2c_value_entry.get_value() != ''):
            try:
                value = int(self.i2c_value_entry.get_value(), 0)
                self.i2c_value_entry.style['background'] = 'white'
            except:
                value = None 
                self.i2c_value_entry.style['background'] = 'salmon'
        else:
            value = None 

        if((msb!=None) and (lsb!=None) and (addr!=None) and (value!=None)):
            msb_temp = (value & 0xFF00) >> 8
            lsb_temp = (value & 0x00FF)
            f.i2cWrite(addr, msb, [msb_temp])
            f.i2cWrite(addr, lsb, [lsb_temp])
            msb_temp = f.i2cRead(addr, msb, 1)[0]
            lsb_temp = f.i2cRead(addr, lsb, 1)[0]
            temp = (msb_temp << 8) | lsb_temp 
            self.i2c_value_entry.set_text('') 
            self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(temp)), str(hex(temp)))
        elif((msb!=None) and (lsb==None) and (addr!=None) and (value!=None)):
            f.i2cWrite(addr, msb, [value])
            temp = f.i2cRead(addr, msb, 1)[0] 
            self.i2c_value_entry.set_text('') 
            self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(temp)), str(hex(temp)))
        elif((msb==None) and (lsb!=None) and (addr!=None) and (value!=None)):
            f.i2cWrite(addr, lsb, [value])
            temp = f.i2cRead(addr, lsb, 1)[0] 
            self.i2c_value_entry.set_text('') 
            self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(temp)), str(hex(temp)))
        else: 
            self.i2c_value_entry.style['background'] = 'salmon'
        
        
    def statisticUpdateThread(self):
        try:
            # Overall Percent 
            temp_value = psutil.cpu_percent()
            self.cpu_container.set_value(temp_value)
            
            # Per CPU
            self.cpu_percents_value.set_text(str(psutil.cpu_percent(percpu=True)))
            
            # Temperature
            process = Popen(['vcgencmd', 'measure_temp'], stdout=PIPE)
            output, _error = process.communicate()
            cpu_temp_C = float(output[output.index('=') + 1:output.rindex("'")])
            cpu_temp_F = cpu_temp_C * 9.0 / 5.0 + 32.0
            cpu_temp_F = str("{0:.2f}".format(cpu_temp_F))
            self.cpu_temp_value.set_text(str(cpu_temp_C) + '&degC / ' + str(cpu_temp_F) + '&degF')
            
            # Disk Usage 
            disk = psutil.disk_usage('/')
            disk_total = disk.total / 2.0**30
            disk_used = disk.used / 2.0**30
            disk_free = disk.free / 2.0**30
            self.disk_container.set_value(disk.percent)
            self.disk_usage_value.set_text(str("{0:.2f}".format(disk_used)) + 'GB / ' + str("{0:.2f}".format(disk_total)) + 'GB')
            
            # Memory Usage 
            mem = psutil.virtual_memory()
            mem_total = mem.total / 2.0**20      
            mem_avail = mem.available / 2.0**20      
            self.mem_container.set_value(mem.percent)
            mem_used = mem.used / 2.0**20
            mem_free = mem.free / 2.0**20
            self.mem_usage_value.set_text(str("{0:.2f}".format(mem_used)) + 'MB / ' + str("{0:.2f}".format(mem_total)) + 'MB')
            
            # Battery Voltage
            self.batt_voltage_value.set_text(str(f.readBatt()) + 'V')
        
        except ValueError: print traceback.format_exc(1) 
        
        Timer(1, self.statisticUpdateThread).start()
        
    def controllerUpdateThread(self):
        # Update Blue LED value
        if (self.blue_led_checkbox.get_value() == True):
            f.setLED(f.BLUE, 1)
        else:
            f.setLED(f.BLUE, 0)   

        # Update Yellow LED value
        if (self.yellow_led_checkbox.get_value() == True):
            f.setLED(f.YELLOW, 1)
        else:
            f.setLED(f.YELLOW, 0)
            
        # Update servo port values 
        # S0         
        if(self.servo_0_checkbox.get_value() == True):
            self.servo_0_entry.set_enabled(True)
            f.servoEnable(f.S0, 1) 
            f.servoTarget(f.S0, self.servo_0_entry.get_value())
        else:
            self.servo_0_entry.set_enabled(False)
            f.servoEnable(f.S0, 0)
            
        # S1         
        if(self.servo_1_checkbox.get_value() == True):
            self.servo_1_entry.set_enabled(True)
            f.servoEnable(f.S1, 1) 
            f.servoTarget(f.S1, self.servo_1_entry.get_value())
        else:
            self.servo_1_entry.set_enabled(False)
            f.servoEnable(f.S1, 0)
            
        # S2         
        if(self.servo_2_checkbox.get_value() == True):
            self.servo_2_entry.set_enabled(True)
            f.servoEnable(f.S2, 1) 
            f.servoTarget(f.S2, self.servo_2_entry.get_value())
        else:
            self.servo_2_entry.set_enabled(False)
            f.servoEnable(f.S2, 0)
            
        # S3       
        if(self.servo_3_checkbox.get_value() == True):
            self.servo_3_entry.set_enabled(True)
            f.servoEnable(f.S3, 1) 
            f.servoTarget(f.S3, self.servo_3_entry.get_value())
        else:
            self.servo_3_entry.set_enabled(False)
            f.servoEnable(f.S3, 0)
            
        # Update motor port values 
        f.motorSpeed(f.M0, self.motor_0_entry.get_value())
        f.motorSpeed(f.M1, self.motor_1_entry.get_value())        
    
        # Update analog port values
        self.a0_entry.set_value(f.analogRead(f.A0))
        self.a1_entry.set_value(f.analogRead(f.A1))
        self.a2_entry.set_value(f.analogRead(f.A2))
        self.a3_entry.set_value(f.analogRead(f.A3))
        self.a4_entry.set_value(f.analogRead(f.A4))
        self.a5_entry.set_value(f.analogRead(f.A5))
        self.a6_entry.set_value(f.analogRead(f.A6))
        self.a7_entry.set_value(f.analogRead(f.A7))
        
        # Update digital port values 
        # D0 port
        if(self.d0_checkbox.get_value() == True):
            self.d0_entry.set_enabled(True)
            f.digitalState(f.D0, f.OUTPUT)            
            if(int(self.d0_entry.get_value()) > 1): self.d0_entry.set_value(1)
            elif(int(self.d0_entry.get_value()) < 0): self.d0_entry.set_value(0)            
            f.digitalWrite(f.D0, int(self.d0_entry.get_value()))
        else:
            self.d0_entry.set_enabled(False)
            f.digitalState(f.D0, f.INPUT)
            self.d0_entry.set_value(f.digitalRead(f.D0))
        
        # D1 port
        if(self.d1_checkbox.get_value() == True):
            self.d1_entry.set_enabled(True)
            f.digitalState(f.D1, f.OUTPUT)            
            if(int(self.d1_entry.get_value()) > 1): self.d1_entry.set_value(1)
            elif(int(self.d1_entry.get_value()) < 0): self.d1_entry.set_value(0)            
            f.digitalWrite(f.D1, int(self.d1_entry.get_value()))
        else:
            self.d1_entry.set_enabled(False)
            f.digitalState(f.D1, f.INPUT)
            self.d1_entry.set_value(f.digitalRead(f.D1))        
            
        # D2 port
        if(self.d2_checkbox.get_value() == True):
            self.d2_entry.set_enabled(True)
            f.digitalState(f.D2, f.OUTPUT)            
            if(int(self.d2_entry.get_value()) > 1): self.d2_entry.set_value(1)
            elif(int(self.d2_entry.get_value()) < 0): self.d2_entry.set_value(0)            
            f.digitalWrite(f.D2, int(self.d2_entry.get_value()))
        else:
            self.d2_entry.set_enabled(False)
            f.digitalState(f.D2, f.INPUT)
            self.d2_entry.set_value(f.digitalRead(f.D2))
            
        # D3 port
        if(self.d3_checkbox.get_value() == True):
            self.d3_entry.set_enabled(True)
            f.digitalState(f.D3, f.OUTPUT)            
            if(int(self.d3_entry.get_value()) > 1): self.d3_entry.set_value(1)
            elif(int(self.d3_entry.get_value()) < 0): self.d3_entry.set_value(0)            
            f.digitalWrite(f.D3, int(self.d3_entry.get_value()))
        else:
            self.d3_entry.set_enabled(False)
            f.digitalState(f.D3, f.INPUT)
            self.d3_entry.set_value(f.digitalRead(f.D3))
            
        # D4 port
        if(self.d4_checkbox.get_value() == True):
            self.d4_entry.set_enabled(True)
            f.digitalState(f.D4, f.OUTPUT)            
            if(int(self.d4_entry.get_value()) > 1): self.d4_entry.set_value(1)
            elif(int(self.d4_entry.get_value()) < 0): self.d4_entry.set_value(0)            
            f.digitalWrite(f.D4, int(self.d4_entry.get_value()))
        else:
            self.d4_entry.set_enabled(False)
            f.digitalState(f.D4, f.INPUT)
            self.d4_entry.set_value(f.digitalRead(f.D4))
            
        # D5 port
        if(self.d5_checkbox.get_value() == True):
            self.d5_entry.set_enabled(True)
            f.digitalState(f.D5, f.OUTPUT)            
            if(int(self.d5_entry.get_value()) > 1): self.d5_entry.set_value(1)
            elif(int(self.d5_entry.get_value()) < 0): self.d5_entry.set_value(0)            
            f.digitalWrite(f.D5, int(self.d5_entry.get_value()))
        else:
            self.d5_entry.set_enabled(False)
            f.digitalState(f.D5, f.INPUT)
            self.d5_entry.set_value(f.digitalRead(f.D5))
            
        # D6 port
        if(self.d6_checkbox.get_value() == True):
            self.d6_entry.set_enabled(True)
            f.digitalState(f.D6, f.OUTPUT)            
            if(int(self.d6_entry.get_value()) > 1): self.d6_entry.set_value(1)
            elif(int(self.d6_entry.get_value()) < 0): self.d6_entry.set_value(0)            
            f.digitalWrite(f.D6, int(self.d6_entry.get_value()))
        else:
            self.d6_entry.set_enabled(False)
            f.digitalState(f.D6, f.INPUT)
            self.d6_entry.set_value(f.digitalRead(f.D6))
            
        # D7 port
        if(self.d7_checkbox.get_value() == True):
            self.d7_entry.set_enabled(True)
            f.digitalState(f.D7, f.OUTPUT)            
            if(int(self.d7_entry.get_value()) > 1): self.d7_entry.set_value(1)
            elif(int(self.d7_entry.get_value()) < 0): self.d7_entry.set_value(0)            
            f.digitalWrite(f.D7, int(self.d7_entry.get_value()))
        else:
            self.d7_entry.set_enabled(False)
            f.digitalState(f.D7, f.INPUT)
            self.d7_entry.set_value(f.digitalRead(f.D7))
            
        # I2C Refresh if true
        if(self.refresh_flag == True):
            self.refresh_flag = False             
            addresses = f.getI2CAddresses()         
            self.i2c_dev_buttons[0].set_text('')
            self.i2c_dev_buttons[1].set_text('')
            self.i2c_dev_buttons[2].set_text('')
            self.i2c_dev_buttons[3].set_text('')
            
            for i in range(len(addresses)):
                self.i2c_dev_buttons[i].set_text("Unknown [%s]" % (str(addresses[i])))
                
        # Check to see if poll read is checked 
        if(self.i2c_poll_checkbox.get_value() == True):
            self.i2c_value_entry.set_enabled(False)
            self.i2c_value_entry.set_text('') 
            
            # Read address value and detect if value is good
            if(self.i2c_addr_entry.get_value() != ''):
                try:
                    addr = int(self.i2c_addr_entry.get_value(), 0)
                    self.i2c_addr_entry.style['background'] = 'white'
                except:
                    addr = None
                    self.i2c_addr_entry.style['background'] = 'salmon'
            else:
                addr = None
            
            # Read I2C msb value and detect if value is good 
            if(self.i2c_16reg_entry.get_value() != ''):
                try:
                    msb = int(self.i2c_16reg_entry.get_value(), 0)
                    self.i2c_16reg_entry.style['background'] = 'white'
                except:
                    msb = None 
                    self.i2c_16reg_entry.style['background'] = 'salmon'
            else:
                msb = None 
                
            # Read I2C lsb value and detect if value is good 
            if(self.i2c_8reg_entry.get_value() != ''):
                try:
                    lsb = int(self.i2c_8reg_entry.get_value(), 0)
                    self.i2c_8reg_entry.style['background'] = 'white'
                except:
                    lsb = None 
                    self.i2c_8reg_entry.style['background'] = 'salmon'
            else:
                lsb = None             
            
            self.i2c_value_entry.style['background'] = 'rgb(215,215,215)'
            if((msb!=None) and (lsb!=None) and (addr!=None)):
                msb_temp = f.i2cRead(addr, msb, 1)[0]
                lsb_temp = f.i2cRead(addr, lsb, 1)[0]
                value = (msb_temp << 8) | lsb_temp
                self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(value)), str(hex(value)))
                
            elif((msb==None) and (lsb!=None) and (addr!=None)):
                value = f.i2cRead(addr, lsb, 1)[0] 
                self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(value)), str(hex(value)))   

            elif((msb!=None) and (lsb==None) and (addr!=None)):
                value = f.i2cRead(addr, msb, 1)[0]
                #value = (temp << 8)
                self.i2c_value_entry.attributes['placeholder'] = '%s [%s]' % (str(int(value)), str(hex(value)))
                
            else: 
                self.i2c_value_entry.style['background'] = 'salmon'
                self.i2c_value_entry.attributes['placeholder'] = '0 [0x0000]'
        else:
            self.i2c_value_entry.set_enabled(True)
            self.i2c_value_entry.style['background'] = 'white'
            

        # Set this to repeat ever 10ms
        Timer(0.01, self.controllerUpdateThread).start()
        
if __name__ == "__main__":
    # starts the webserver
    # optional parameters
    # start(FusionDiagnostics,address='127.0.0.1', port=8081, multiple_instance=False,enable_file_cache=True, update_interval=0.1, start_browser=True)

    start(FusionDiagnostics, debug=False, address='0.0.0.0', start_browser=False)