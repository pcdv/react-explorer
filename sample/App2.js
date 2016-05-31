import React, {Component} from 'react';
import Explorer from './Explorer'

class Model {
  getRoot() {
    return document.getElementById('root').parentElement
  }

  getLabel(node) {
    return node.toString()
  }

  isLeaf(node) {
    return !node.children
  }

  getChildren(node) {
    var res = []
    var children = node.childNodes
    for (var i = 0; i < children.length; i++) {
      res.push(children[i])
    }
    return res
  }
}

export default class App extends Component {
  render() {
    return (<Explorer model={new Model()}/>);
  }
}
