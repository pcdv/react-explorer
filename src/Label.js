import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

var ESCAPE_KEY = 27, ENTER_KEY = 13, F2 = 113

class Label extends React.Component {
  constructor(props) {
    super(props)
    this.onEdit = this.onEdit.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = { newLabel: props.node.label}
  }

  componentDidUpdate() {
    if (this.props.node.editing && !this.state.editStarted) {
      this.state.editStarted = true
      var input = ReactDOM.findDOMNode(this.refs.edit);
      input.focus()
      input.setSelectionRange(0, input.value.length)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({newLabel: nextProps.node.label, editStarted: false})
  }

  onEdit(e) {
    this.setState({newLabel: e.target.value})
  }

  onKeyDown(event) {
    if (event.which === ESCAPE_KEY || event.which == F2) {
      this.props.tree.cancelEdition()
    } else if (event.which === ENTER_KEY) {
      this.onSubmit()
    }
  }

  onSubmit() {
    this.props.tree.applyEdition(this.state.newLabel)
  }

  render () {
    var node = this.props.node
    if (node.editing)
      return (
        <input ref="edit" type="text" value={this.state.newLabel} onChange={this.onEdit} onBlur={this.onSubmit} onKeyDown={this.onKeyDown}/>
      )
    else
      return (
        <div className="label">{node.label}</div>
      )
  }
}

export default Label;
