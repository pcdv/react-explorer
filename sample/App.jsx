import React, {Component} from 'react';
import Explorer from '../src/Explorer.jsx'
import DefaultModel from '../src/DefaultModel'

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

    return (<Explorer model={new DefaultModel(tree)}/>);
  }
}
