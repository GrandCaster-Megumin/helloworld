const socket = io('/')
const socketpy = io.connect('http://127.0.0.1:5000')
// socket.io 固有事件：连接成功后执行该函数。
socketpy.on('connect', function () {
    console.log('connect')
});
const myPeer = new Peer(undefined, {
    host: '/',
    path: '/',
    secure: true,
    port: '3002',
})
const cameraPeer = new Peer(undefined, {
    host: '/',
    path: '/',
    secure: true,
    port: '3003',
})
const peers = []
var userName = ''
var messegeFlag = 1
var staffFlag = 0
const messegeButton = document.querySelector('#messegeButton')
const staffButton = document.querySelector('#staffButton')
const messege = document.querySelector('#messege')
const video = document.querySelector('#video')
const txtShow = document.querySelector('#txtShow')
const txtInput = document.querySelector('#txtInput')
const btnSend = document.querySelector("#btnSend")
const camera = document.querySelector('#camera')
const microphone = document.querySelector('#microphone')
const screen = document.querySelector('#screen')
const voice = document.querySelector('#voice')
const staff = document.querySelector('#staff')
const bottom_left = document.querySelector('#bottom_left')
const bottom_right = document.querySelector('#bottom_right')
const settingButton = document.querySelector('#settingButton')
const setting = document.querySelector('#setting')
const microphoneSelect = document.querySelector('#microphoneSelect')
const cameraSelect = document.querySelector('#cameraSelect')
const voteButton = document.querySelector('#voteButton')
const voteRooms = document.querySelector('#voteRooms')
const voteForm = document.querySelector('#voteForm')
var voteFlag = 0
const createVote = document.querySelector('#createVote')
var createVoteFlag = 0
const createVoteRoom = document.querySelector('#createVoteRoom')
const numOfVoteOptions = document.querySelector('#numOfVoteOptions')
const inputVoteOptions = document.querySelector('#inputVoteOptions')
var voteNum = 0
const SendcCeateVote = document.querySelector('#SendcCeateVote')
const voteName = document.querySelector('#voteName')
var voteRoomFlag = 0
const returnVote = document.querySelector('#returnVote')
var voteChooseFlag = []

var cameraStream
var screenStream
var shareId
var voiceFlag = 1
var settingFlag = 0
var options = {
    video: true,
    audio: true
}

const change_size = () => {
    if (messegeFlag || staffFlag || voteFlag || createVoteFlag || voteRoomFlag) {
        bottom_left.style.width = document.documentElement.clientWidth * 0.8 + 'px'
        video.width = document.documentElement.clientWidth * 0.8

    }
    else {
        bottom_left.style.width = document.documentElement.clientWidth - 10 + 'px'
        video.width = document.documentElement.clientWidth - 10
    }
    bottom_right.style.width = document.documentElement.clientWidth * 0.2 + 'px'
    const staffVideos = staff.querySelectorAll('video')
    staffVideos.forEach(staffVideo => {
        staffVideo.width = document.documentElement.clientWidth * 0.18
    })
    bottom_left.style.height = document.documentElement.clientHeight - 40 + 'px'
    bottom_right.style.height = document.documentElement.clientHeight - 40 + 'px'
    voteRooms.style.height = bottom_right.style.height
    voteRooms.style.width = bottom_right.style.width
    createVoteRoom.style.height = bottom_right.style.height
    createVoteRoom.style.width = bottom_right.style.width
    for (var i = 1; i <= voteNum; i++) {
        document.querySelector(`#voteRoom${i}`).style.height = bottom_right.style.height
        document.querySelector(`#voteRoom${i}`).style.width = bottom_right.style.width
    }
    video.height = document.documentElement.clientHeight - 40
    txtShow.rows = document.documentElement.clientHeight * 0.07 - 10
    txtShow.cols = document.documentElement.clientWidth * 0.025 - 5
    txtInput.size = document.documentElement.clientWidth * 0.018

}

const inputName = () => {
    while (userName == null || userName == '') {
        userName = window.prompt('你的名子')
    }
}

change_size()
window.onresize = change_size
inputName()

settingButton.addEventListener('click', () => {
    if (settingFlag) {
        settingFlag = 0
        setting.style.display = 'none'
        settingButton.style.backgroundColor = 'white'
        settingButton.style.color = 'black'
    }
    else {
        settingFlag = 1
        setting.style.display = 'block'
        settingButton.style.backgroundColor = 'black'
        settingButton.style.color = 'white'
    }
})

