import AbstractStore from './AbstractStore'
import _ from 'lodash'

class NodeWrapper {
  constructor(data, parent, model) {
    this.data = data
    this.parent = parent
    this.label = model.getLabel(data)
    this.isLeaf = model.isLeaf(data)
    this.open = false
    this.selected = false
  }
}

function scan(node, list) {
  var index = list.length
  node.index = index
  list.push(node)
  if (node.open) {
    node.children.forEach(n => scan(n, list))
  }
}

export default class Tree extends AbstractStore {
  constructor(model) {
    super()
    this.model = model
    this.wrap = this.wrap.bind(this)
    this.select = this.select.bind(this)
    this.root = this.wrap(model.getRoot())
    this.right = this.right.bind(this)
    this.__recompute()
  }

  __recompute() {
    this.list = []
    scan(this.root, this.list)
    this.__emitChange()
  }

  wrap(node, parent) {
    return new NodeWrapper(node, parent, this.model)
  }

  getRoot() {
    return this.root
  }

  toggle(node) {
    if (node.open)
      this.close(node)
    else
      this.open(node)
  }

  open(node) {
    node.open = true
    node.children = this.model.getChildren(node.data).map(d => this.wrap(d, node, this.model))
    this.__recompute()
  }

  close(node) {
    node.open = false
    this.__recompute()
  }

  select(node) {
    if (this.selected)
      this.selected.selected = false
    this.selected = node
    node.selected = true
    this.__emitChange()
  }

  right() {
    if (this.selected) {
      if (!this.selected.isLeaf && !this.selected.open)
        this.open(this.selected)
      else {
        this.down()
      }
    } else this.select(this.root)
  }

  left() {
    if (this.selected) {
      if (this.selected.open)
        this.close(this.selected)
      else if (this.selected.parent) {
        this.select(this.selected.parent)
      }
    } else this.select(this.root)
  }

  down() {
    if (this.selected) {
      if (this.list.length > this.selected.index + 1) {
        this.selected.selected = false
        this.selected = this.list[this.selected.index + 1]
        this.selected.selected = true
        this.__emitChange()
      }
    } else {
      this.select(this.root)
    }
  }

  up() {
    if (this.selected) {
      if (this.selected.index > 0) {
        this.selected.selected = false
        this.selected = this.list[this.selected.index - 1]
        this.selected.selected = true
        this.__emitChange()
      }
    } else {
      this.select(this.root)
    }
  }
}
