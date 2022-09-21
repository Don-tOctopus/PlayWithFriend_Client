<template>
  <div class="container">
    <div class="title-box">
      <p class="title-box__title1">InterBack</p>
      <p class="title-box__title2">혁신적인 온라인 면접 관리의 시작</p>
      <div class="title-box__title3">
        <p>면접 특화 AI 회의록 서비스&nbsp;</p>
        <p class="title-box__title3--color">InterBack</p>
      </div>
    </div>

    <div class="contents">
      <div class="contents__sub">
        <div class="room-box" @click="changePage('room-creation')">
          <img src="img/img_make_room.png"/>

          <p class="room-box__title">면접 생성</p>
          <p class="room-box__subtitle">
            면접장을 생성하여<br/>
            면접관으로 참여합니다.
          </p>
          <p class="room-box__arrow">→</p>
        </div>
      </div>

      <div class="contents__sub">
        <div class="room-box" @click="changePage('room-entry')">

          <div class="room-box">
            <img src="img/img_enter_room.png"/>

            <p class="room-box__title">면접 참여</p>
            <p class="room-box__subtitle">
              생성된 면접방에<br/>
              참여합니다.
            </p>
            <p class="room-box__arrow">→</p>
          </div>
        </div>
      </div>

      <div class="contents__sub">

        <div class="room-box" @click="changePage('interview-list')">
          <div class="room-box">
            <img src="img/img_history_room.png"/>

            <p class="room-box__title">면접 관리</p>
            <p class="room-box__subtitle">
              면접 기록과 일정의<br/>다양한 정보를 관리합니다.
            </p>
            <p class="room-box__arrow">→</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    changePage(pageName) {
      if (!this.$cookies.isKey("idCookie")) {
        alert("로그인을 완료해주세요.");
        return;
      }
      this.$router.push(pageName);
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "./../../assets/scss/2_pages/main_home.scss";
</style>