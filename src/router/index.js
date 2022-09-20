import { createWebHistory, createRouter } from "vue-router";
import ChatRoom from "../views/ChatRoom.vue";

const router = createRouter({
    history : createWebHistory(),
    routes : [ // path별 component를 추가한다.
        { 
            path : "/", 
            name : "Home", 
            component : ChatRoom
        },
    ]
});

export default router;
