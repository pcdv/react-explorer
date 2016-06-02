export default class DefaultModel {
  constructor(tree) {
    this.tree = tree
  }

  getRoot() {
    return this.tree
  }

  getLabel(node) {
    return node.label
  }

  isLeaf(node) {
    return !node.children
  }

  getChildren(node) {
    return node.children
  }

  getKey(node) {
    return node.key || node.label
  }
}
