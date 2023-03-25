# 对静态人脸图像文件进行68个特征点的标定

# Author:   coneypo
# Blog:     http://www.cnblogs.com/AdaminXie
# GitHub:   https://github.com/coneypo/Dlib_face_detection_from_camera

import dlib         # 人脸识别的库 Dlib
import numpy as np  # 数据处理的库 numpy
import cv2          # 图像处理的库 OpenCv
# 自製向量a^2+b^2開根號
def dist(a,b):
    return (abs(a[0]-b[0])**2+abs(a[1]-b[1])**2) ** 0.5
def hello(fiximg):
    print ("hello")
# Dlib 检测器和预测器
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

# =============================================================================
# 做韓式

# 读取图像文件
img_rd = cv2.imread("456.jpg")
# img_rd = fiximg
img_gray = cv2.cvtColor(img_rd, cv2.COLOR_RGB2GRAY)
# 人脸数
faces = detector(img_gray, 0)

# 待会要写的字体
font = cv2.FONT_HERSHEY_SIMPLEX

# 标 68 个点
if len(faces) != 0:
# =============================================================================
# 臉畫框
    for i, d in enumerate(faces):
        x1 = d.left()
        y1 = d.top()
        x2 = d.right()
        y2 = d.bottom()
        cv2.rectangle(img_rd, (x1, y1), (x2, y2), (0, 255, 0), 4, cv2.LINE_AA)
# =============================================================================
    # 检测到人脸
    for i in range(len(faces)):
        # 取特征点坐标
        landmarks = np.matrix([[p.x, p.y] for p in predictor(img_rd, faces[i]).parts()])
        for idx, point in enumerate(landmarks):
            # 68 点的坐标
            pos = (point[0, 0], point[0, 1])

            # 利用 cv2.circle 给每个特征点画一个圈，共 68 个
            cv2.circle(img_rd, pos, 2, color=(139, 0, 0))
            # 利用 cv2.putText 写数字 1-68
            cv2.putText(img_rd, str(idx), pos, font, 0.2, (255, 255, 255), 1, cv2.LINE_AA)#187

    cv2.putText(img_rd, "faces: " + str(len(faces)), (20, 50), font, 1, (0, 0, 0), 1, cv2.LINE_AA)
    # =============================================================================
    # 抓眼睛6個點
    left_eye = [[landmarks[p,0],landmarks[p,1]] for p in  range(36,42)]
    right_eye = [[landmarks[p,0],landmarks[p,1]] for p in  range(42,48)]
    #眼距偵測
    a=dist(left_eye[1],left_eye[5])
    b=dist(left_eye[2],left_eye[4])
    c=dist(left_eye[0],left_eye[3])
    left_ear=(a+b)/(2*c)
    # print(a,b,c)
    a=dist(right_eye[1],right_eye[5])
    b=dist(right_eye[2],right_eye[4])
    c=dist(right_eye[0],right_eye[3])
    right_ear=(a+b)/(2*c)
    ear=(left_ear+right_ear)/2.0
    # print(a,b,c)
    print(ear)
    # =============================================================================
else:
    # 没有检测到人脸
    cv2.putText(img_rd, "no face", (20, 50), font, 1, (0, 0, 0), 1, cv2.LINE_AA)
    
# cv2.imshow('live', img_rd)
# =============================================================================


# 窗口显示
# 参数取 0 可以拖动缩放窗口，为 1 不可以
cv2.namedWindow("image", 0)
cv2.namedWindow("image", 1)

cv2.imshow("image", img_rd)
cv2.waitKey(0)