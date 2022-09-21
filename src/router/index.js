import { createWebHistory, createRouter } from "vue-router";
import ChatRoom from "../views/ChatRoom.vue";
import VideoRoom from "../views/VideoRoom.vue";
import HomePage from "../views/HomePage.vue";


const router = createRouter({
    history : createWebHistory(),
    routes : [ // path별 component를 추가한다.
        { 
            path : "/", 
            name : "Home", 
            component : HomePage
        },
        { 
            path : "/", 
            name : "chatRoom", 
            component : ChatRoom
        },
        { 
            path : "/videoRoom_entry", 
            name : "videoRoomEntry", 
            component : VideoRoom
        }
    ]
});

export default router;
