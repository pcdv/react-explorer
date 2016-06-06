import React from "react"
import {render} from "react-dom"
import Explorer from "../lib/Explorer"
import DefaultModel from "../lib/DefaultModel"
import TreeState from "../lib/TreeState"

const data = {
  label: "root",
  children: [
    {
      label: "A",
      children: [
        {
          label: "1"
        }, {
          label: "2"
        }
      ]
    }, {
      label: "B",
      children: []
    }
  ]
}

if (document.getElementById("simple")) {
  render(
    <Explorer data={data} showRoot={true}/>, document.getElementById("simple"));
}

if (document.getElementById("dynamic")) {

  var model = new DefaultModel(data)
  var state = new TreeState(model, {showRoot: true})
  var counter = 0

  class Dynamic extends React.Component {
    render() {
      return (
        <div>
          <button
            onClick={() => {
            data.children.push({
              label: "C" + (++counter)
            });
            state.refresh()
          }}>Add node</button>
          <Explorer state={state}/>
        </div>
      )
    }
  }

  render(
    <Dynamic/>, document.getElementById("dynamic"));
}
