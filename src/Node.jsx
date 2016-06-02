import React, {Component} from 'react';
import classNames from 'classnames'
import Label from './Label'

export default class Node extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.select = this.select.bind(this)
  }

  /**
   * Open or close the node.
   */
  toggle() {
    this.props.tree.toggle(this.props.node)
  }

  select() {
    this.props.tree.select(this.props.node)
  }

  render() {
    var node = this.props.node

    var cls = classNames('rxp-node', {
      'rxp-leaf': node.isLeaf,
      isDir: !node.isLeaf,
      open: node.open,
      closed: !node.open,
      selected: node.selected,
      editing: node.editing
    })

    var children
    if (node.open && node.children) {
      children = (
        <div className="children">
          {node.children.map(n => <Node tree={this.props.tree} node={n} key={n.key}/>)}
        </div>
      )
    }
    return (
      <div className={cls}>
        {node.editing
          ? null
          : <div className="overlay" onClick={this.select}/>}
        <div className="handle" onClick={this.toggle}/>
        <Label node={node} tree={this.props.tree}/> {children}
      </div>
    );
  }
}

Node.propTypes = {
  node: React.PropTypes.object,
  tree: React.PropTypes.object
}
