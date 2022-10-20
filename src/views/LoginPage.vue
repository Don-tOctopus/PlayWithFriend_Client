<template>
  <div class="container">
    <v-card id="videoRoomCard">
        <v-card-title class="title">로그인</v-card-title>
          <v-card-text class="entry-room-container">
            <div class="entry-room-box">
              <div class="entry-room-form">
                <p class="entry-room-form__title">Email</p>
                <v-text-field
                  v-model="email"
                  label="이메일을 입력해주세요."
                  hide-details="auto"
                  maxlength="30"
                  :class="{ 'input-danger': emailHasError }"
                ></v-text-field>
                <p
                  v-show="valid.email"
                  class="input-error">
                  이메일 주소를 정확히 입력해주세요.
                </p>
              </div>
              <div class="entry-room-form">
                <p class="entry-room-form__title">Password</p>
                <v-text-field
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  v-model="password"
                  :type="show ? 'text' : 'password'"
                  label="비밀 번호를 입력해주세요."
                  hide-details="auto"
                  maxlength="20"
                  @click:append-inner="show = !show"
                  :class="{ 'input-danger': passwordHasError }"
                ></v-text-field>
                <p
                  v-show="valid.password"
                  class="input-error">
                  비밀번호를 정확히 입력해주세요.
                </p>
              </div>

              <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                Sign in with Google
              </g-signin-button>
              <br>
              <br>
              <v-btn
                class="entry-room-box__enter-bnt"
                @click="onLogin()"
              >
                로그인
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
// import axios from '../axios.js'

export default {
  data() {
    return {
      valid: {
        email: false,
        password: false,
      },
      emailHasError: false,
      passwordHasError: false,
      show: false,
      email:'',
      password:'',
      googleSignInParams: {
        client_id: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
      }
    }
  },
  created() {
  },
  watch:{
    'email': function() {
      this.checkEmail()
    },
    'password': function() {
      this.checkPassword()
    },
  },
  methods: {
    onLogin(){
  
      this.$store
        .dispatch("login", {
          "email" : this.email,
          "password" : this.password
        })
        .then(() => {
          location.href="/"
        })
        .catch(err => (this.error = err.response.data.error));
    },
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      // const profile = googleUser.getBasicProfile() // etc etc
      googleUser.getBasicProfile() 
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    joinRoom(){
      this.$router.push('/')
    },
    back(){
      this.$router.push('/')
    },
    checkEmail() {
      // 이메일 형식 검사
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/

      if (!validateEmail.test(this.email) || !this.email) {
        this.valid.email = true
        this.emailHasError = true
        return
      } 
      else {
        this.valid.email = false
        this.emailHasError = false
      }
    },
    checkPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

      if(!validatePassword.test(this.password) || !this.password){
        this.valid.password = true
        this.passwordHasError = true
        return
      }
      else {
        this.valid.password = false
        this.passwordHasError = false
      }

    }
    
  }
};
</script>

<style lang="scss" scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

 .input-error {
    line-height: 16px;
    font-size: 11px;
    color: red;
  }
  .title-danger {
    color: red;
  }
  .input-danger {
    border-bottom: 1px solid red !important;
  }
</style>