messegeButton.addEventListener('click', () => {
    if (messegeFlag) {
        clearButtonRight()
    }
    else {
        clearButtonRight()
        messegeFlag = 1
        messege.style.display = 'block'
        messegeButton.style.backgroundColor = 'black'
        messegeButton.style.color = 'white'
    }
    change_size()
})

staffButton.addEventListener('click', () => {
    if (staffFlag) {
        clearButtonRight()
    }
    else {
        clearButtonRight()
        staffFlag = 1
        staff.style.display = 'block'
        staffButton.style.backgroundColor = 'black'
        staffButton.style.color = 'white'
    }
    change_size()
})

voteButton.addEventListener('click', () => {
    if (voteFlag) {
        clearButtonRight()
    }
    else {
        clearButtonRight()
        voteFlag = 1
        voteRooms.style.display = 'block'
        voteButton.style.backgroundColor = 'black'
        voteButton.style.color = 'white'
    }
    change_size()
})

createVote.addEventListener('click', () => {
    clearButtonRight()
    createVoteFlag = 1
    createVoteRoom.style.display = 'block'
    change_size()
})

numOfVoteOptions.addEventListener('change', () => {
    inputVoteOptions.innerHTML = ''
    var count = numOfVoteOptions.value
    for (var i = 0; i < count; i++) {
        var input = document.createElement('input')
        var br = document.createElement('br')
        input.type = 'text'
        input.id = 'vote_option'
        inputVoteOptions.append(`選項${i + 1}: `)
        inputVoteOptions.appendChild(input)
        inputVoteOptions.appendChild(br)
    }
})

SendcCeateVote.addEventListener('click', () => {
    // var vote = document.createElement('button')
    // var br = document.createElement('br')
    // vote.id = `vote${voteNum}`
    // vote.textContent = voteName.value
    // voteForm.appendChild(vote)
    // voteForm.appendChild(br)
    // const voteOptions = document.querySelectorAll(`#vote${voteNum}_option`)
    // var voteRoom = document.createElement('div')
    // var returnButton = document.createElement('button')
    // var br2 = document.createElement('br')
    // var sendVote = document.createElement('button')
    // returnButton.id = 'return'
    // returnButton.textContent = '返回'
    // sendVote.id = 'sendVote'
    // sendVote.textContent = '送出'
    // voteRoom.appendChild(returnButton)
    // voteRoom.appendChild(br2)
    // voteRoom.id = `voteRoom${voteNum}`
    // voteRoom.className = 'voteRoom'
    // voteOptions.forEach(voteOption => {
    //     var radio = document.createElement('input')
    //     var br3 = document.createElement('br')
    //     radio.type = 'radio'
    //     radio.id = voteOption.id
    //     radio.name = voteOption.id
    //     radio.value = voteOption.value
    //     voteRoom.appendChild(radio)
    //     voteRoom.append(voteOption.value)
    //     voteRoom.appendChild(br3)
    //     socket.emit('vote', voteNum, voteName.value, radio.value)
    // })
    // socket.emit('vote', voteNum, 'end', 'end')
    // voteRoom.appendChild(sendVote)
    // bottom_right.appendChild(voteRoom)
    // const n = voteNum
    // voteNum++
    // voteName.value = ''
    // inputVoteOptions.innerHTML = ''
    // numOfVoteOptions[0].selected = true
    // returnButton.addEventListener('click', () => {
    //     voteButton.click()
    // })
    // sendVote.addEventListener('click', () => {
    //     document.querySelectorAll(`#vote${n}_option`).forEach(choose => {
    //         if(choose.checked){
    //             voteChooseFlag[n] = 1
    //             socket.emit('voteChoose', n, vote.textContent, choose.value)
    //             voteButton.click()
    //         }
    //     })
    // })
    // vote.addEventListener('click', () => {
    //     if(voteChooseFlag[n] != 1){
    //         clearButtonRight()
    //         voteRoom.style.display = 'block'
    //         voteRoomFlag = 1
    //         change_size()
    //     }
    //     else{
    //         document.querySelectorAll(`#vote${n}_option`).forEach(choose => {
    //             if(choose.checked){
    //                 alert(`你已投了: ${  choose.value}`)
    //             }
    //         })
    //     }
    // })
    // voteButton.click()

    socket.emit('getVoteNum', voteName.value)
})

