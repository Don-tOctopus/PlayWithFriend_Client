<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item list-group-item-action" v-for="item in chatrooms" v-bind:key="item.chatRoomIdx">
                {{item.roomName}}
                <button class="btn btn-primary" type="button" @click="enterRoom(item.chatRoomIdx)">입장</button>
            </li>
        </ul>
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
