<template>
  <div class="container">
    <v-card id="videoRoomCard">
        <v-card-title class="title">화상채팅 참가</v-card-title>
          <v-card-text class="entry-room-container">
            <div class="entry-room-box">
              <!-- ////////////////////////////////////////////////////////////방제에 대한 코드 불러온 후 적기 -->
              <div>
                참여 방 이름: hiii
              </div>

              <div class="entry-room-form">
                <p class="entry-room-form__title">입장 비밀 번호</p>
                <v-text-field
                  v-model="roomPass"
                  label="입장 비밀 번호를 입력해주세요."
                  v-on:keyup.enter="roomPass"
                  :rules="passRules"
                  pattern= passPatern
                  hide-details="auto"
                  maxlength="6"
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
                @click="enterRoom()"
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
      roomId: 0,
      room: {},
      sender: 'aa1',
      // passPatern = /^$/,
      passRules: {
        
      }
    }
  },
  created() {
    this.roomId = 1
  },
  methods: {
    enterRoom() {
      var sender = 'aaa'

////////////////////////////////////// Test동안만 묶어놓기
      // if(this.roomPass === undefined) {
      //   alert("방 비밀번호를 입력해주세요.")
      //   return
      // } 
      if(sender != "") {
        localStorage.setItem('wschat.sender', sender)
        // localStorage.setItem('wschat.roomId', roomIdx)
        
        console.log("sender", sender)
        console.log("rromi", this.roomId)
        console.log("code", this.roomPass)
        //////////////////////////////////////////// enter+{roomIdx}
        axios.post('/api/video/room/enter', {userId: sender, roomIdx: this.roomId, roomPassword: this.roomPass}).then(() => {
      //////////////////////////////////////////// videoRoom+{roomIdx}
            this.$router.push('/videoRoom')  
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