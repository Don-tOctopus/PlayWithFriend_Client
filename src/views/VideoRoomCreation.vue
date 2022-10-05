<template>
  <div class="container">
    <v-card id="videoRoomCard">
        <v-card-title class="title">화상채팅 방 생성</v-card-title>

        <v-card-text class="creation-room-container">
          <div class="creation-room-box">
            <!-- name ///////////////////////// 패턴 설정-->
            <div class="form">
              <p class="formTitle">방명</p>
              <v-text-field
                v-model="roomName"
                label="채팅방 이름를 설정해주세요."
                v-on:kdyup.enter="roomName"
                :rules="nameRule"
                pattern="namepattern"
                maxLength="13"
                hide-details="auto"
              ></v-text-field>
            </div>
            <!-- pw ////////////////////////pattern설정-->
            <div class="form">
              <p class="formTitle">채팅방 비밀번호</p>
              <v-text-field
                v-model="roomPassword"
                label="채팅방 비밀번호를 설정해주세요."
                :rules="rules"
                pattern="PasswordPattern"
                maxLength="6"
                hide-details="auto"
              ></v-text-field>
            </div>
            <!-- 친구 초대 /////////////////////데이터 끌어와서 item에 넣기-->
            <div class="form">
              <p class="formTitle">친구 초대</p>
              <v-select
                v-model="friends"
                :items="friendsList"
                filled
                friends
                label="친구 초대"
                multiple
              ></v-select>
            </div>

            <br>
            <br>
            <v-btn
              class="entry-room-box__cancel-bnt"
              @click="this.$router.push('videoRoom_entry')"
            >
              기존 채팅방 참여
            </v-btn>

            <br>
            <br>
            <v-btn
              class="creation-room-box__enter-bnt"
              @click="createRoom()"
            >
              방 생 성
            </v-btn>

            &nbsp;
            <v-btn
              class="creation-room-box__cancel-bnt"
              @click="back()"
            >
              취 소
            </v-btn>
          </div>
        </v-card-text>
    </v-card> 
  </div>
</template>

<script>
import axios from '../axios.js'

export default {
  data() {
    return {
      friendsList: ['남유정', '원지윤'],
      roomName: '',
      roomPass: 0,
      friends: []
    }
  },
  created() {  

  },
  methods: {
    createRoom() {
      // if (this.roomName == '') {
      //     alert("채팅방 이름을 입력해 주세요.")
      //     return
      // } if (this.roomPass === 0) {
      //     alert("채팅방 비밀번호를 입력해 주세요.")
      //     return
      // } if (this.friends === []) {
      //     alert("초대 인원을 입력해 주세요.")
      //     return
      // } else {
          // var params = new URLSearchParams()
              // id로 넘기기
          this.friends.push('aaa@naver.com')
          var param = {
              hostId: 'aaa@naver.com',
              roomName: this.roomName,
              roomPass: this.roomPass,
              // id로 넘기기
              chatRoomRelationList: this.friends
          }
          
          // params.append("name",this.roomName)
            
          axios.post('/api/video/room/create', param).then(response => {
            alert(response.data.data.roomName+"방이 개설되었습니다.")
            this.enterRoom(response.data.data.chatRoomIdx)
          })
          .catch( () => { alert("채팅방 개설에 실패하였습니다.")
          })
      // }
    },
    // 파라미터로 roomIdx추가
    enterRoom() {
      // videoRoom + {roomIdx}
      this.$router.push('/videoRoom')
    },
    back() {
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss" scoped>
.videoRoomCard {
  border: #818F59;
}
.formTitle {
  font-size: 16px;
}
.form {
  padding-bottom: 18px;
}
</style>