returnVote.addEventListener('click', () => {
    voteButton.click()
})

const clearButtonRight = () => {
    messegeFlag = 0
    messege.style.display = 'none'
    messegeButton.style.backgroundColor = 'white'
    messegeButton.style.color = 'black'
    staffFlag = 0
    staff.style.display = 'none'
    staffButton.style.backgroundColor = 'white'
    staffButton.style.color = 'black'
    voteFlag = 0
    voteRooms.style.display = 'none'
    voteButton.style.backgroundColor = 'white'
    voteButton.style.color = 'black'
    createVoteFlag = 0
    createVoteRoom.style.display = 'none'
    if (voteNum > 1) {
        for (var i = 1; i < voteNum; i++) {
            document.querySelector(`#voteRoom${i}`).style.display = 'none'
        }
    }
    voteRoomFlag = 0
}

myPeer.on('open', id => {
    cameraPeer.on('open', cameraId => {
        // console.log('myId: ' + id + ' cameraId: ' + cameraId)
        socket.emit('join-room', ROOM_ID, id, cameraId, userName)

        socket.on('connection', (userId, userCameraId, name) => {
            // console.log('user: ' + userId + ' connection')
            if (screenStream) {
                myPeer.call(userId, screenStream)
            }
            const userDiv = document.createElement('div')
            userDiv.id = userCameraId
            const cameraVideo = document.createElement('video')
            if (voiceFlag) {
                cameraVideo.muted = true
            }
            else {
                cameraVideo.muted = false
            }
            var br = document.createElement("br");
            userDiv.append(name)
            userDiv.append(br)
            userDiv.append(cameraVideo)
            staff.append(userDiv)
            if (cameraStream) {
                cameraPeer.call(userCameraId, cameraStream)
            }

            const userInfo = {
                name: name,
                id: userId,
                cameraId: userCameraId
            }
            peers.push(userInfo)
            console.log(peers)
        })

        myPeer.on('call', call => {
            call.answer()
            call.on('stream', userStream => {
                video.srcObject = userStream
                let playPromise = video.play()
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        video.play()
                    }).catch(() => {

                    })
                }
                if (!voiceFlag) {
                    video.muted = false
                }
            })
        })

        cameraPeer.on('call', call => {
            call.answer()
            const cameraVideo = (document.getElementById(call.peer)).querySelector('video')
            call.on('stream', stream => {
                cameraVideo.srcObject = stream
                let playPromise = cameraVideo.play()
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        cameraVideo.play()
                    }).catch(() => {

                    })
                }

                socket.on('stopCameraStream', () => {
                    cameraVideo.srcObject = null
                })
            })
        })

        socket.on('message', (message) => {
            // console.log(message)
            txtShow.value = txtShow.value + message + '\n'
        })

        socket.on('shareId', userId => {
            shareId = userId
        })

        socket.on('voteNum', num => {
            const voteOptions = document.querySelectorAll('#vote_option')
            voteOptions.forEach(voteOption => {
                var radio = document.createElement('input')
                radio.type = 'radio'
                radio.id = `vote${num}_option`
                radio.name = `vote${num}_option`
                radio.value = voteOption.value
                socket.emit('vote', num, radio.value)
            })
            socket.emit('vote', num, 'end')
            voteName.value = ''
            inputVoteOptions.innerHTML = ''
            numOfVoteOptions[0].selected = true
            voteButton.click()
        })

        socket.on('vote', (num, vote_name, vote__option) => {
            // console.log(n + ' ' + vote__option)
            if (vote__option == 'end') {
                var sendVote = document.createElement('button')
                sendVote.id = 'sendVote'
                sendVote.textContent = '送出'
                const voteRoom = document.querySelector(`#voteRoom${num}`)
                voteRoom.appendChild(sendVote)
                sendVote.addEventListener('click', () => {
                    document.querySelectorAll(`#vote${num}_option`).forEach(choose => {
                        if (choose.checked) {
                            voteChooseFlag[num] = 1
                            socket.emit('voteChoose', num, choose.value)
                            voteButton.click()
                        }
                    })
                })
            }
            else {
                if (voteNum < num) {
                    var vote = document.createElement('button')
                    var br = document.createElement('br')
                    vote.id = `vote${num}`
                    vote.textContent = vote_name
                    voteForm.appendChild(vote)
                    voteForm.appendChild(br)
                    voteNum = num
                    var returnButton = document.createElement('button')
                    var br2 = document.createElement('br')
                    returnButton.id = 'return'
                    returnButton.textContent = '返回'
                    var voteRoom = document.createElement('div')
                    voteRoom.id = `voteRoom${num}`
                    voteRoom.className = 'voteRoom'
                    voteRoom.style.display = 'none'
                    voteRoom.appendChild(returnButton)
                    voteRoom.appendChild(br2)
                    bottom_right.appendChild(voteRoom)
                    vote.addEventListener('click', () => {
                        if (voteChooseFlag[num] != 1) {
                            clearButtonRight()
                            voteRoom.style.display = 'block'
                            voteRoomFlag = 1
                            change_size()
                        }
                        else {
                            document.querySelectorAll(`#vote${num}_option`).forEach(choose => {
                                if (choose.checked) {
                                    alert(`你已投了: ${choose.value}`)
                                }
                            })
                        }
                    })
                    returnButton.addEventListener('click', () => {
                        voteButton.click()
                    })
                    voteChooseFlag[num] = 0
                }
                var radio = document.createElement('input')
                var br = document.createElement('br')
                radio.type = 'radio'
                radio.id = `vote${num}_option`
                radio.name = `vote${num}_option`
                radio.value = vote__option
                const vote__Room = document.querySelector(`#voteRoom${num}`)
                vote__Room.appendChild(radio)
                vote__Room.append(vote__option)
                vote__Room.appendChild(br)
            }
        })

        socket.on('voteChoose', (n, vote_name, choose, numOfVotes) => {
            console.log(n + ' ' + vote_name + ' ' + choose + ' ' + numOfVotes)
        })

        socket.on('stopStream', () => {
            video.srcObject = null
        })

        socket.on('user-disconnected', userId => {
            const n = peers.map(x => x.id).indexOf(userId)
            if (n != -1) {
                cameraId = peers[n].cameraId
                peers.splice(n, 1)
                document.getElementById(cameraId).remove()
                if (shareId == userId) {
                    video.srcObject = null
                    shareId = null
                }
            }
            // console.log(peers)
        })
    })
})

