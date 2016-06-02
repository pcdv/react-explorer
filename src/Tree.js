import AbstractStore from './AbstractStore'

/**
 * Wraps a node (data given by the user) so we can attach more info like
 * parent, open/closed state etc.
 */
class NodeWrapper {
  constructor(data, parent, model) {
    this.data = data
    this.parent = parent
    this.label = model.getLabel(data)
    this.isLeaf = model.isLeaf(data)
    this.key = model.getKey(data)
    this.open = false
    this.selected = false
  }
}

/**
 * Recursively builds the list of nodes that we need to display according
 * to their 'open' state (we need to scan only open nodes).
 */
function scan(node, list, showRoot) {
  var index = list.length
  node.index = index
  if (showRoot || list.length > 0)
    list.push(node)
  if (node.open || list.length == 0) {
    node.children.forEach(n => scan(n, list))
  }
}

/**
 * Holds the state of the Explorer component.
 */
export default class Tree extends AbstractStore {
  constructor(model, opt) {
    super()
    this.opt = opt
    this.model = model
    this.wrap = this.wrap.bind(this)
    this.select = this.select.bind(this)
    this.root = this.wrap(model.getRoot())
    this.right = this.right.bind(this)
    this.__recompute('INIT')
  }

  __recompute(event) {
    this.list = []
    scan(this.root, this.list, this.opt.showRoot)
    if (!this.selected) {
      this.list[0].selected = true
      this.selected = this.list[0]
    }
    this.__emitChange(event)
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
    this.__recompute('OPEN')
  }

  close(node) {
    node.open = false
    this.__recompute('CLOSE')
  }

  select(node) {
    if (this.selected)
      this.selected.selected = false
    this.selected = node
    node.selected = true
    this.__emitChange('SELECTION')
  }

  edit() {
    if (this.selected && !this.selected.editing) {
      this.selected.editing = true
      this.__emitChange('EDIT_START')
    }
  }

  isEditing() {
    return this.selected && this.selected.editing
  }

  cancelEdition() {
    this.selected.editing = false;
    this.__emitChange('EDIT_CANCEL')
  }

  applyEdition(newLabel) {
    this.selected.editing = false;
    this.selected.label = newLabel
    this.__emitChange('EDIT_APPLY')
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
        this.__emitChange('SELECTION')
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
        this.__emitChange('SELECTION')
      }
    } else {
      this.select(this.root)
    }
  }
}
