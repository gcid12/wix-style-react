import React from 'react';
import PropTypes from 'prop-types';
import { st, classes } from './Content.st.css';

class Content extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(['medium', 'large']),
  };

  _getChildName = children =>
    children.type && (children.type.displayName || children.type.name);

  render() {
    const { children, size } = this.props;
    const isEmptyStateContent = this._getChildName(children) === 'EmptyState';

    return (
      <div
        className={st(classes.root, {
          size,
          emptyStateContent: isEmptyStateContent,
        })}
      >
        {children}
      </div>
    );
  }
}

export default Content;
