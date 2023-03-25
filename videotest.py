#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import cv2
# =============================================================================
import dlib_test as dl
import time
# =============================================================================
frame_count=0
FPS = "Initialing"
#  plotXY軸
t = [0]
m = [0]

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Cannot open camera")
    exit()
#cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
#cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
cap.set(cv2.CAP_PROP_FPS, 10) 
#cv2.namedWindow("live", cv2.WINDOW_AUTOSIZE); # 命名一個視窗，可不寫
while(True):
    # 擷取影像
    ret, frame = cap.read()
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break

    # 彩色轉灰階
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
# =============================================================================
    frame = dl.dilb_picture(frame,t,m)
#----FPS count and claculation
    if frame_count == 0:
        t_start = time.time()
    frame_count += 1
    if frame_count >= 10:
        FPS = "FPS=%1f" % (10 / (time.time() - t_start))
        frame_count = 0
    # print(int(cap.get(cv2.CAP_PROP_FPS)))
# cv2.putText(影像, 文字, 座標, 字型, 大小, 顏色, 線條寬度, 線條種類)
    cv2.putText(frame, FPS, (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
    cv2.imshow('live', frame)
# =============================================================================
    # 顯示圖片
   # cv2.imshow('live', frame)
    #cv2.imshow('live', gray)

    # 按下 q 鍵離開迴圈
    if cv2.waitKey(1) == ord('q'):
        break

# 釋放該攝影機裝置
cap.release()
cv2.destroyAllWindows()