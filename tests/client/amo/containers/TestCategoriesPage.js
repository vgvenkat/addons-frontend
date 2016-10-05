import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import CategoriesPage from 'amo/containers/CategoriesPage';


describe('<CategoriesPage />', () => {
  function render(props) {
    return renderIntoDocument(<CategoriesPage {...props} />);
  }

  it('renders a categories page', () => {
    const root = render({ params:
      { application: 'firefox', lang: 'en-GB', }
    });

    assert.equal(root.container.className, 'Categories-Page');
  });
});
