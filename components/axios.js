import axios from "axios"

const instance = axios.create({
    baseURL: "https://ipfs.io/ipfs/",
})
export default instance
