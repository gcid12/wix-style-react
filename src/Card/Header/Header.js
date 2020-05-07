import React from 'react';
import PropTypes from 'prop-types';
import { classes } from './Header.st.css';
import Heading from '../../Heading';
import Text from '../../Text';
import { DataHooks } from './hooks';

const isString = a => typeof a === 'string';

class Header extends React.PureComponent {
  static displayName = 'Card.Header';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,

    /** required card title */
    title: PropTypes.node.isRequired,

    /** any string to be rendered below title */
    subtitle: PropTypes.node,

    suffix: PropTypes.node,
  };

  static defaultProps = {
    subtitle: null,
    suffix: null,
  };

  render() {
    const { dataHook, title, subtitle, suffix } = this.props;

    return (
      <div data-hook={dataHook}>
        <div className={classes.wrapper}>
          <div className={classes.titleWrapper}>
            {isString(title) ? (
              <Heading
                dataHook={DataHooks.title}
                appearance="H3"
                children={title}
              />
            ) : (
              <span data-hook={DataHooks.title}>{title}</span>
            )}

            {subtitle && isString(subtitle) ? (
              <Text
                dataHook={DataHooks.subtitle}
                children={subtitle}
                secondary
              />
            ) : (
              <span data-hook={DataHooks.subtitle}>{subtitle}</span>
            )}
          </div>

          {suffix && (
            <div
              data-hook={DataHooks.suffix}
              className={classes.suffix}
              children={suffix}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Header;
