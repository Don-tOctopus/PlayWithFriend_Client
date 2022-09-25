<template>
    <v-app ref="app">
        <div class="container" id="app">
        <div class="d-flex flex-column">
            
            <v-card
                class="mt-15 px-6 py-8"
                max-width="344"
                variant="outlined"
            >
                <v-card-title >새로운 채팅방 생성</v-card-title>
                <br>
                <v-row>
                    <v-text-field
                        v-model="room_name"
                        solo
                        label="방제목"
                        v-on:keyup.enter="createRoom"
                        class="mb-2"
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-col d-flex>
                        <v-btn class="mr-3" variant="outlined" @click="createRoom">채팅방 개설</v-btn>
                        <v-btn variant="outlined" @click="goChatRoomList">채팅방 리스트</v-btn>
                    </v-col>
                </v-row>
            </v-card>
            
        </div>
    </div>
    </v-app>
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
                response => { this.chatrooms = response.data.data;}
            );
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
