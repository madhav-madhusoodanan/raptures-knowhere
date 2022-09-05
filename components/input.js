import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

export default function Input({setData}) {
    const [data, setdata] = useState(null)
    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader()

        reader.onabort = () => console.log("file reading was aborted")
        reader.onerror = () => console.log("file reading has failed")
        reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result
            console.log(binaryStr)
        }
        reader.readAsDataURL(acceptedFiles[0])
        const data = reader.result
        setdata(data)
        console.log(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
    })
    return (
        <div {...getRootProps()} className="border-dashed border-2 border-gray-500 h-40 rounded grid place-items-center p-4">
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="text-center">Drop the files here ...</p>
            ) : (
                <p className="text-center">Drag & drop a file here, or just click...</p>
            )}
        </div>
    )
}

export function CreateFolder({ currentRoot, setCurrentRoot }) {
    const [name, setName] = useState("")
    const onCreate = () => {
        if (currentRoot[name]) {
            alert("folder already exists!")
            return
        }
        currentRoot[name] = {}
        setCurrentRoot(currentRoot)
    }
    return (
        <div className="flex flex-col w-full align-middle justify-start gap-4 h-40 border-dashed border-2 border-gray-500 p-2 rounded">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New folder name"
                className="px-4 py-2 rounded bg-slate-400 placeholder-white w-full"
            />
            <div
                onClick={onCreate}
                className="px-4 py-2 rounded bg-blue-500 text-white font-bold cursor-pointer w-max mx-auto"
            >
                Create
            </div>
        </div>
    )
}
