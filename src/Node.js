import React, {Component} from 'react';
import classNames from 'classnames'

export default class Node extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.select = this.select.bind(this)
    this.state = {
      open: false, selected: false,
    }
  }

  /**
   * Open or close the node.
   */
  toggle() {
    if (!this.props.model.isLeaf(this.props.node)) {
      this.setState({
        open: !this.state.open
      })
    }
  }

  select() {
    this.setState({selected: !this.state.selected})
  }

  render() {
    var model = this.props.model
    var node = this.props.node

    var cls = classNames('node', {
      leaf: model.isLeaf(node),
      open: this.state.open,
      closed: !this.state.open,
      isDir: !model.isLeaf(node),
      selected: this.state.selected,
    })

    var children
    if (this.state.open) {
      children = (
        <div className="children">
          {model.getChildren(node).map(n => <Node model={model} node={n} key={model.getLabel(n)}/>)}
        </div>
      )
    }
    return (
      <div className={cls}>
        <div className="overlay" onClick={this.select}/>
        <div className="handle" onClick={this.toggle}/>
        <div className="label">{model.getLabel(node)}</div>
        {children}
      </div>
    );
  }
}

Node.propTypes = {
  node: React.PropTypes.object,
  model: React.PropTypes.object
}