btnSend.addEventListener('click', () => {
    if (txtInput.value == '') return
    let txt = userName + ': ' + txtInput.value;
    socket.emit('message', txt)
    txtInput.value = ''
})

txtInput.addEventListener('keypress', event2 => {
    if (event2.keyCode === 13 || event2.which === 13) {
        if (txtInput.value == '') return
        let txt = userName + ': ' + txtInput.value;
        socket.emit('message', txt)
        txtInput.value = ''
    }
})

camera.addEventListener('click', () => {
    if (cameraPeer) {
        if (cameraStream) {
            cameraStop()
            microphoneStop()
        }
        if (options.video === false) {
            options.video = {
                deviceId: cameraSelect.value,
                width: 512,
                height: 512
            }
        }
        else {
            options.video = false
        }
        sendCameraStream()
    }
})

microphone.addEventListener('click', () => {
    if (cameraPeer) {
        if (cameraStream) {
            cameraStop()
            microphoneStop()
        }
        if (options.audio === false) {
            options.audio = { deviceId: microphoneSelect.value }
        }
        else {
            options.audio = false
        }
        sendCameraStream()
    }
})

navigator.mediaDevices.getUserMedia(options).then(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
        // console.log(devices)

        devices.forEach(device => {
            if (device.deviceId === 'default' || device.deviceId === 'communications') {
                return
            }
            const option = document.createElement('option')
            option.value = device.deviceId
            if (device.kind === 'audioinput') {
                option.text = device.label
                microphoneSelect.appendChild(option)
            }
            else if (device.kind === 'videoinput') {
                option.text = device.label
                cameraSelect.appendChild(option)
            }
        })
        options.video = false
        options.audio = false
    })
})

microphoneSelect.addEventListener('change', () => {
    if (cameraStream) {
        cameraStop()
        microphoneStop()
        if (options.audio != false) {
            options.audio = { deviceId: microphoneSelect.value }
        }
        sendCameraStream()
    }
})

