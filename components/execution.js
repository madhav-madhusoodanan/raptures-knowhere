import { BigNumber, ethers } from "ethers"
import { ABI, KNOWHERE, provider } from "./utils"

class Executor {
    knowhere
    rapturesContract
    constructor() {
        const privateKey =
            localStorage.getItem("privateKey")
        const wallet = new ethers.Wallet(privateKey, provider)
        this.knowhere = new ethers.Contract(KNOWHERE, ABI, wallet)

        /* connect to metamask */
        console.log("CONSTRUCTED!")
    }
    async getProfile() {
        const cid = await this.knowhere.read()
        return cid
    }
    async putProfile(cid) {
        await this.knowhere.update(cid)
    }
}

export default Executor
