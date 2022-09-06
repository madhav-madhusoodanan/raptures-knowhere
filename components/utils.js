
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