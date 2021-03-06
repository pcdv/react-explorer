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
 * Finds child in wrapper children matching specified data (from root model).
 */
function findChild(wrapper, data) {
  for (var i in wrapper.children || []) {
    if (wrapper.children[i].data == data)
      return wrapper.children[i]
  }
  return null
}

function findNode(wrapper, children) {
  for (var i in children) {
    if (children[i] == wrapper.data)
      return children[i]
  }
  return null
}

/**
 * Holds the state of the Explorer component.
 */
export default class TreeState extends AbstractStore {
  constructor(model, opt = {}) {
    super()
    this.opt = opt
    this.model = model
    this.wrap = this.wrap.bind(this)
    this.select = this.select.bind(this)
    this.root = this.wrap(model.getRoot())
    this.right = this.right.bind(this)
    this.initializing = true
    if (!opt.showRoot) {
      this.__open0(this.root)
      this.root.hidden = true
    }
    this.__recompute('INIT')
    this.initializing = false
  }

  /**
   * Recursively builds the list of nodes that we need to display according
   * to their 'open' state (we need to scan only open nodes).
   */
  scan(node, list, showRoot) {

    if (showRoot || list.length > 0) {
      var index = list.length
      node.index = index
      list.push(node)
    }

    if (node.open) {
      // check whether children have changed in model vs tree-state
      var childrenData = this.model.getChildren(node.data) || []

      // TODO: to optimize perf, do this rescan only when refresh() is
      // called explicitly + maybe do it at a specific path in tree

      // check for deleted children
      for (var i = node.children.length - 1; i >= 0; i--) {
        var child = findNode(node.children[i], childrenData)
        if (!child)
          node.children.splice(i, 1)
      }

      // check for new children
      for (var i in childrenData) {
        var child = findChild(node, childrenData[i])
        if (!child) {
          child = this.wrap(childrenData[i], node)
          node.children.push(child)
        }
        this.scan(child, list, true)
      }
    }
  }


  /**
   * Must be called if the contents of tree are externally changed.
   */
  refresh() {
    this.__recompute('REFRESH')
  }

  __recompute(event) {
    this.list = []
    this.scan(this.root, this.list, this.opt.showRoot)
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
    this.__open0(node)
    this.__recompute('OPEN')
  }

  __open0(node) {
    node.open = true
    node.children = this.model.getChildren(node.data).map(d => this.wrap(d, node, this.model))
    if (this.initializing && this.opt.openNodes) {
      node.children.forEach(n => {
        if (!this.model.isLeaf(n.data)) {
          this.__open0(n)
        }
      })
    }
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
    } else
      this.select(this.list[0])
  }

  left() {
    if (this.selected) {
      if (this.selected.open)
        this.close(this.selected)
      else if (this.selected.parent && !this.selected.parent.hidden) {
        this.select(this.selected.parent)
      }
    } else
      this.select(this.list[0])
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
      this.select(this.list[0])
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
      this.select(this.list[0])
    }
  }
}
