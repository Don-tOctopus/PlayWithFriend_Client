<template>
    <v-card width="300px">
    <v-layout>
      <v-navigation-drawer
        color="#FFEB99"
        theme="light"
        permanent
      >
        <v-list color="transparent">
          <v-list-item active-color="primary" prepend-icon="mdi-view-dashboard" title="메인" @click="goHomeView"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="채팅" @click="goChatRoom"></v-list-item>
          <v-list-item prepend-icon="mdi-video-account" title="화상채팅" @click="goVideoChatRoom"></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn v-if="this.$store.getters.isLogin" block>
              Logout
            </v-btn>
            <v-btn v-else block @click="goLogin">
              Login
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <!-- <v-main style="height: 400px"></v-main> -->
    </v-layout>
  </v-card>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    created(){
      console.log(this.$store.getters.isLogin)
    },
    methods:{
      goLogin(){
        location.href="/login"
      },
      goHomeView(){
        location.href="/"
      },
      goChatRoom(){
        location.href="/chatroom_create"
      },
      goVideoChatRoom() {
        location.href="/videoRoom_create"
      }
    }
}
</script>
<style scoped>
v-navigation-drawer {
  background-color: #FFEB99;
}
</style>