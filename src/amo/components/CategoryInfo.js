import classNames from 'classnames';
import React, { PropTypes } from 'react';

// import translate from 'core/i18n/translate';
// import CategoryLink from './CategoryLink';
import { CATEGORIES } from './Categories';

import './CategoryInfo.scss';


export default class CategoryInfo extends React.Component {
  static propTypes = {
    addonType: PropTypes.string.isRequired,
    application: PropTypes.string.isRequired,
    i18n: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }

  static defaultProps = {
    addonType: 'extension',
    application: 'firefox',
  }

  render() {
    const { addonType, application, i18n, lang, slug } = this.props;

    let match;
    if (CATEGORIES[application] && CATEGORIES[application][addonType]) {
      match = CATEGORIES[application][addonType].filter((category) => {
        return category.slug == slug;
      });
    }

    if (!match || !match.length) {
      return null;
    }

    const category = match[0];

    return (
      <div className={classNames('CategoryInfo', category.slug)}>
        <h2 className="CategoryInfo-header"
          ref={(ref) => { this.header = ref; }}>
          {category.name}
        </h2>

        <p className="CategoryInfo-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique nibh eget mi vestibulum, vel pulvinar elit.
        </p>
      </div>
    );
  }
}

// export default translate({ withRef: true })(CategoryInfoBase);
