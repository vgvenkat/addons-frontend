import React, { PropTypes } from 'react';

import translate from 'core/i18n/translate';

import CategoryLink from './CategoryLink';

import './Categories.scss';


export const CATEGORIES = {
  firefox: {
    extension: [
      { name: 'Alerts & Updates', slug: 'alerts-updates' },
      { name: 'Appearance', slug: 'appearance' },
      { name: 'Bookmarks', slug: 'bookmarks' },
      { name: 'Download Management', slug: 'download-management' },
      { name: 'Feeds, News & Blogging', slug: 'feeds-news-blogging' },
      { name: 'Games & Entertainment', slug: 'games-entertainment' },
    ],
  },
};

export class CategoriesBase extends React.Component {
  static propTypes = {
    // i18n: PropTypes.object.isRequired,
    lang: PropTypes.string,
  }

  render() {
    const { lang } = this.props;
    const application = 'firefox';

    const categoriesHTML = (
      <ul className="Categories-list" ref={(ref) => { this.categories = ref; }}>
        {CATEGORIES.firefox.extension.map((category) => {
          return (
            <li className="Categories-listItem">
              <CategoryLink application={application} lang={lang}
                {...category} />
            </li>
          );
        })}
      </ul>
    );

    return (
      <div className="Categories">
        {categoriesHTML}
      </div>
    );
  }
}

export default translate({ withRef: true })(CategoriesBase);
