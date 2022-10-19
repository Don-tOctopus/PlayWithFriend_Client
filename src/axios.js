import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080'
})
if(localStorage.getItem("user") != null){
  var data = JSON.parse(localStorage.getItem('user'))
  instance.defaults.headers.common['Authorization'] = `Bearer ${data.tokenInfo.accessToken}`
  instance.defaults.headers.common['USER-EMAIL'] = data.email
} else {
  instance.defaults.headers.common['Authorization'] = null
  instance.defaults.headers.common['USER-EMAIL'] = null
}

// instance.defaults.headers.common['USER-EMAIL'] = localStorage.getItem('vuex')

export default instance