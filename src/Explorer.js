import React, { Component } from 'react';

/**
 * A high-level tree-view component that renders the contents of a TreeModel.
 * It may be controlled with keyboard. It is designed to be easily styled.
 * It supports multiple selection of tree items as well as context menus.
 * It supports lazy-loading of nodes.
 */
export default class Explorer extends Component {
  render() {
    return (
      <h1>Explorer2</h1>
    );
  }
}

Explorer.propTypes = {
  model: React.PropTypes.object
}
