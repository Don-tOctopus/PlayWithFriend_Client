import { createWebHistory, createRouter } from "vue-router";
import ChatRoom from "../views/ChatRoom.vue";
import VideoRoom from "../views/VideoRoom.vue";
import HomePage from "../views/HomePage.vue";
import ChatRoomList from "../views/ChatRoomList.vue";
import ChatRoomDetail from "../views/ChatRoomDetail.vue";


const router = createRouter({
    history : createWebHistory(),
    routes : [ // path별 component를 추가한다.
        { 
            path : "/", 
            name : "Home", 
            component : HomePage
        },
        { 
            path : "/chatRoom_entry", 
            name : "chatRoom", 
            component : ChatRoom
        },
        { 
            path : "/videoRoom_entry", 
            name : "videoRoomEntry", 
            component : VideoRoom
        },
        {
            path:"/chatRoomList",
            name: "chatroomlist",
            component: ChatRoomList
        },
        { 
            path : "/chatRoomDetail", 
            name : "chatRoomDetail", 
            component : ChatRoomDetail
        },
    ]
});

export default router;
