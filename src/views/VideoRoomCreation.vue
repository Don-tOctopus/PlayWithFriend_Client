<template>
  <div class="container">
    <v-card id="videoRoomCard">
        <v-card-title class="title">화상채팅 방 생성</v-card-title>

        <v-card-text class="creation-room-container">
          <div class="creation-room-box">
            <!-- id -->
            <div class="form">
              <p class="formTitle">방명</p>
              <v-text-field
                label="채팅방 이름를 설정해주세요."
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </div>
            <!-- pw -->
            <div class="form">
              <p class="formTitle">입장 비밀번호</p>
              <v-text-field
                label="입장 비밀 번호를 설정해주세요."
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </div>
            <!-- 인원 설정 -->
            <div class="form">
              <p class="formTitle">인원 설정</p>
              <v-select
                :items="items"
                label="참여 인원 수"
              ></v-select>  
            </div>
            <!-- 친구 초대 -->
            <div class="form">
              <p class="formTitle">친구 초대</p>
              <input
                  class="creation-room-form__input"
                  placeholder="친구의 ID를 콤마(,)로 구분해서 입력해주세요(EX. aaa,bbb,ccc)"
              />  
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
      items: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      roomName: '',
      roomPass: 0,
      roomMax: 1,
      friend: []
    }
  },
  created() {        
    axios.post('/api/video/room/').then(
          () => {
            location.href = "/videoRoom"  
          }

  )},
  methods: {
    createRoom() {
      if (this.roomName == '') {
        alert("채팅방 이름을 입력해 주세요.")
        return
      } else if (this.roomPass === 0) {
        alert("채팅방 비밀번호를 입력해 주세요.")
        return
      } else if (this.roomMax === 1) {
        alert("인원 수를 입력해 주세요.")
        return
      } else if (this.friend === []) {
        alert("초대 인원을 입력해 주세요.")
        return
      }
      else {
        var params = new URLSearchParams()

        var param = {
            hostId: 'aaa@naver.com',
            roomName: this.roomName,
            roomPass: this.roomPass,
            roomMax: this.roomMax,
            friends: this.friends,
            chatRoomType: 'VIDEO',
            userList:['aaa@naver.com']
        }
        
        params.append("name",this.roomName)

        axios.post('/api/video/room', param).then(response => {
          alert(response.data.data.roomName+"방이 개설되었습니다.")
          this.roomName = ''
          this.enterRoom(response.data.data.chatRoomIdx)
        })
        .catch( () => { alert("채팅방 개설에 실패하였습니다.")
        })
      }
    },
    enterRoom() {
      this.$router.push('/videoRoom')
    },
    back() {
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "./../../assets/scss/2_pages/room_creation.scss";
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