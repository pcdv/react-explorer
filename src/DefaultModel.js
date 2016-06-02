export default class DefaultModel {
  constructor(tree) {
    this.tree = tree
  }

  getRoot() {
    return this.tree
  }

  getLabel(data) {
    return data.label
  }

  isLeaf(data) {
    return !data.children
  }

  getChildren(data) {
    return data.children
  }

  getKey(data) {
    return data.key || data.label
  }
}
