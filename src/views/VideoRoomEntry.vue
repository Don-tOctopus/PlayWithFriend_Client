<template>
  <div class="container">
    <v-card id="videoRoomCard">
        <v-card-title class="title">화상채팅 참가</v-card-title>
          <v-card-text class="entry-room-container">
            <div class="entry-room-box">
              <!-- id -->
              <div class="form">
                <p class="formTitle">참여 이름</p>
                <v-text-field
                  label="참여 이름를 설정해주세요"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </div>

              <!-- 참여 코드 -->
              <div class="entry-room-form">
                <p class="entry-room-form__title">채팅방 코드</p>
                <v-text-field
                  label="채팅방 코드를 입력해주세요."
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </div>

              <div class="entry-room-form">
                <p class="entry-room-form__title">입장 비밀 번호</p>
                <v-text-field
                  label="입장 비밀 번호를 입력해주세요."
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </div>
              <!-- 
              <div class="status-container">
                <p class="status-container__subtitle">참여 유형 선택</p>

                <div class="status-box">
                  <input type="radio" name="status" value="1" id="control_1" />
                  <label for="control_1">
                    <div class="status-box__picker">
                      <img src="img/logo_interviewer.png" />
                      <p>면접관으로 참여</p>
                    </div>
                  </label>

                  <input type="radio" name="status" value="2" id="control_2" />
                  <label for="control_2">
                    <div class="status-box__picker">
                      <img
                        src="img/logo_interviewee.png"
                        style="width: 50px; height: 50px; margin: 10px 0 9px 0"
                      />
                      <p>면접자로 참여</p>
                    </div>
                  </label>
                </div>
              </div> -->

              <br>
              <br>
              <v-btn
                class="entry-room-box__enter-bnt"
                @click="enterRoom(videoRoomIdx)"
              >
                입 장
              </v-btn>

              &nbsp;
              <v-btn
                class="entry-room-box__cancel-bnt"
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
      roomId: '',
      room: {},
      sender: ''
    }
  },
  created() {
  },
  methods: {
    enterRoom: function(roomId) {
      var sender = 'aaa'

      if(sender != "") {
        localStorage.setItem('wschat.sender', sender)
        localStorage.setItem('wschat.roomId', roomId)
// 룸 이름으로 날림
        axios.get('/api/video/room/enter').then(
          () => {
            location.href = "/videoRoom"
            // this.$router.push('/videoRoom')  
          }
        )
              
      }
    },
    back() {
      this.$router.push('/videoRoom_create')
    }
  }

};
</script>

<style lang="scss" scoped>
// @import "src\assets\scss\2_pages\videoRoom_entry.scss";
.formTitle {
  font-size: 16px;
}
.form {
  padding-bottom: 18px;
}
</style>