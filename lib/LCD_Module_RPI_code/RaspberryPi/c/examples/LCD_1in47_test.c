#include "DEV_Config.h"
#include "LCD_1in47.h"
#include "GUI_Paint.h"
#include "GUI_BMP.h"
#include "test.h"
#include "image.h"
#include <stdio.h>		//printf()
#include <stdlib.h>		//exit()
#include <signal.h>     //signal()

void LCD_1IN47_test(void)
{
    // Exception handling:ctrl + c
    signal(SIGINT, Handler_1IN47_LCD);
    
    /* Module Init */
	if(DEV_ModuleInit() != 0){
        DEV_ModuleExit();
        exit(0);
    }
	
    /* LCD Init */
	printf("1.47inch LCD demo...\r\n");
	LCD_1IN47_Init(HORIZONTAL);
    LCD_1IN47_Clear(BLACK);
	LCD_SetBacklight(1023);
	
    UWORD *BlackImage;
    UDOUBLE Imagesize = LCD_1IN47_HEIGHT * LCD_1IN47_WIDTH * 2;
    printf("Imagesize = %d\r\n", Imagesize);
    if((BlackImage = (UWORD *)malloc(Imagesize)) == NULL) {
        printf("Failed to apply for black memory...\r\n");
        exit(0);
    }
    /*1.Create a new image cache named IMAGE_RGB and fill it with white*/
    Paint_NewImage(BlackImage, LCD_1IN47_WIDTH, LCD_1IN47_HEIGHT, 90, BLACK, 16);
    Paint_Clear(WHITE);
	/* GUI */

    
    printf("drawing...\r\n");
    /*2.Drawing on the image*/
	Paint_DrawPoint(2,18, BLACK, DOT_PIXEL_1X1,  DOT_FILL_RIGHTUP);
    Paint_DrawPoint(2,20, BLACK, DOT_PIXEL_2X2,  DOT_FILL_RIGHTUP);
    Paint_DrawPoint(2,23, BLACK, DOT_PIXEL_3X3, DOT_FILL_RIGHTUP);
    Paint_DrawPoint(2,28, BLACK, DOT_PIXEL_4X4, DOT_FILL_RIGHTUP);
    Paint_DrawPoint(2,33, BLACK, DOT_PIXEL_5X5, DOT_FILL_RIGHTUP);

    Paint_DrawLine( 20,  5, 80, 65, MAGENTA, DOT_PIXEL_2X2, LINE_STYLE_SOLID);
    Paint_DrawLine( 20, 65, 80,  5, MAGENTA, DOT_PIXEL_2X2, LINE_STYLE_SOLID);

    Paint_DrawLine( 148,  35, 208, 35, CYAN, DOT_PIXEL_1X1, LINE_STYLE_DOTTED);
    Paint_DrawLine( 178,   5,  178, 65, CYAN, DOT_PIXEL_1X1, LINE_STYLE_DOTTED);

    Paint_DrawRectangle(20, 5, 80, 65, RED, DOT_PIXEL_2X2,DRAW_FILL_EMPTY);
    Paint_DrawRectangle(85, 5, 145, 65, BLUE, DOT_PIXEL_2X2,DRAW_FILL_FULL);

    Paint_DrawCircle(178, 35, 30, GREEN, DOT_PIXEL_1X1, DRAW_FILL_EMPTY);
    Paint_DrawCircle(240, 35, 30, GREEN, DOT_PIXEL_1X1, DRAW_FILL_FULL);

    Paint_DrawString_EN(1, 70, "AaBbCc123", &Font16, RED, WHITE);
    Paint_DrawString_EN(1, 85, "AaBbCc123", &Font20, 0x000f, 0xfff0);
    Paint_DrawString_EN(1, 105, "AaBbCc123", &Font24, RED, WHITE);   
    Paint_DrawString_CN(1,125, "΢ѩ����Abc",  &Font24CN, WHITE, BLUE);
     

    // /*3.Refresh the picture in RAM to LCD*/
    LCD_1IN47_Display(BlackImage);
    DEV_Delay_ms(2000);
   
    // /* show bmp */
	// printf("show bmp\r\n");
    Paint_SetRotate(ROTATE_0);
	GUI_ReadBmp("./pic/LCD_1inch47.bmp"); 

    LCD_1IN47_Display(BlackImage);
    DEV_Delay_ms(2000);
       
    
    // /* Module Exit */
    free(BlackImage);
    BlackImage = NULL;
	DEV_ModuleExit();
}

