<template>
  <div class="container">
    <!-- 방제 넣기 -->
    <!--    <사용자 임의 추가/>-->
    <v-card class="video-container mx-auto" align-center>
        <video ref="aaa_video" autoplay/>
        <!-- <video id="test-video" width="200" height="200" autoplay loop muted></video> -->
    </v-card>
    <br>
    
    <div id="videoBtn" class=" d-flex justify-center align-center">
        <v-row class="btn">
            
            <!-- 비디오 On/Off -->
            <v-btn v-if="!isVideo" icon @click="changeVideoState()" style="background-color: red; color:white">
                <v-icon>mdi-video-box-off</v-icon>
            </v-btn>
            <v-btn v-else icon @click="changeVideoState()" style="background-color: green; color:white">
                <v-icon>mdi-video-box</v-icon>
            </v-btn>

            &nbsp;&nbsp;&nbsp;
            <!-- 마이크 On/Off -->
            <v-btn v-if="!isAudio" icon @click="changeAudioState()" style="background-color: red; color:white">
                <v-icon>mdi-microphone-off</v-icon>
            </v-btn>
            <v-btn v-else icon @click="changeAudioState()" style="background-color: green; color:white">
                <v-icon>mdi-microphone</v-icon>
            </v-btn>

            &nbsp;&nbsp;&nbsp;
            <!-- 나가기 -->
            <v-btn class="goBack" @click="goEntryVideoRoom" icon>
                <v-icon>mdi-door-open</v-icon>
            </v-btn>
        </v-row>
    </div>

<!-- user -->
          <div class="interviwee-container">
        <Interviewee
            ref="bbbb"
            @click="changeSelfIntroductionInfo('손모은')"
            :userName="'손모은'"
            :connectingState="connectingState"
            :userId="'bbbb'"

        />

        <Interviewee
            ref="cccc"
            @click="changeSelfIntroductionInfo('이윤환')"
            :userName="'이윤환'"
            :connectingState="connectingState"
            :userId="'cccc'"
        />

        <Interviewee
            ref="interviewee3"
            :userName="'-'"
            :connectingState="connectingState"
            :userId="'interviewee3'"
        />

        <Interviewee
            ref="interviewee4"
            :userName="'-'"
            :connectingState="connectingState"
            :userId="'interviewee4'"
        />
      </div>

      <!-- chattt -->
      <div class="text-record-list">
              <div class="chat" v-for="chat in this.chatList" :key="chat">
                <p class="chat__name">{{ chat.name }}</p>
                <p class="chat__contents">{{ chat.text }}</p>
              </div>
            </div>

            <div class="chat-send-container">
              <input class="chat-send-container__chat-input" ref="chatInput"/>
              <v-btn 
                  @click="this.sendChat()"
              >
              hihi
              </v-btn>
            </div>
    
  </div>
</template>

<script>
    import Peer from "simple-peer";
    import Constants from "../utils/Constants.js";
    import SockJS from "sockjs-client";
    import Stomp from "webstomp-client";
    
import {connect} from "extendable-media-recorder-wav-encoder"
    
