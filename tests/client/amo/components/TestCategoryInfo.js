import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import CategoryInfo from 'amo/components/CategoryInfo';


describe('CategoryInfo', () => {
  function render({ ...props }) {
    return renderIntoDocument(<CategoryInfo {...props} />);
  }

  it('renders CategoryInfo', () => {
    const root = render({
      addonType: 'extension',
      application: 'firefox',
      slug: 'alerts-updates',
    });

    assert.equal(root.header.textContent, 'Alerts & Updates');
  });

  it('renders nothing with an invalid category', () => {
    const root = render({
      addonType: 'extension',
      application: 'firefox',
      slug: 'not-a-real-slug',
    });

    assert.equal(root.header, undefined);
  });

  it("renders nothing if it can't find the category", () => {
    const root = render({
      application: 'faker',
      slug: 'alerts-updates',
    });

    assert.equal(root.header, undefined);
  });
});
