<template>
  <div class="container">
    <v-card id="videoRoomCard">
        <v-card-title class="title">화상채팅 방 생성</v-card-title>
        <!-- <div class="sub-title">
          채팅방을 생성하여 방장으로 참가합니다.<br />채팅방 이름과 입장
          비밀번호를 설정해주세요.
        </div> -->

        <v-card-text class="creation-room-container">
          <div class="creation-room-box">
            <!-- id -->
            <div class="form">
              <p class="fromTitle">방명</p>
              <v-text-field
                label="채팅방 이름를 설정해주세요."
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </div>
            <!-- pw -->
            <div class="form">
              <p class="fromTitle">입장 비밀번호</p>
              <v-text-field
                label="입장 비밀 번호를 설정해주세요."
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
            </div>
            <!-- 인원 설정 -->
            <div class="form">
              <p class="fromTitle">인원 설정</p>
              <v-select
                :items="items"
                label="참여 인원 수"
              ></v-select>  
            </div>
            <!-- 친구 초대 -->
            <div class="form">
              <p class="fromTitle">친구 초대</p>
              <input
                  class="creation-room-form__input"
                  placeholder="친구의 ID를 콤마(,)로 구분해서 입력해주세요(EX. aaa,bbb,ccc)"
              />  
            </div>

            <br>
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
              @click="this.$router.push('/videoRoom')"
            >
              방 생 성
            </v-btn>

            &nbsp;
            <v-btn
              class="creation-room-box__cancel-bnt"
              @click="this.$router.push('/')"
            >
              취 소
            </v-btn>
          </div>
        </v-card-text>
    </v-card> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "./../../assets/scss/2_pages/room_creation.scss";
.videoRoomCard {
  border: #818F59;
}
.fromTitle {
  font-size: 16px;
}
.form {
  padding-bottom: 18px;
}
</style>