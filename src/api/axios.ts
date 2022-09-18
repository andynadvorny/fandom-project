import axios from 'axios'

export default axios.create({
  baseURL: "https://fandom-project2.azurewebsites.net/api/"
})