cameraSelect.addEventListener('change', () => {
    if (cameraStream) {
        cameraStop()
        microphoneStop()
        if (options.video != false) {
            options.video = { deviceId: cameraSelect.value }
        }
        sendCameraStream()
    }
})

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d', { willReadFrequently: true });
var video2 = document.createElement("video")
let close_eye_time =0
const sendCameraStream = () => {
    if (options.video || options.audio) {
        navigator.mediaDevices.getUserMedia(options).then(stream => {
            console.log('123')
            cameraStream = stream
            if (options.video) {
                video2.width = 256
                video2.height = 256
                video2.srcObject = stream
                video2.play()
                canvas.width = video2.width
                canvas.height = video2.height
                camera.style.backgroundColor = 'black'
                camera.style.color = 'white'
                x()
                sendStream(stream)
            }
            if (options.audio) {
                microphone.style.backgroundColor = 'black'
                microphone.style.color = 'white'
            }
            peers.forEach(user => {
                console.log(user.cameraId)
                cameraPeer.call(user.cameraId, cameraStream)
            })
        })
    }
}
const x = () => {
    if (options.video  === false){}
    else {
        console.log(canvas.width + " " + canvas.height)
        ctx.drawImage(video2, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let Gray=[];
        for(let i=0,j=0; i<imageData.data.length; i+=4,j+=1) {
            let r = imageData.data[i];
            let g = imageData.data[i+1];
            let b = imageData.data[i+2];
            let gr = (r*38 + g*75 + b*15) >> 7;
            Gray[j] = gr;
        }
        socketpy.emit('sendImg',userName+","+Gray);
        console.log(imageData.data)
        setTimeout(x, 500)
    }
}
screen.addEventListener('click', () => {
    if (true) {
        if (!screenStream) {
            if (video.srcObject) {
                return
            }
            navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            }).then(stream => {
                video.srcObject = stream
                screenStream = stream
                video.muted = true
                video.play()
                screen.style.backgroundColor = 'black'
                screen.style.color = 'white'
            })
        }
        else {
            screenStop()
            socket.emit('stopStream');
        }
    }
})
socketpy.on(userName, function(data) {
    close_eye_time++;
    if(close_eye_time>10)
    {
        //console.log('Iam', data);
        alert(data+"同學\n如果沒在睡覺請按下確定");
        close_eye_time = 0;
    }
  });

// video.addEventListener('loadedmetadata', () => {
//     video.play()
//     if ((video.videoWidth / video.videoHeight) < (video.width / video.height)) {
//         var new_width, new_height
//         new_height = video.height
//         new_width = (new_height * video.videoWidth) / video.videoHeight
//         canvas.width = new_width
//         canvas.height = new_height
//     }
//     else {
//         var new_width, new_height
//         new_width = video.width
//         new_height = (new_width * video.videoHeight) / video.videoWidth
//         canvas.width = new_width
//         canvas.height = new_height
//     }
//     canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height)
//     // console.log(canvas.toDataURL("image/png"))
//     console.log(canvasContext.getImageData(0,0,canvas.width, canvas.height).data)
//     // socket.emit('img', canvas.toDataURL("image/png"))
//     if (!video.srcObject) {
//         return
//     }
// })

const sendStream = (stream) => {
    peers.forEach(user => {
        myPeer.call(user.id, stream)
    })
    socket.emit('shareId')
}

const cameraStop = () => {
    socket.emit('stopCameraStream')
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => {
            track.stop()
        })
        cameraStream = null
    }
    camera.style.backgroundColor = 'white'
    camera.style.color = 'black'
}

const microphoneStop = () => {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => {
            track.stop()
        })
        cameraStream = null
    }
    microphone.style.backgroundColor = 'white'
    microphone.style.color = 'black'
}

const screenStop = () => {
    if (screenStream) {
        screenStream.getTracks().forEach(track => {
            track.stop()
        })
        screenStream = null
        video.srcObject = null
        screen.style.backgroundColor = 'white'
        screen.style.color = 'black'
    }
}

voice.addEventListener('click', () => {
    if (voiceFlag) {
        voiceFlag = 0
        voice.style.backgroundColor = 'white'
        voice.style.color = 'black'
        if (!screenStream) {
            video.muted = false
        }
        const userVideos = staff.querySelectorAll('video')
        userVideos.forEach(userVideo => {
            userVideo.muted = false
        })
    }
    else {
        voiceFlag = 1
        voice.style.backgroundColor = 'black'
        voice.style.color = 'white'
        video.muted = true
        const userVideos = staff.querySelectorAll('video')
        userVideos.forEach(userVideo => {
            userVideo.muted = true
        })
    }
})