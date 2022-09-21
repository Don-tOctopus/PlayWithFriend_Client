<template>
  <div class="container">
    <div class="title">면접 참여</div>
    <div class="sub-title">
      생성된 면접방에 면접자 혹은 면접관으로 참가합니다.<br />이름과 면접방 고유
      코드, 입장 비밀번호, 참여 유형을 설정해주세요.
    </div>

    <div class="entry-room-container">
      <div class="entry-room-box">
        <!-- id -->
        <div class="entry-room-form">
          <p class="entry-room-form__title">참여 이름</p>
          <input
            class="entry-room-form__input"
            placeholder="참여 이름를 설정해주세요."
          />
        </div>

        <!-- 참여 코드 -->
        <div class="entry-room-form">
          <p class="entry-room-form__title">면접방 고유 코드</p>
          <input
            class="entry-room-form__input"
            placeholder="면접방 코드를 입력해주세요."
          />
        </div>

        <!-- pw -->
        <div class="entry-room-form">
          <p class="entry-room-form__title">입장 비밀 번호</p>
          <input
            class="entry-room-form__input"
            placeholder="입장 비밀 번호를 설정해주세요."
            type="password"
          />
        </div>

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
        </div>
        <button
          class="entry-room-box__enter-bnt"
          @click="this.$router.push('/interview-room')"
        >
          입 장 하 기
        </button>
        <button
          class="entry-room-box__cancel-bnt"
          @click="this.$router.push('/')"
        >
          취 소
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// @import "./../../assets/scss/2_pages/room_entry.scss";
</style>