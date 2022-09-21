<template>
    <head>
        <title>Websocket Chat</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- CSS -->
    <link rel="stylesheet" href="/webjars/bootstrap/4.3.1/dist/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container" id="app" v-cloak>
        <div class="row">
            <div class="col-md-12">
                <h3>채팅방 리스트</h3>
            </div>
        </div>
        <div class="input-group">
            <div class="input-group-prepend">
                <label class="input-group-text">방제목</label>
            </div>
            <input type="text" class="form-control" v-model="room_name" v-on:keyup.enter="createRoom">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="createRoom">채팅방 개설</button>
            </div>
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="goChatRoomList">채팅방 리스트</button>
            </div>
        </div>
    </div>
    </body>
</template>
<script>
import axios from '../axios.js'

export default {
    data(){
        return {
            room_name : '',
            chatrooms: [],
        }
    },
    created(){
        this.findAllRoom()

    },
    methods: {
        findAllRoom: function() {
            axios.get('/api/chat/room/all').then(
                response => { this.chatrooms = response.data.data; console.log(this.chatrooms)}
            );
            console.log(this.chatrooms)
        },
        goChatRoomList: function(){
            location.href="/chatRoomList"

        },
        createRoom: function() {
            if("" === this.room_name) {
                alert("방 제목을 입력해 주십시요.");
                return;
            } else {
                var params = new URLSearchParams();
                var param = {
                    roomName: this.room_name,
                    hostId: 'test',
                    chatRoomType: 'TEXT',
                    userList:['test']
                }
                console.log("asdf ", params)
                params.append("name",this.room_name);
                axios.post('/api/chat/room', 
                    param)
                .then(
                    response => {
                        alert(response.data.data.roomName+"방 개설에 성공하였습니다.")
                        this.room_name = '';
                        this.findAllRoom();
                    }
                )
                .catch( () => { alert("채팅방 개설에 실패하였습니다."); } );
            }
        },
        enterRoom: function(roomId) {
            var sender = 'test';
            if(sender != "") {
                localStorage.setItem('wschat.sender',sender);
                localStorage.setItem('wschat.roomId',roomId);
                location.href="/chat/room/enter/"+roomId;
            }
        }

    }
}


</script>
<style scoped>

</style>
