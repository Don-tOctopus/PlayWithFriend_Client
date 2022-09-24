<template>
  <div class="container">
    <!-- 방제 넣기 -->
    <!--    <사용자 임의 추가/>-->
    <v-card class="video-container">
        <video ref="aaa_video" autoplay/>
        <video ref="bbb_video" autoplay/>
        <video ref="ccc_video3" autoplay/>
    </v-card>
    <br>
    <!-- 채팅방 리스트 이동 -->
    <v-btn class="goBack" @click="goEntryVideoRoom">나가기 </v-btn>

    
  </div>
</template>

<script>
    import Peer from "simple-peer";
    import Constants from "../utils/Constants.js";
    import SockJS from "sockjs-client";
    import Stomp from "webstomp-client";

    let socket;
    let stomp;
    export default {
        data() {
            return {
                // 접속한 id (임의 추가한 사용자)
                myId: "aaa",
                
                // caller의 stream 저장
                callerStream: "",
                
                // 자신과 연결된 세션 peer를 저장
                peers: []
            }
        },
        created() {
            this.userSet()
        },  
        methods: {
            goEntryVideoRoom() {
                location.href="/videoRoom_entry"
            },
            // 자신의 video 태그 연결 & stream 저장하는 메소드
            // mounted() 에서 사용
            async userSet() {

                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                }).then((stream) => {

                    // stream 추출
                    let videoStream = new MediaStream(stream.getVideoTracks())
                    this.callerStream = stream;

                    // video 태그와 연결
                    this.$refs[this.myId + "_video"].srcObject = videoStream;

                    // 소켓 통신 연결 메소드
                    // 아래 기술.
                    this.connect();
                });
            },
            connect() {
                // Stomp 소켓 통신 선언부
                socket = new SockJS(Constants.API_URL + "/ws-stomp");
                stomp = Stomp.over(socket);

                // subscribe&pub 정의
                stomp.connect(
                    {},
                    
                    // connectCallback
                    () => {

                        // 누군가 join 했을때 listen, 접속해 있는 전체 세션 리스트를 받는다.
                        stomp.subscribe("/sub/video/joined-room-info", (data) => {
                            // 접속해 있는 전체 세션 리스트
                            let users = JSON.parse(data.body)

                            // 마지막으로 접속한 user
                            let topIdx = users.length - 1;
                            let joinedID = users[topIdx].id;

                            // 인원이 한명 이하거나, 자신이 join 일경우는 return
                            if (topIdx <= 0 || users[topIdx].id === this.myId) return

                            // 아래 기술
                            // 자신이 접속해 있는 상태에서, 새로운 클라이언트가 접속한 경우,
                            // 해당 클라이언트와 연결하기 위한 메소드
                            this.initCall(joinedID);
                        });

                        // 자신이 접속했다는 socket send
                        stomp.send(
                            "/pub/video/joined-room-info",
                            JSON.stringify({from: this.myId})
                        )
                            console.log("this.myId :::", JSON.stringify({from: this.myId}))

                        stomp.subscribe("/sub/video/caller-info", (data) => {
                            data = JSON.parse(data.body)

                            // 나에게서 오거나(from me) 혹은 나에게 온(to me)이 아니면 return
                            if (data.from === this.myId || data.toCall !== this.myId) return;
                            
                            // 아래 구현
                            // callig을 받은 시점에, return call을 보내 signaling한다.
                            // caller의 데이터를 받고, 내(callee)의 데이터를 보내는 과정
                            this.returnCall(data.signal, data.from);
                        })
                    },

                    // onErrorCallback
                    () => {
                        console.log("ws error");
                });
            },
            // 새로운 client가 접속했을 때, 해당 클라이언트와 연결할 Peer을 생성
            initCall(joinedID) {
            console.log("join someone : ", joinedID)
            // peer 생성
            // sinmple peer 라이브러리
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: this.callerStream,
            });
            
            // caller의 signaling data를 새로 들어온 클라이언트에 send
            peer.on("signal", (data) => {
                
                // calling을 시작한 클라이언트(caller)의 singal 데이터 socket send
                stomp.send(
                "/pub/video/caller-info",
                JSON.stringify({
                    toCall: joinedID,
                    from: this.myId,
                    signal: data,
                })
                );
            });

            // 새로 들어온 클라이언트 video 연결
            peer.on("stream", (stream) => {
                this.$refs[joinedID + "_video"].srcObject = stream;
            });

            peer.on("error", (stream) => {
                console.log("error", stream)
            });

            // peer 저장.
            this.peers.push([peer, this.myId, joinedID])
            },
            // caller에게 요청을 받은 상태에서 callee의 signal data return
            returnCall(callerSignal, callerId) {
            
            // callee의 peer 생성
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: this.callerStream,
            });

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
            });

            peer.on("error", (stream) => {
                console.log("error", stream);
            });

            // callee와 caller의 연결. => Signaling
            // 이 시점에서 연결된다고 볼 수 있다.
            peer.signal(callerSignal);
                
            // 연결된 peer 리스트에 push
            this.peers.push([peer, this.myId, callerId]);
            },
        }
    }
</script>

<style lang="scss" scoped>
// @import "./../../assets/scss/2_pages/interview-room.scss";
.goBack{
    background-color: #FFEB99;
}
</style>