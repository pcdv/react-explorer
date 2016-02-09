import React, {Component} from 'react';
import Node from './Node'
import SelectionProvider from './SelectionProvider'

/**
 * A high-level tree-view component that renders the contents of a TreeModel.
 * It may be controlled with keyboard. It is designed to be easily styled.
 * It supports multiple selection of tree items as well as context menus.
 * It supports lazy-loading of nodes. It supports inline edition of node label.
 */
export default class Explorer extends Component {
  constructor(props) {
    super(props)
    this.onSelection = this.onSelection.bind(this)
    this.state = { selection: props.selection || new SelectionProvider }
  }

  componentDidMount() {
    this.state.selection.addChangeListener(this.onSelection)
  }

  componentWillUnmount() {
    this.state.selection.removeChangeListener(this.onSelection)
  }

  onSelection() {
    this.forceUpdate()
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Node node={this.props.model.getRoot()} model={this.props.model} selection={this.state.selection}/>
      </div>
    );
  }
}

Explorer.propTypes = {
  model: React.PropTypes.object
}
