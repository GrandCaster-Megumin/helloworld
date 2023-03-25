# -*- coding: utf-8 -*-
# https://steam.oxxostudio.tw/category/python/ai/opencv-write-image.html
"""
Spyder Editor

This is a temporary script file.
"""
import cv2
from matplotlib import pyplot as plt
import numpy as np
from PIL import Image
img = np.zeros((2,2,4), dtype='uint8')   # 快速產生 500x500，每個項目為 [0,0,0] 的三維陣列
##print(img)
#plt.imshow(img, interpolation='nearest')
 
"""
try:
    #img[150:350, 150:350] = [0,0,255,0]  # 將中間 200x200 的每個項目內容，改為 [0,0,255]\
    img[0:3, 0:2] = [0,255,0,0]
    cv2.imwrite('oxxostudio.jpg', img)       # 存成 jpg
    cv2.imshow('oxxostudio', img)            # 顯示圖片
    cv2.waitKey(0)                           # 按下任意鍵停止
    cv2.destroyAllWindows()
except:
    print("x")
img[2,3]=[0,0,255,0]
#print(img)  

"""

armimg=[1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1]
base64="1,1,1"
armimg2=(base64.split(","))
print(armimg2)

"""
tarry=[]
finarry=[]
ct = 0
for rgb in range(0,4):
    for i in range(0,2):
        for j in range(0,2):
            img[j][i][rgb]= armimg[j*(2*4)+i*4+rgb]
            #index=y*(4*h)+x*4+rgb


          # 顯示圖片
cv2.imshow('oxxostudio', img)   
"""
"""
for i in range(0,400,4):
   # print(i)
    for j in range(4):
        #print(armimg[i+j])
        tarry.append(armimg[i+j])
    finarry.append(tarry)
    tarry=[]
print(finarry)

cv2.imwrite('oxxostudio.jpg', fin2arry)       # 存成 jpg
cv2.imshow('oxxostudio', fin2arry)            # 顯示圖片
cv2.waitKey(0)                           # 按下任意鍵停止
cv2.destroyAllWindows()
"""
