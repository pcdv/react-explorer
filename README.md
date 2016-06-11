# React Explorer

Tree component built with [React](http://facebook.github.io/react).

You can just feed it data:

```js
import Explorer from `react-explorer`

const data = {
  label: "root",
  children: [
    { label: "A",
      children: [
        { label: "1" },
        { label: "2" }
      ]
    }, 
    { label: "B",
      children: []
    }
  ]
}

[...]
<Explorer data={data}/>
```

Or if your data is not in standard format, you can provide a data model. As an example, take a look 
at the [DefaultModel](https://github.com/pcdv/react-explorer/blob/master/src/DefaultModel.js).

If you need to update the tree dynamically (update data, open or close nodes, change selection...) 
you must provide a TreeState, eg.

```js
import Explorer, {DefaultModel, TreeState} from 'react-explorer'

const data = ...
const model = new DefaultModel(data)
const state = new TreeState(model)

[...]
<Explorer state={state}/>
```

If data changes, call ```state.refresh()``` to update the view. To simulate user navigation, you can call
```state.up(), state.down(), state.left(), state.right()``` etc.
 
