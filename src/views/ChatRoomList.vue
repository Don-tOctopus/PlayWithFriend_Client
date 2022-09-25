<template>
    <div>
        <v-card
            class="px-6 py-8"
            max-width="344"
            variant="outlined"
        >   
            <v-card-title>채팅방 리스트</v-card-title> 
            <br/>
                <v-list color="transparent">
                <v-list-item
                    class="mb-2" 
                    flat 
                    block 
                    v-for="item in chatrooms" 
                    v-bind:key="item.chatRoomIdx" 
                    @click="enterRoom(item.chatRoomIdx)"
                    color="secondary"
                >   
                    <v-row>
                        <v-col cols="6" align="start">
                            {{item.roomName}}
                        </v-col>
                        <v-col  cols="6" align="end">
                            {{item.ucnt}}
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
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
                response => { this.chatrooms = response.data.data;}
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
