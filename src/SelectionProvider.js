var _ = require('lodash')
import AbstractStore from './AbstractStore'

/**
 * Instantiated by components that provide a list of selected items. It fires
 events through the dispatcher when items are selected.
 */
class SelectionProvider extends AbstractStore {
  constructor() {
    super()
    this.selected = []
  }

  select(item, type, additive) {
    var obj = {
      id: item.id,
      item: item,
      type: type
    }

    if (!item) {
      this.selected = []
    }

    else if (additive) {
      if (!this.deselect(item, type))
        this.selected.push(obj)
    }

    else {
      this.selected = [obj]
    }
    this.__emitChange()
  }

  deselect(item, type) {
    for (var i in this.selected) {
      var obj = this.selected[i]
      if (obj.type === type && obj.item.id === item.id) {
        this.selected.splice(i, 1)
        this.__emitChange()
        return obj.item
      }
    }
  }

  selectNone() {
    this.selected = []
    this.__emitChange()
  }

  getSelected(type) {
    if (type)
      return _.filter(this.selected, (o) => o.type === type).map(o => o.item)
    else {
      return this.selected
    }
  }

  /**
   * Updates a selected item, or removes it from selection if null.
   *
   * @param i the selected item wrapper (as returned by getSelected())
   * @param item the item to replace in wrapper
   */
  updateItem(i, item) {
    if (item)
      i.item = item
    else
      this.deselect(i.item, i.type)
  }

  /**
   * If type is provided
   * Returns {id: ..., ...} or null.
   *
   * Otherwise
   * Returns {type: ..., item: {id: ..., ...}} or null.
   */
  getSelectedItem(type) {
    var sel = type ? this.getSelected(type) : this.selected
    if (sel && sel.length)
      return sel[0]

    return null
  }

  getSelectedCount() {
    return this.selected.length
  }

  isSelectedObject(object) {
    return _.filter(this.selected, i => i.item === object).length > 0
  }

  isSelected(type, id) {
    // WARN item.id can be != item.item.id
    // return _.filter(this.getSelected(type), i => i.id === id).length > 0
    return _.filter(this.selected, i => i.type === type && i.id === id).length > 0
  }

}

SelectionProvider.getSelection = function (dispatcher, providerId, callback) {
  dispatcher.dispatch({
    actionType: PsrvConstants.GET_SELECTION,
    providerId: providerId,
    callback: callback,
  })
}

module.exports = SelectionProvider
