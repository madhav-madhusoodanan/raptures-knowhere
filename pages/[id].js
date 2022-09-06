import { useRouter } from "next/router"
import { useEffect } from "react"
import axios from "../components/axios"

export default function ReadIpfs() {
    const router = useRouter()
    useEffect(() => {
        const { id } = router.query
        axios.get(id).then(response => {
            
        })
    }, [])
}
