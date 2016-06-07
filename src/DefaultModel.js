export default class DefaultModel {
  constructor(root) {
    this.root = root
  }

  getRoot() {
    return this.root
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
