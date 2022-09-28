<template>
    <v-app ref="app">
        <div class="container" id="app">
        <div class="d-flex flex-column">
            
            <v-card
                max-width="800"
                width="800"
                height="600"
                class="mt-5 px-6 py-8 mx-auto"
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

    },
    methods: {
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
                    hostId: 'test@test.com',
                    chatRoomType: 'TEXT',
                    userList:['test@test.com']
                }
                
                params.append("name",this.room_name)
                axios.post('/api/chat/room', 
                    param)
                .then(
                    response => {
                        alert(response.data.data.roomName+"방 개설에 성공하였습니다.")
                        this.room_name = ''
                        this.enterRoom(response.data.data.chatRoomIdx)
                    }
                )
                .catch( () => { alert("채팅방 개설에 실패하였습니다.") } )
            }
        },
        enterRoom: function(roomId) {
            var sender = 'test';
            if(sender != "") {
                localStorage.setItem('wschat.sender',sender)
                localStorage.setItem('wschat.roomId',roomId)
                axios.get('/api/chat/room/enter/'+roomId).then(
                    () => {
                        location.href="/chatRoomDetail";
                    }
                )
            }
        }

    }
}


</script>
<style scoped>

</style>
