export const KNOWHERE = ""
export const provider = ethers.getDefaultProvider("http://localhost:8545")
export function Traverse(root, path) {
    // console.log(path)
    return path.reduce((newRoot, key) => {
        return newRoot[key]
    }, root)
}
export function AssignAfterTraverse(root, path, newSubTree) {
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
export const ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "cid",
                type: "string",
            },
        ],
        name: "Update",
        type: "event",
    },
    {
        inputs: [],
        name: "read",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "cid",
                type: "string",
            },
        ],
        name: "update",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]
