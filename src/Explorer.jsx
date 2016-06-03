import React, {Component} from 'react';
import Node from './Node'
import TreeState from './TreeState'
import DefaultModel from './DefaultModel'
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
    this.init(props)
  }

  componentWillReceiveProps(props) {
    this.init(props)
  }

  init(props) {
    var model = props.model
    var state = props.state

    if (!state) {
      if (!model) {
        if (!props.data)
          throw "Either data, model or state must be present in props"
        model = new DefaultModel(props.data)
      }

      state = new TreeState(model, {
        showRoot: !!props.showRoot,
        openNodes: !!props.openNodes
      })
    }
    this.state = {
      tree: state
    }
  }

  componentDidMount() {
    this.props.tree.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    this.props.tree.removeChangeListener(this.onChange)
  }

  onChange(event) {
    this.forceUpdate()
    if (event == 'SELECTION' && this.props.onSelect)
      this.props.onSelect(this.props.tree.selected)
  }

  onKeyDown(e) {
    var tree = this.props.tree
    if (tree.isEditing())
      return
    if (e.keyCode == DOWN) {
      tree.down()
    } else if (e.keyCode == RIGHT) {
      tree.right()
    } else if (e.keyCode == LEFT) {
      tree.left()
    } else if (e.keyCode == UP) {
      tree.up()
    } else if (e.keyCode == F2) {
      tree.edit()
    }
  }

  render() {
    var tree = this.props.tree
    return (
      <div
        className="explorer"
        style={{
        position: 'relative'
      }}
        tabIndex={1}
        onKeyDown={this.onKeyDown}>
        <Node node={tree.getRoot()} tree={tree}/>
      </div>
    );
  }
}
Explorer.propTypes = {
  data: React.PropTypes.object,
  model: React.PropTypes.object,
  state: React.PropTypes.instanceOf(TreeState),
  onSelect: React.PropTypes.func,
  showRoot: React.PropTypes.bool,
  openNodes: React.PropTypes.bool
}
