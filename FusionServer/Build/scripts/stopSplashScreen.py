import os
from lcddisplay import LCD_2inch
from PIL import Image, ImageDraw, ImageFont

disp = LCD_2inch.LCD_2inch()
disp.Init()
disp.clear()

scriptAbsolutePath = os.path.dirname(__file__)
imageRelativePath = "./assets/img/22-0920_Recruit_StopScreen_(320x240).jpg"
imageFullPath = os.path.join(scriptAbsolutePath, imageRelativePath)
image = Image.open(imageFullPath)

image = image.rotate(180)
disp.ShowImage(image)
