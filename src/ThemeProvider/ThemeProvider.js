import React from 'react';
import PropTypes from 'prop-types';
import calc_color_vars from '../Foundation/stylable/mixins/calc_color_vars';

/** ThemeProvider */
class ThemeProvider extends React.PureComponent {
  _parseTheme(theme) {
    const style = {};

    // Color
    if (!!theme.color) {
      const colorRegEx = new RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/i);
      if (colorRegEx.test(theme.color)) {
        Object.assign(style, calc_color_vars(theme.color));
      } else {
        throw new Error('color must be a 3 or 6 hex digits string only');
      }
    }

    return style;
  }

  render() {
    const { dataHook, theme = {}, children } = this.props;

    return (
      <div style={this._parseTheme(theme)} data-hook={dataHook}>
        {children}
      </div>
    );
  }
}

ThemeProvider.displayName = 'ThemeProvider';

ThemeProvider.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /**
   *  - color: a 3 or 6 digits hex
   */
  theme: PropTypes.shape({
    color: PropTypes.string,
  }),
};

ThemeProvider.defaultProps = {};

export default ThemeProvider;
