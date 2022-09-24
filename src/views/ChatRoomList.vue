<template>
    <div>
        <v-card
            class="px-6 py-8"
            max-width="344"
            variant="outlined"
        >   
            <v-card-title>채팅방 리스트</v-card-title> 
            <br/>
                <v-btn 
                    class="mb-2" 
                    flat 
                    block 
                    v-for="item in chatrooms" 
                    v-bind:key="item.chatRoomIdx" 
                    @click="enterRoom(item.chatRoomIdx)"
                    color="secondary"
                >
                    {{item.roomName}}
                </v-btn>
        </v-card>
    </div>
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
        },
        enterRoom: function(roomId) {
            var sender = 'test';
            if(sender != "") {
                localStorage.setItem('wschat.sender',sender);
                localStorage.setItem('wschat.roomId',roomId);
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
