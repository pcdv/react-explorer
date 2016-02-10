import React, {Component} from 'react';
import Node from './Node'
import Tree from './Tree'

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40

/**
 * A high-level tree-view component that renders the contents of a TreeModel.
 * It may be controlled with keyboard. It is designed to be easily styled.
 * It supports multiple selection of tree items as well as context menus.
 * It supports lazy-loading of nodes. It supports inline edition of node label.
 */
export default class Explorer extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.tree = new Tree(this.props.model)
  }

  componentDidMount() {
    this.tree.addChangeListener(this.onChange)
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    this.tree.removeChangeListener(this.onChange)
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onChange() {
    this.forceUpdate()
  }

  onKeyDown(e) {
    if (e.keyCode == DOWN) {
      this.tree.down()
    }
    else if (e.keyCode == RIGHT) {
      this.tree.right()
    }
    else if (e.keyCode == LEFT) {
      this.tree.left()
    }
    else if (e.keyCode == UP) {
      this.tree.up()
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Node node={this.tree.getRoot()} tree={this.tree}/>
      </div>
    );
  }
}

Explorer.propTypes = {
  model: React.PropTypes.object
}
