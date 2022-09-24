<template>
  <div class="container">
    <div class="title">화상채팅 방 생성</div>
    <div class="sub-title">
      채팅방을 생성하여 방장으로 참가합니다.<br />채팅방 이름과 입장
      비밀번호를 설정해주세요.
    </div>

    <div class="creation-room-container">
      <div class="creation-room-box">
        <!-- id -->
        <div class="creation-room-form">
          <p class="creation-room-form__title">채팅방 이름</p>
          <input
            class="creation-room-form__input"
            placeholder="채팅방 이름를 설정해주세요."
          />
        </div>

        <div class="creation-room-form">
          <p class="creation-room-form__title">채팅 참여자 ID</p>
          <input
              class="creation-room-form__input"
              placeholder="채팅 참여자 ID를 콤마(,)로 구분해서 입력해주세요(EX. aaa,bbb,ccc)"
          />
        </div>

        <!-- pw -->
        <div class="creation-room-form">
          <p class="creation-room-form__title">입장 비밀 번호</p>
          <input
            class="creation-room-form__input"
            placeholder="입장 비밀 번호를 설정해주세요."
            type="password"
          />
        </div>
        <v-btn
          class="creation-room-box__enter-bnt"
          @click="this.$router.push('/videoRoom')"
        >
          생 성 하 기
        </v-btn>
        <v-btn
          class="creation-room-box__cancel-bnt"
          @click="this.$router.push('/')"
        >
          취 소
        </v-btn>
        <v-btn
          class="entry-room-box__cancel-bnt"
          @click="this.$router.push('videoRoom_entry')"
        >
          채팅방 참여
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// @import "./../../assets/scss/2_pages/room_creation.scss";
</style>