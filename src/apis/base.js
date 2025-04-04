import axios from "axios"

const myAxios = axios.create({
  baseURL: 'http://xduyg.top:3000/api'
  // baseURL: 'http://127.0.0.1:3000/api'
})

export default myAxios