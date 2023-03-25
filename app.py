# pip install flask-socketio
from flask import Flask, render_template
from flask_socketio import SocketIO
import cv2          # 图像处理的库 OpenCv
import base64
import numpy as np  # 数据处理的库 numpy
import re
print('456')

app = Flask(__name__)
socketio = SocketIO()
socketio.init_app(app, cors_allowed_origins='*')

name_space = '/'  # socketio 的命名空间

@app.route('/')
def index():
    print()
    return render_template("./t1.html")

# 注册一个 my_event事件，响应前端发来的 my_event 事件的信息
@socketio.on('my_event', namespace=name_space)
def mtest_message(data):
    print(data)
    # 发送一个 事件名称是 dcenter1 的信息给前端
    event_name = 'dcenter1'
    broadcasted_data = {"type": "delete", "user_id": "123", "data": "1111111111111"}
    socketio.emit(event_name, broadcasted_data, broadcast=False, namespace=name_space)
#------傳圖片
import requests
import skimage
import cv2
from matplotlib import pyplot as plt
import numpy as np
from PIL import Image
from skimage import io
import dlib_test as dl
import time
@socketio.on('sendImg', namespace=name_space)
def sendImg_message(base64):
    t_start = time.time()
    armimg=(base64.split(","))
    img = np.zeros((256,256,3), dtype='uint8')   # 產生圖片陣列 100x100x4，每個項目為 [0,0,0] 的三維陣列
    for i in range(0,256):                       #1維轉3維
        for j in range(0,256):
            img[j][i][0]= (int)(armimg[j*(256*4)+i*4+2])
            img[j][i][1]= (int)(armimg[j*(256*4)+i*4+1])
            img[j][i][2]= (int)(armimg[j*(256*4)+i*4+0])
            #img[j][i][3]= (int)(armimg[j*(256*4)+i*4+3])
                
    img = dl.dilb_picture(img)
    print(time.time()-t_start)
    cv2.imshow("121",img)                    # 檢查轉換是否正卻
    cv2.waitKey(0)                           # 按下任意鍵停止
    cv2.destroyAllWindows()
    
# 下面注册 连接/断开/消息 三个默认事件
@socketio.on('connect', namespace=name_space)
def connected_msg():
    print('client connected.')

@socketio.on('disconnect', namespace=name_space)
def disconnect_msg():
    print('client disconnected.')

@socketio.on("message", namespace=name_space)
def message(data):
    print("message")


# base64解码函数
def D_BASE64(origStr):
    #当输入的base64字符串不是3的倍数时添加相应的=号
    if(len(origStr)%3 == 1): 
        origStr += "=="
    elif(len(origStr)%3 == 2): 
        origStr += "=" 
        
        
    # origStr = bytes(origStr, encoding='utf8') # 看情况进行utf-8编码
    dStr = base64.b64decode(origStr)
    return dStr

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000, debug=True)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)