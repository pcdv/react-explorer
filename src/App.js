import React, {Component} from 'react';
import Explorer from './Explorer'

class Model {
  constructor(tree) {
    this.tree = tree
  }

  getRoot() {
    return this.tree
  }

  getLabel(node) {
    return node.label
  }

  isLeaf(node) {
    return !node.children
  }

  getChildren(node) {
    return node.children
  }
}

export default class App extends Component {
  render() {
    var tree = {
      label: "Home",
      children: [
        {
          label: "Public",
          children: [
            {
              label: "hello.txt"
            }, {
              label: "world.txt",
              children: []
            }
          ]
        }, {
          label: "README"
        }
      ]
    }

    return (<Explorer model={new Model(tree)}/>);
  }
}
