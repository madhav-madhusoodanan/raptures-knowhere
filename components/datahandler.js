/* 

the link for any data is
`https://dweb.link/ipfs/${cid}`
https://dweb.link/ipfs/QmSXCHSsFWnXo93VJTtRTNGogsz9Jm3ApDm6Di4axkfNWm
https://ipfs.io/ipfs/QmSXCHSsFWnXo93VJTtRTNGogsz9Jm3ApDm6Di4axkfNWm

test cid: QmcGV8fimB7aeBxnDqr7bSSLUWLeyFKUukGqDhWnvriQ3T
*/
import * as IPFS from "ipfs-core"

class DataHandler {
    handler
    isInitialized
    constructor() {
    	this.isInitialized = false
    }
    async initialize() {
        this.handler = await IPFS.create({ repo: "ok" + Math.random() })
        this.isInitialized = true
        console.log("CONSTRUCTED!")
    }
    async write(data) {
    	if(!this.isInitialized) await this.initialize()
        const { cid } = await this.handler.add(data)
        return cid.toString()
    }
    
    async read(cid) {
    	const time = Date.now()
    	if(!this.isInitialized) await this.initialize()
        let rawData = []
        const data = await this.handler.cat(cid)
        for await (let data1 of data) {
            rawData.push(data1)
        }
        if (typeof rawData[0] === "string") {
                	console.log(Date.now() - time)
            return this.interpretString(rawData)
        } else if (typeof rawData[0] === "object") {
        	console.log(Date.now() - time)
            return this.interpretBytes(rawData)
        }
    }
    interpretBytes(rawData) {
        const totalLen = rawData.reduce((total, elem) => total + elem.length)
        const processedData = new Uint8Array(totalLen)
        let currentLen = 0
        for (let i = 0; i < rawData.length; i++) {
            processedData.set(rawData[i], currentLen)
            currentLen += rawData[i].length
            rawData[i] = undefined
        }

        const sentence = String.fromCharCode.apply(String, processedData)
        return sentence
    }
    interpretString(data) {
        return data.reduce((prev, curr) => (prev += curr))
    }
}
const dataHandler = new DataHandler()
dataHandler

export default dataHandler