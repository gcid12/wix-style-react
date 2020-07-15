import React from 'react';
import classNames from 'classnames';
import styles from './FontUpgrade.scss';
import PropTypes from 'prop-types';
import { FontUpgradeContext } from './context';

class FontUpgrade extends React.PureComponent {
  render() {
    const { dataHook, className, active, as, children } = this.props;

    return (
      <FontUpgradeContext.Provider value={{ active, styles }}>
        {React.createElement(
          as,
          {
            'data-hook': dataHook,
            className: classNames(active ? styles.root : null, className),
          },
          children,
        )}
      </FontUpgradeContext.Provider>
    );
  }
}

FontUpgrade.defaultProps = {
  active: true,
  as: 'span',
};

FontUpgrade.propTypes = {
  /** Applied as data-hook HTML attribute that can be used to create driver in testing */
  dataHook: PropTypes.string,

  /** A css class to be applied to the component's root element */
  className: PropTypes.string,

  /** Sets the Madefor font upgrade active when true (which is by default) */
  active: PropTypes.bool,

  as: PropTypes.oneOf(['span', 'div']),

  /** A renderable node */
  children: PropTypes.node,
};

export default FontUpgrade;
