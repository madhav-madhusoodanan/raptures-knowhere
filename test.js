function Traverse(root, path) {
    // console.log(path)
    return path.reduce((newRoot, key) => {
        return newRoot[key]
    }, root)
}
function AssignAfterTraverse(root, path, newSubTree) {
    let tree = newSubTree

    while (path.length > 0) {
        let changedElem = path.pop()
        let parentTree = Traverse(root, path)
        parentTree = { ...parentTree, [changedElem]: tree }
        tree = parentTree
    }
    return tree
}
const tree = {
    1: { 
            4:  { 2: "3" }, 
            2:  { 
                    3:  { lmao: "ded" } 
                } 
        },
}
const path = [1, 2, 3, "mem"]
const newSubtree = "mem"
console.log(JSON.stringify(AssignAfterTraverse(tree, path, newSubtree)))