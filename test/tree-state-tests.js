import chai, {
    expect
} from 'chai';

import TreeState from '../src/TreeState'
import DefaultModel from '../src/DefaultModel'

describe("TreeState", function() {

    var data = {
        label: "root",
        children: [{
            label: "A",
            children: [{
                label: "1"
            }, {
                label: "2"
            }]
        }, {
            label: "B",
            children: []
        }]
    }

    var model = new DefaultModel(data)
    var state = new TreeState(model)

    it("should detect new nodes when refresh() is called", function() {
        expect(state.list).to.have.length(2)
        data.children.push({
            label: "C"
        })
        debugger
        state.refresh()
        expect(state.list).to.have.length(3)
    })
})
