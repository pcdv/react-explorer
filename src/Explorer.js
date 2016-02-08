import React, { Component } from 'react';
import Node from './Node'

/**
 * A high-level tree-view component that renders the contents of a TreeModel.
 * It may be controlled with keyboard. It is designed to be easily styled.
 * It supports multiple selection of tree items as well as context menus.
 * It supports lazy-loading of nodes. It supports inline edition of node label.
 */
export default class Explorer extends Component {
  render() {
    return (
      <Node node={this.props.model.getRoot()} model={this.props.model}/>
    );
  }
}

Explorer.propTypes = {
  model: React.PropTypes.object
}