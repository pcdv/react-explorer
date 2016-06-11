/**
 * Default model implementation. Compatible with object trees with the following format:
 * { label: "foo", children: [
 *   { label: "bar" }
 * ]}
 * 
 * Property "key" will be used as key if set, otherwise "label" will be used.
 */
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
