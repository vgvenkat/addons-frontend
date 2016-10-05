import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import CategoryLink from 'amo/components/CategoryLink';


describe('CategoryLink', () => {
  function renderCategoryLink({ ...props }) {
    return renderIntoDocument(<CategoryLink {...props} />);
  }

  it('renders a CategoryLink', () => {
    const root = renderCategoryLink({
      addonType: 'extension',
      lang: 'en-GB',
      name: 'Alerts & Notifications',
      slug: 'alerts-notifications',
    });

    const link = findRenderedDOMComponentWithClass(root, 'CategoryLink-link');
    assert.equal(link.textContent, 'Alerts & Notifications');
  });
});
