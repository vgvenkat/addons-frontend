import React, { PropTypes } from 'react';

import { Link } from 'react-router'


export default class CategoryLink extends React.Component {
  static propTypes = {
    addonType: PropTypes.string,
    application: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }

  static defaultProps = {
    addonType: 'extension',
  }

  render() {
    const { addonType, application, lang, name, slug } = this.props;

    return (
      <Link className="CategoryLink-link" ref={(ref) => { this.link = ref; }}
        to={`/${lang}/${application}/search/?app=${application}&category=${slug}&type=${addonType}`}>
        {name}
      </Link>
    );
  }
}
