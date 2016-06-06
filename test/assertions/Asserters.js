import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import spies from 'chai-spies';
const expect = chai.expect;
import ReactTestUtils from 'react-addons-test-utils';
import Explorer from '../../src/Explorer.jsx'
import Node from '../../src/Node.jsx'

chai.use(spies);

/**
 * getBoundingClientRect() does not work correctly with ReactTestUtils.renderIntoDocument().
 * So for testing resizing we need  ReactDOM.render()
 */
const render = (jsx, renderToDOM) => {
    if (renderToDOM) {
        const testDiv = document.createElement('div');
        document.body.appendChild(testDiv);
        return ReactDOM.render(jsx, testDiv);
    } else {
        return ReactTestUtils.renderIntoDocument(jsx);
    }
};

export default (jsx, renderToDom = false) => {
    const exp = render(jsx, renderToDom);
    const component = ReactTestUtils.findRenderedComponentWithType(exp, Explorer);

    const findNodes = () => {
        return ReactTestUtils.scryRenderedComponentsWithType(exp, Node)
    }

    return {
        assertNodeCount(count) {
            expect(findNodes()).to.have.length(count);
            return this;
        },
    }
}
