import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import shallowEqual from 'shallowequal';
import { st, classes } from './Ellipsis.st.css';
import Tooltip from '../../Tooltip';
import { ZIndex } from '../../ZIndex';
import { TooltipCommonProps } from '../PropTypes/TooltipCommon';

class Ellipsis extends React.PureComponent {
  static propTypes = {
    /** When true, text that is longer than it's container will be truncated to a single line followed by ellipsis. Otherwise the text will break into several lines. */
    ellipsis: PropTypes.bool,

    /** True by default, set it to false in order to show ellipsis without a tooltip. */
    showTooltip: PropTypes.bool,

    /** A stylable object containing className and data attributes to be injected to the Ellipsis wrapper. */
    wrapperClasses: PropTypes.object,

    /** The render function, use it to render a text you want to truncate with ellipsis. */
    render: PropTypes.func,

    // Tooltip props
    ...TooltipCommonProps,
  };

  static defaultProps = {
    ellipsis: false,
    appendTo: 'window',
    flip: false,
    fixed: false,
    placement: 'top',
    zIndex: ZIndex('Tooltip'),
    enterDelay: 0,
    exitDelay: 0,
    showTooltip: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.ref = React.createRef();
  }

  /**
   * An ellipsis is considered active when either the text's scroll width is wider than it's container or itself.
   * @private
   */
  _updateEllipsisState = () => {
    const { ellipsis } = this.props;
    const { isActive } = this.state;
    const { current: textElement } = this.ref;
    const shouldBeActive =
      ellipsis &&
      textElement &&
      (textElement.parentNode.offsetWidth < textElement.scrollWidth ||
        textElement.offsetWidth < textElement.scrollWidth);

    if (shouldBeActive !== isActive)
      this.setState({ isActive: shouldBeActive });
  };

  /**
   * A callback for resizing the window must be debounced in order to improve performance.
   * @private
   */
  _debouncedUpdate = debounce(this._updateEllipsisState, 100);

  componentDidMount() {
    window.addEventListener('resize', this._debouncedUpdate);
    this._updateEllipsisState();
  }

  _renderText = () => {
    const { ellipsis, render } = this.props;

    return render({
      ref: this.ref,
      ellipsisClasses: (...classNames) =>
        [ellipsis && classes.text, ...classNames].filter(Boolean).join(' '),
    });
  };

  render() {
    const {
      appendTo,
      wrapperClasses,
      disabled,
      enterDelay,
      exitDelay,
      fixed,
      flip,
      maxWidth,
      moveArrowTo,
      onHide,
      onShow,
      placement,
      showTooltip,
      textAlign,
      zIndex,
    } = this.props;
    const { isActive } = this.state;
    const { current: textElement } = this.ref;

    return showTooltip && isActive ? (
      <Tooltip
        className={st(classes.tooltip, {}, wrapperClasses)}
        disabled={!isActive || !textElement}
        content={textElement && textElement.textContent}
        {...{
          appendTo,
          disabled: disabled || !showTooltip,
          enterDelay,
          exitDelay,
          fixed,
          flip,
          maxWidth,
          moveArrowTo,
          onHide,
          onShow,
          placement,
          textAlign,
          zIndex,
        }}
      >
        {this._renderText()}
      </Tooltip>
    ) : (
      this._renderText()
    );
  }

  componentDidUpdate(prevProps) {
    if (!shallowEqual(prevProps, this.props)) {
      this._updateEllipsisState();
    }
  }

  componentWillUnmount() {
    this._debouncedUpdate.cancel();
    window.removeEventListener('resize', this._debouncedUpdate);
  }
}

export default Ellipsis;
