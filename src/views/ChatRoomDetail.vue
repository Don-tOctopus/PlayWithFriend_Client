<template>
    <head>
    <title>Websocket ChatRoom</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/webjars/bootstrap/4.3.1/dist/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container" id="app" v-cloak>
        <div>
            <h2>{{room.roomName}}</h2>
        </div>
        <div class="input-group">
            <div class="input-group-prepend">
                <label class="input-group-text">내용</label>
            </div>
            <input type="text" class="form-control" v-model="message" v-on:keypress.enter="sendMessage">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="sendMessage">보내기</button>
                <button class="btn btn-primary" type="button" @click="leaveRoom">나가기</button>
            </div>
        </div>
        <ul class="list-group">
            <li class="list-group-item" v-bind:key="message.idx" v-for="message in messages">
               <a> {{message.sender}} - {{message.message}}</a>
            </li>
        </ul>
        <div></div>
    </div>
    </body>
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
            this.messages.unshift({"type":recv.type,"sender":recv.type=='ENTER'?'[알림]':recv.senderId,"message":recv.content})
        },
        connect: function() {
            // pub/sub event
            ws.connect({}, () => { 
                console.log(this.$data)
                ws.send("/pub/chat/message", JSON.stringify({chatType:'ENTER', roomIdx:this.$data.roomId, senderId:this.$data.sender, content:'입장했어요!'}),{});
                ws.subscribe("/sub/chat/room/"+this.$data.roomId, message => {
                    var recv = JSON.parse(message.body);
                    this.recvMessage(recv);
                });
            }, function() {
                if(reconnect++ < 5) {
                    setTimeout(function() {
                        // console.log("connection reconnect");
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