import {MediaRecorder, register} from "extendable-media-recorder"

    let socket;
    let stomp;
    let mediaRecorder

    export default {
        data() {
            return {
                
                // 접속한 id (= 내 id)
                myId: "aaa",

                // video, audio 활성화 상태
                isVideo: false,
                isAudio: false,
                
                // caller의 stream 저장
                callerStream: "",
                
                // 자신과 연결된 세션 peer를 저장
                peers: [],

                // 사용자의 통신 연결 상태 (before - connected)
                connectingState:
                {
                    aaaa: "before", // aaaa => 회원 ID
                    // dddd: "before",
                    // interviewer3: "before",
                    // interviewer4: "before",
                    bbbb: "before",
                    cccc: "before",
                    // interviewee3: "before",
                    // interviewee4: "before",
                }
            }
        },
        created() {
            this.userSet()
        },  
        mounted() {
            //  if(!this.$cookies.isKey("idCookie")){
            //     alert("로그인을 완료한 후 시도해주세요.");
            //     this.$router.replace({name:'Home'})
            //     return
            // }

            // this.myId = this.$cookies.get('idCookie')
        },
        methods: {
            goEntryVideoRoom() {
                location.href="/videoRoom_entry"
            },

            // 자신의 video 태그 연결 & stream 저장하는 메소드
            async userSet() {

                // 내 상태 connected 상태로
                this.connectingState[this.myId] = "connected"
                // console.log("connectingState", this.connectingState)
                await register(await connect())

                // video, audio에 연결
                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then((stream) => {

                    // stream 추출
                    let videoStream = new MediaStream(stream.getVideoTracks())
                    let audioStream = new MediaStream(stream.getAudioTracks())
                    
                    this.callerStream = stream

                    // video 태그와 연결
                    this.$refs[this.myId + "_video"].srcObject = videoStream

                    // 소켓 통신 연결 메소드
                    this.connect()

                    // 
                    mediaRecorder = new MediaRecorder(audioStream, {
                        mimeType: "audio/wav"
                    })

                    // mediaRecorder 함수 지정
                    mediaRecorder.ondataavailable = (e) => {
                        let reader = new FileReader()
                        let base64data

                        reader.readAsDataURL(e.data)
                        reader.onloadend = () => {
                            base64data = reader.result
                            
                            // stt 소켓 쏘기
                            "/pub/video/stt",
                            JSON.stringify({
                            from: this.myId,
                            base64data: base64data,
                            })

                            if(this.myId !== 'bbbb' && this.myId !== 'cccc') return

                            // wav파일을 생성하기 위한 base64 인코딩된 string을 소켓으로 쏨.
                            stomp.send(
                                "/pub/video/audio-sentiment",
                                JSON.stringify({
                                from: this.myId,
                                base64data: base64data,
                                })
                            )
                        }
                    }
                })
            },

            // 통신 연결
            connect() {

                // Stomp 소켓 통신 선언부
                socket = new SockJS(Constants.API_URL + "/ws-stomp");
                stomp = Stomp.over(socket);

                // subscribe & publish 정의
                stomp.connect(
                    {},
                    
                    // connectCallback
                    () => {

                        // 누군가 join 했을때 listen, 접속해 있는 전체 세션 리스트를 받음
                        // (나 == caller)
                        stomp.subscribe("/sub/video/joined-room-info", (data) => {
console.log("data:::::::::", data)
                            // 접속해 있는 전체 세션 리스트
                            let users = JSON.parse(data.body)

                            // 마지막으로 접속한 user
                            let topIdx = users.length - 1
                            let joinedID = users[topIdx].id

                            // 인원이 한명 이하거나, 자신이 join 일경우는 return
                            if (topIdx <= 0 || users[topIdx].id === this.myId) return

                            // 자신이 접속해 있는 상태에서 새로운 클라이언트가 접속한 경우,
                            // 해당 클라이언트와 연결하기 위한 메소드
                            this.initCall(joinedID)
                        })

                        // Caller에게 온 Signaling Data를 확인한 후 Caller에게 다시 Signaling Answer
                        // (나 == callee)
                        stomp.subscribe("/sub/video/caller-info", (data) => {
                            // 구독자 정보
                            data = JSON.parse(data.body)
                            // console.log("111", data)

                            // 나에게서 오거나(from me) 혹은 나에게 온(to me)이 아니면 return
                            if (data.from === this.myId || data.toCall !== this.myId) return;
                            
                            // video 송출
                            this.connectingState[data.form] = "connected"

                            // callig을 받은 시점에, returnCall을 보내 signaling
                            // caller의 데이터를 받고, (나)callee 데이터를 보내는 과정
                            this.returnCall(data.signal, data.from);
                        })

                        // acceptCall을 받은 시점에서 caller와 callee를 연결
                        stomp.subscribe("/sub/video/callee-info", (data) => {
                            data = JSON.parse(data.body)

                            if (data.from === this.myId) return

                            console.log("accept call subscribe!!!!!")

                            this.connectingState[data.to] = "connected"

                            this.peers.forEach((p) => {
                                if (p[1] === data.to && p[2] === data.from) {
                                p[0].signal(data.signal);
                                return false;
                                }
                            })
                        })

                        // 세션을 나갔을때 관련된 peer을 다 remove (close session event)
                        stomp.subscribe("/sub/video/close-session", (data) => {
                            console.log("나가난가ㅏ나마")
                            
                            let closedUser = String(JSON.parse(data.body))
                            this.connectingState[closedUser] = "before"

                            // peers 목록에서 삭제.
                            let i = 0
                        
                            while (i < this.peers.length) {
                                if (this.peers[i][1] === closedUser || this.peers[i][2] === closedUser) {
                                    console.log(this.peers[i])

                                    this.peers[i][0].destroy()
                                    this.peers.splice(i, 1)
                                } else {
                                    i++
                                }
                            }
                        })

                        // 자신이 접속했다는 socket send (socket join send)
                        ////////////////////////////////////////// 이미 있던 방이라는 가정을 한다면 roomidx 던져줘야함 create따로 만들어야 함
                        stomp.send(
                            "/pub/video/joined-room-info",
                            JSON.stringify({from: this.myId})
                        )

                        // chat socket
                        stomp.subscribe("/sub/video/chat", (data) => {
                            data = JSON.parse(data.body)

                            console.log(data)
                            
                            if (data["text"] === "") return

                            this.chatList.push({name: this.user[data['from']], text: data["text"]})
                            // 통신 console 찍어보기
                        })
                    },

                    // onErrorCallback
                    () => {
                        console.log("ws error");
                    }
                )
            },
            
            // 새로운 client(joinedID)가 접속했을 때, 해당 클라이언트와 연결할 Peer을 생성
            initCall(joinedID) {
                console.log("join someone : ", joinedID)

                // 나와 연결할 client에 대해 peer 생성 (sinmple peer 라이브러리)
                const peer = new Peer({
                    initiator: true, // 요청자 (callee)
                    trickle: false,
                    stream: this.callerStream, //??????????????????????????????????????????????? 내 stream인거 같긴 한데....
                })
            
                // caller의 signaling data를 새로 들어온 클라이언트(callee)에 send
                peer.on("signal", (data) => {
                    
                    // calling을 시작한 클라이언트(caller)의 singal 데이터 socket send
                    stomp.send(
                    "/pub/video/caller-info",
                        JSON.stringify({
                            toCall: joinedID,
                            from: this.myId,
                            signal: data,
                        })
                    )
                })

                // 새로 들어온 클라이언트 video 연결
                peer.on("stream", (stream) => {
                    this.$refs[joinedID + "_video"].srcObject = stream;
                })

                peer.on("error", (stream) => {
                    console.log("error", stream)
                })

                // peer 저장.
                this.peers.push([peer, this.myId, joinedID])
            },

            // caller에게 요청을 받은 상태에서 callee의 signal data return
            returnCall(callerSignal, callerId) {
            
                // callee의 peer 생성
                const peer = new Peer({
                    initiator: false, // 요청자(callee)가 아니므로 false
                    trickle: false,
                    stream: this.callerStream, // callee가 생성한 stream???????????????????
                })

                // callee의 정보를 caller에게 보냄.
                peer.on("signal", (data) => {
                    stomp.send(
                        "/pub/video/callee-info",
                        JSON.stringify({
                            from: this.myId,
                            to: callerId,
                            signal: data,
                        })
                    );
                });

                // caller 의 비디오 연결
                peer.on("stream", (stream) => {
                    this.$refs[callerId + "_video"].srcObject = stream;
                })

                peer.on("error", (stream) => {
                    console.log("error", stream);
                })

                // callee와 caller의 연결 => Signaling (이 시점에서 연결)
                peer.signal(callerSignal)
                    
                // 연결된 peer 리스트에 push
                this.peers.push([peer, this.myId, callerId])
            },

            // 비디오 On/Off
            changeVideoState() {

            if (this.isVideo) {
                this.isVideo = false
                this.callerStream.getTracks().forEach(track => track.enabled = true)
            } else {
                this.isVideo = true
                this.callerStream.getTracks().forEach(track => track.enabled = false)
            }
            },

            // 오디오 On/Off
            async changeAudioState() {
                if (this.isAudio) {
                    // recording stop
                    this.isAudio = false;
                    mediaRecorder.stop();
                    //clearInterval(this.auto_audio_api_func);
                } else {
                    // rocording start
                    this.isAudio = true;
                    mediaRecorder.start();
                    // let runAutoAudioAPI = async () => {
                    //
                    //   // 녹음 시작
                    //   mediaRecorder.start();
                    //
                    //   // 5000초만큼 기다렸다가,
                    //   await this.waitTime(5000);
                    //
                    //   // 녹음 멈추기.
                    //   mediaRecorder.stop();
                    // }
                    //
                    // // 10초에 한번씩 socket을 쏴서 음성 판다.
                    // this.auto_audio_api_func = setInterval(() => {
                    //   runAutoAudioAPI();
                    // }, 10000)
                    console.log(mediaRecorder.state);
                }
            },

            sendChat() {
            stomp.send(
                "/pub/video/chat",
                JSON.stringify({
                    from: this.myId,
                    text: this.$refs["chatInput"].value,
                })
            )
            this.$refs["chatInput"].value = ""
            }
        }
    }
</script>

<style lang="scss" scoped>
.goBack{
    background-color: #FFEB99;
}

.video-container {
    background-color:#f7edc7aa;
    width: 70%;
    height: 80%;
}

.btn{
    margin-left: 450px;
}

#videoBtn {
    background-color:#401201;
    height: 70px;
    width: 90%;
    margin: auto;
    border-radius: 10px;
}
// 비디오 거울 효과
video{
    transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg); /* Safari and Chrome */
    -moz-transform:rotateY(180deg); /* Firefox */
}
</style>