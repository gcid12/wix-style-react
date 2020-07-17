import React from 'react';
import Input from './Input';
import classes from './Input.st.css';
import DATA_ATTR from './DataAttr';

class ThemedInput extends Input {
  // For testing purposes only
  getDataAttr = () => {
    const {
      size,
      status,
      prefix,
      disabled,
      forceHover,
      forceFocus,
      noLeftBorderRadius,
      noRightBorderRadius,
    } = this.props;

    return Object.fromEntries(
      Object.entries({
        [DATA_ATTR.SIZE]: size,
        [DATA_ATTR.STATUS]: status,
        [DATA_ATTR.PREFIX]: !!prefix,
        [DATA_ATTR.DISABLED]: !!disabled,
        [DATA_ATTR.HOVER]: !!forceHover,
        [DATA_ATTR.FOCUS]: !!(forceFocus || this.state.focus),
        [DATA_ATTR.LEFTBORDERRADIUS]: !!noLeftBorderRadius,
        [DATA_ATTR.RIGHTBORDERRADIUS]: !!noRightBorderRadius,
      }).filter(entry => !!entry[1]),
    );
  };

  render() {
    const {
      size,
      dataHook,
      rtl,
      status,
      disabled,
      forceHover,
      forceFocus,
      roundInput,
      className,
      noLeftBorderRadius,
      noRightBorderRadius,
      readOnly,
    } = this.props;

    const placeholder = this.props.placeholder;
    return (
      <div
        {...classes(
          'root',
          {
            size,
            hasFocus: forceFocus || this.state.focus,
            status,
            forceHover,
            readOnly,
            disabled,
            roundInput,
            noRightBorderRadius,
            noLeftBorderRadius,
          },
          { className },
        )}
        dir={rtl ? 'rtl' : null}
        data-hook={dataHook}
        {...this.getDataAttr()}
      >
        {super.render({ placeholder })}
      </div>
    );
  }
}

ThemedInput.propTypes = {
  ...Input.propTypes,
};

export default ThemedInput;
