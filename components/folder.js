// import { useEffect, useState } from "react"

import { useState, useEffect } from "react"

function Traverse(root, path) {
    console.log(path)
    return path.reduce((newRoot, key) => {
        return newRoot[key]
    }, root)
}

export default function Folder() {
    const [root, setRoot] = useState({
        1: { 4: { 2: "3" }, 2: { 3: { lmao: "ded" } } },
    })
    const [path, setPath] = useState([])
    const [currentRoot, setCurrentRoot] = useState(root)
    useEffect(() => {
        setCurrentRoot(Traverse(root, path))
    }, [path])
    return (
        // < className="h-full w-full rounded grid place-items-center">
        <div className="h-5/6 w-5/6 mx-auto my-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
            {Object.keys(currentRoot).map((key, index) => (
                <Element
                    currentRoot={currentRoot}
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
        return (
            <a href={``}>
                <div
                    onClick={() => setPath([...path, rootElem])}
                    className="h-40 w-full rounded grid place-items-center bg-neutral-300 text-black cursor-pointer"
                >
                    <p className="w-1/2 font-bold text-center">{rootElem}</p>
                </div>
            </a>
        )
    }
}
