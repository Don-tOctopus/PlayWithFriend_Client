import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080'
})

instance.defaults.headers.common['USER-ID'] = 'test'
// instance.defaults.headers.common['USER-EMAIL'] = localStorage.getItem('vuex')

export default instance