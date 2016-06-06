import chai, {
    expect
} from 'chai';

import TreeState from '../src/TreeState'
import DefaultModel from '../src/DefaultModel'
import Explorer from '../src/Explorer.jsx'
import React, {Component} from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import asserter from './assertions/Asserter';

describe("React Explorer", function() {

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

    describe("TreeState", function() {
        it("should detect new nodes when refresh() is called", function() {
            expect(state.list).to.have.length(2)
            data.children.push({
                label: "C"
            })
            state.refresh()
            expect(state.list).to.have.length(3)
        })
    })

    describe("Explorer", function() {

      var explorer = (<Explorer state={state}/>)

        it("should display new nodes when refresh is called", function() {
          var el = render(explorer, true)

        })
    })
})
