// import { useEffect, useState } from "react"

import { useState, useEffect } from "react"
import Input, { CreateFolder } from "./input"

function Traverse(root, path) {
    // console.log(path)
    return path.reduce((newRoot, key) => {
        return newRoot[key]
    }, root)
}
function AssignAfterTraverse(root, path, newSubTree) {
    let tree = newSubTree
    const tempPath = path

    while (tempPath.length > 0) {
        let changedElem = tempPath.pop()
        let parentTree = Traverse(root, tempPath)
        parentTree = { ...parentTree, [changedElem]: tree }
        tree = parentTree
    }
    return tree
}

export default function Folder() {
    const [dummy, setDummy] = useState(0)
    const [root, setRoot] = useState({
        1: { 4: { 2: "3" }, 2: { 3: { lmao: "ded" } } },
    })
    const [path, setPath] = useState([])
    const [currentRoot, setCurrentRoot] = useState(root)
    useEffect(() => {
        setCurrentRoot(Traverse(root, path))
    }, [path])

    useEffect(() => {
        console.log("remded")
    }, [dummy])

    const editTree = (currentRoot) => {
        setRoot(AssignAfterTraverse(root, path, currentRoot))
        setDummy(Date.now())
        // console.log(root)
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
            <CreateFolder currentRoot={currentRoot} setCurrentRoot={editTree} />
            <Input />
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
    console.log(currentRoot)
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

/* const [project, setProject] = useState({
    name: "lightning network project",
    img: "",
    logo: "",
    description: "",
    state: "",
}) */
