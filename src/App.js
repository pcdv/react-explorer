import React, {Component} from 'react';
import Explorer from './Explorer'

class Model {
  isLeaf(node) {
    return !node.isDir
  }

  getChildren(node) {
    return node.children
  }
}

export default class App extends Component {
  render() {
    var tree = {
      label: "Home",
      isDir: true,
      children: [
        {
          label: "Public",
          isDir: true,
          children: [
            {
              label: "hello.txt",
              isDir: false
            }, {
              label: "world.txt",
              isDir: false
            }
          ]
        }, {
          label: "README",
          isDir: false
        }
      ]
    }

    return (
      <div className="left">
        <Explorer model={new Model(tree)}/>
      </div>
    );
  }
}
