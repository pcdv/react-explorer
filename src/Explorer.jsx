import React, {Component} from 'react';
import Node from './Node'
import Tree from './Tree'
import classNames from 'classnames'

var LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  F2 = 113

/**
 * A high-level tree-view component that renders the contents of a TreeModel.
 * It may be controlled with the keyboard. It is designed to be easily styled.
 * It supports lazy-loading of nodes. It supports inline edition of node labels.
 * TODO support multiple selection of tree items as well as context menus.
 */
export default class Explorer extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.tree = new Tree(this.props.model, {
      showRoot: !!props.showRoot,
      openNodes: !!props,openNodes,
    })
    this.state = {}
  }

  componentDidMount() {
    this.tree.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    this.tree.removeChangeListener(this.onChange)
  }

  onChange(event) {
    this.forceUpdate()
    if (event == 'SELECTION' && this.props.onSelect)
      this.props.onSelect(this.tree.selected)
  }

  onKeyDown(e) {
    if (this.tree.isEditing())
      return
    if (e.keyCode == DOWN) {
      this.tree.down()
    } else if (e.keyCode == RIGHT) {
      this.tree.right()
    } else if (e.keyCode == LEFT) {
      this.tree.left()
    } else if (e.keyCode == UP) {
      this.tree.up()
    } else if (e.keyCode == F2) {
      this.tree.edit()
    }
  }

  render() {
    var cls = classNames('explorer', {focused: this.state.focused})
    return (
      <div
        className={cls}
        style={{position: 'relative'}}
        tabIndex={1}
        onKeyDown={this.onKeyDown}>
        <Node node={this.tree.getRoot()} tree={this.tree}/>
      </div>
    );
  }
}
Explorer.propTypes = {
  model: React.PropTypes.object,
  onSelect: React.PropTypes.func,
  showRoot: React.PropTypes.bool,
  openNodes: React.PropTypes.bool,
}
