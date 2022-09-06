// import { useEffect, useState } from "react"

import { useState, useEffect } from "react"
import instance from "./axios"
import Input, { CreateFolder } from "./input"
import { AssignAfterTraverse, Traverse } from "./utils"


export default function Folder() {
    const [dummy, setDummy] = useState(0)
    const [root, setRoot] = useState({
        1: { 4: { 2: "3" }, 2: { 3: { lmao: "ded" } } },
    })
    const [path, setPath] = useState([])

    const editTree = (currentRoot) => {
        const rootLocal = AssignAfterTraverse(root, path, currentRoot)
        setRoot(rootLocal)
        setDummy(Date.now())
    }
    const setData = (name, value) => {
        console.log(root)
        const pathLocal = [...path, name]

        const rootLocal = AssignAfterTraverse(root, pathLocal, value)
        console.log(rootLocal)
        setRoot(rootLocal)

        setDummy(Date.now())
    }
    return (
        // < className="h-full w-full rounded grid place-items-center">
        <div className="h-5/6 w-5/6 mx-auto my-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-self-center">
            {path.length !== 0 && (
                <div
                    onClick={() => {
                        // path.pop()
                        setPath(
                            path.filter((_, index) => index !== path.length - 1)
                        )
                    }}
                    className="h-40 w-full rounded grid place-items-center bg-red-300 text-black cursor-pointer"
                >
                    <p className="w-1/2 font-bold text-center">Back</p>
                </div>
            )}
            <CreateFolder currentRoot={Traverse(root, path)} setCurrentRoot={editTree} />
            <Input setData={setData} />
            {Object.keys(Traverse(root, path)).map((key, index) => (
                <Element
                    currentRoot={Traverse(root, path)}
                    rootElem={key}
                    key={index}
                    setPath={setPath}
                    path={path}
                />
            ))}
        </div>
    )
}

function Element({ currentRoot, rootElem, setPath, path }) {
    const [data, setData] = useState("")
    const onClick = async () => {
        const response = await instance.get(currentRoot[rootElem])
        setData(response.data)
    }
    if (typeof currentRoot[rootElem] === "object") {
        return (
            <div
                onClick={() => setPath([...path, rootElem])}
                className="h-40 w-full rounded grid place-items-center bg-blue-300 text-black cursor-pointer"
            >
                <p className="w-1/2 font-bold text-center">{rootElem}</p>
            </div>
        )
    } else if (typeof currentRoot[rootElem] === "string") {
        if (data == "")
            return (
                <div
                    className="h-40 w-full rounded grid place-items-center bg-neutral-300 text-black cursor-pointer"
                    onClick={onClick}
                >
                    <p className="w-1/2 font-bold text-center">{rootElem}</p>
                </div>
            )
        else
            return (
                <a href={data} target="_blank" rel="noopener noreferrer">
                    <div className="h-40 w-full rounded grid place-items-center bg-green-300 text-black cursor-pointer">
                        <p className="w-1/2 font-bold text-center">
                            {rootElem}
                        </p>
                    </div>
                </a>
            )
    }
}

/* onClick={() => {
        dataHandler.read(currentRoot[rootElem]).then(data => {
            window.open(data, "_blank")
        })
    }} */
/* const [project, setProject] = useState({
    name: "lightning network project",
    img: "",
    logo: "",
    description: "",
    state: "",
}) */
