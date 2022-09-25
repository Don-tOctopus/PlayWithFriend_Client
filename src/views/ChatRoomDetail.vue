<template>
    
    <v-sheet
        class=""
        height="600"
        width="600"
    >
    
        <v-card
            class="overflow-y-auto px-6 py-8"
            max-width="600"
            height="500"
            variant="outlined"
        >
            <v-banner
                class="justify-center text-h5"
                sticky
                >
                <span
                    class="font-weight-bold"
                >{{room.roomName}}</span>
            </v-banner>
            <div class="container" id="app" v-cloak>
                <div class="chatList mt-2" v-bind:key="message.idx" v-for="message in messages">
                    <div class="sender">
                        {{message.sender}}
                    </div>
                    <div class="message">
                        {{message.message}}
                    </div>
                </div>
            </div>
        </v-card>
        <v-row justify="end">
            <v-col cols="10">
                <v-text-field
                    v-model="message"
                    solo
                    prepend-icon="mdi-chat"
                    placeholder="메세지를 입력하세요"
                    v-on:keypress.enter="sendMessage"
                    class="mb-2"
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="mt-3">
                <v-btn class="mr-3" variant="outlined" @click="sendMessage">보내기</v-btn>
            </v-col>
        </v-row>
        <v-row class="mt-4">
            <v-btn variant="outlined" @click="leaveRoom">나가기</v-btn>
        </v-row>
    </v-sheet>
</template>
<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import axios from '../axios.js'

var sock = new SockJS("http://localhost:8080/ws-stomp");
var ws = Stomp.over(sock);
var reconnect = 0;

export default {
    data() {
        return {
            roomId: '',
            room: {},
            sender: '',
            message: '',
            messages: []
        }
    },
    created() {
        this.roomId = localStorage.getItem('wschat.roomId');
        this.sender = localStorage.getItem('wschat.sender');
        this.findRoom();
        this.connect();
    },
    methods: {
        findRoom: function() {
            axios.get('/api/chat/room/'+this.roomId).then(response => { this.room = response.data.data });
        },
        leaveRoom: function(){
            axios.post('/api/chat/room/leave/'+this.roomId).then( ()  => {
                location.href="/chatRoomList"
            })
        },
        sendMessage: function() {
            if(this.message != ''){
                ws.send("/pub/chat/message", JSON.stringify({chatType:'TALK', roomIdx:this.roomId, senderId:this.sender, content:this.message}),{})
                this.message = '';
            } else {
                alert("메세지를 입력해주세요.");
            }
            
        },
        recvMessage: function(recv) {
            this.messages.push({"type":recv.type,"sender":recv.type=='ENTER'?'[알림]':recv.senderId,"message":recv.content})
        },
        connect: function() {
            // pub/sub event
            ws.connect({}, () => { 
                ws.send("/pub/chat/message", JSON.stringify({chatType:'ENTER', roomIdx:this.$data.roomId, senderId:this.$data.sender, content:'입장했어요!'}),{});
                ws.subscribe("/sub/chat/room/"+this.$data.roomId, message => {
                    var recv = JSON.parse(message.body);
                    this.recvMessage(recv);
                });
            }, function() {
                if(reconnect++ < 5) {
                    setTimeout(function() {
                        sock = new SockJS("http://localhost:8080/ws-stomp");
                        ws = Stomp.over(sock);
                        this.connect();
                    },10*1000);
                }
            });
        }
    }
}
</script>
<style scoped>
div .sender {
    font-size:15px;
    width : 50px;
    height: 30px;
    background-color: lightblue;
}
div .message {
    font-size: 20px;
    padding: 10px 10px;
    background-color: lightgray;
    width:100%;
    height:40px;
}
</style>