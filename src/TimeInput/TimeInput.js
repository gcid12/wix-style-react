import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import classNames from 'classnames';
import moment from 'moment';
import Text from '../Text';
import Input from '../Input';
import Box from '../Box';

import styles from './TimeInput.scss';
import { dataHooks } from './constants';

/**
 * An uncontrolled time input component with a stepper and am/pm support
 */
export default class TimeInput extends Component {
  static displayName = 'TimeInput';

  static propTypes = {
    /** Should time be shown as "--:--" when disabled */
    dashesWhenDisabled: PropTypes.bool,
    dataHook: PropTypes.string,

    /** The control's starting time */
    defaultValue: PropTypes.object,

    /** 24h mode  */
    disableAmPm: PropTypes.bool,

    /** Is disabled  */
    disabled: PropTypes.bool,

    /** Called upon blur */
    onChange: PropTypes.func,

    /** Display in RTL  */
    rtl: PropTypes.bool,

    style: PropTypes.object,

    /** The input width behavior, as 'auto' it will shrink, at '100%' it will grow */
    width: PropTypes.oneOf(['auto', '100%']),

    /** Number of minutes to be changed on arrow click */
    minutesStep: PropTypes.number,

    /** Custom suffix, located before ticker */
    customSuffix: PropTypes.node,
  };

  static defaultProps = {
    defaultValue: moment(),
    onChange: () => {},
    style: {},
    disableAmPm: false,
    disabled: false,
    dashesWhenDisabled: false,
    minutesStep: 20,
    width: 'auto',
  };

  constructor(props) {
    super(props);

    this.state = {
      focus: false,
      lastCaretIdx: 0,
      hover: false,
      ...this._getInitTime(this.props.defaultValue),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState(this._getInitTime(nextProps.defaultValue));
    }
  }

  _isAmPmMode() {
    return (
      !this.props.disableAmPm &&
      moment('2016-04-03 13:14:00')
        .format('LT')
        .indexOf('PM') !== -1
    );
  }

  _getInitTime(value) {
    let time = value || moment(),
      am = time.hours() < 12;

    const ampmMode = this._isAmPmMode();

    ({ time, am } = this._normalizeTime(am, time, ampmMode));
    const text = this._formatTime(time, ampmMode);

    return { time, am, text, ampmMode };
  }

  _momentizeState(timeSet) {
    let time, am;
    const { ampmMode } = this.state;

    if (timeSet) {
      ({ time, am } = timeSet);
    } else {
      ({ time, am } = this.state);
    }

    let hours = time.hours();

    if (ampmMode && !am && hours < 12) {
      hours += 12;
    }

    if (ampmMode && am && hours === 12) {
      hours = 0;
    }

    const momentized = moment();
    momentized.hours(hours);
    momentized.minutes(time.minutes());
    momentized.seconds(0);
    return momentized;
  }

  _bubbleOnChange(timeSet) {
    const time = this._momentizeState(timeSet);
    this.props.onChange(time);
  }

  _timeStep(direction) {
    const time = this._momentizeState();
    const timeUnit = this.state.lastFocusedTimeUnit || 'minutes';
    const amount = timeUnit === 'hours' ? 1 : this.props.minutesStep;
    time.add(direction * amount, timeUnit);
    const am = time.hours() < 12;
    this._updateDate({ am, time });
  }

  _formatTime(time, ampmMode = this.state.ampmMode) {
    return ampmMode ? time.format('hh:mm') : time.format('HH:mm');
  }

  _getFocusedTimeUnit(caretIdx, currentValue) {
    let colonIdx = currentValue.indexOf(':');
    colonIdx = Math.max(0, colonIdx);
    return caretIdx <= colonIdx ? 'hours' : 'minutes';
  }

  _normalizeTime(am, time, ampmMode = this.state.ampmMode) {
    const hours = time.hours();

    if (ampmMode) {
      if (hours === 0) {
        return { time: time.clone().hours(12), am: true };
      }

      if (hours > 12) {
        return { time: time.clone().hours(hours - 12), am: false };
      }
    }

    return { time: time.clone().hours(hours), am };
  }

  _updateDate({ time, am }) {
    am = isUndefined(am) ? this.state.am : am;
    let newTime = moment(time, 'HH:mm');
    newTime = newTime.isValid() ? newTime : this.state.time;
    const normalizedTime = this._normalizeTime(am, newTime);
    ({ time, am } = normalizedTime);
    const text = this._formatTime(time);
    this.setState({ time, am, text });
    this._bubbleOnChange({ time, am });
  }

  _handleAmPmClick = () =>
    !this.props.disabled && this._updateDate({ am: !this.state.am });

  _handleFocus = input => this.setState({ focus: true, lastFocus: input });

  _handleBlur = () => {
    this.setState({ focus: false });
    this._updateDate({ time: this.state.text });
  };

  _handleInputChange = e => {
    // that is why cursor is jumping
    // https://github.com/facebook/react/issues/955#issuecomment-327069204
    const isDisabled = this.props.disabled && this.props.dashesWhenDisabled;
    const isInvalid = /[^0-9 :]/.test(e.target.value);
    if (isDisabled || isInvalid) {
      e.preventDefault();
      return;
    }
    return this.setState({
      text: e.target.value,
    });
  };

  _handleHover = hover => this.setState({ hover });

  _handleMinus = () => this._timeStep(-1);

  _handlePlus = () => this._timeStep(1);

  _handleInputBlur = ({ target }) => {
    if (this.props.disabled && this.props.dashesWhenDisabled) {
      return;
    }

    const caretIdx = target.selectionEnd || 0;
    let lastFocusedTimeUnit;

    if (caretIdx >= 0) {
      lastFocusedTimeUnit = this._getFocusedTimeUnit(caretIdx, target.value);
    }

    this.setState({ lastCaretIdx: caretIdx, lastFocusedTimeUnit });
    this._updateDate({ time: target.value });
  };

  _renderTimeTextbox() {
    const {
      customSuffix,
      disabled,
      dashesWhenDisabled,
      width,
      rtl,
    } = this.props;
    const text = disabled && dashesWhenDisabled ? '-- : --' : this.state.text;

    const suffix = (
      <Input.Group>
        <Box alignItems="center" justifyContent="space-between">
          <Box verticalAlign="middle" flexGrow={0} marginRight="6px">
            {this.state.ampmMode && (
              <Text
                weight="normal"
                skin={disabled ? 'disabled' : 'standard'}
                className={styles.ampm}
                onClick={this._handleAmPmClick}
                dataHook={dataHooks.amPmIndicator}
              >
                {this.state.am ? 'am' : 'pm'}
              </Text>
            )}
          </Box>
          <Box
            align="right"
            verticalAlign="middle"
            className={styles.suffixEndWrapper}
          >
            {customSuffix && (
              <Box marginRight="6px" width="max-content">
                {typeof customSuffix === 'string' ? (
                  <Text
                    weight="normal"
                    light
                    secondary
                    dataHook={dataHooks.customSuffix}
                  >
                    {customSuffix}
                  </Text>
                ) : (
                  <span data-hook={dataHooks.customSuffix}>{customSuffix}</span>
                )}
              </Box>
            )}
            <Input.Ticker
              upDisabled={disabled}
              downDisabled={disabled}
              onUp={this._handlePlus}
              onDown={this._handleMinus}
              dataHook={dataHooks.ticker}
            />
          </Box>
        </Box>
      </Input.Group>
    );

    return (
      <Input
        ref="input"
        rtl={rtl}
        value={text}
        className={classNames({
          [styles.input]: width === 'auto',
        })}
        onFocus={this._handleFocus}
        onChange={this._handleInputChange}
        onBlur={this._handleInputBlur}
        suffix={suffix}
        dataHook={dataHooks.input}
        disabled={disabled}
      />
    );
  }

  render() {
    const { className, style, dataHook, rtl, disabled, width } = this.props;
    const { focus, hover } = this.state;

    return (
      <div
        className={classNames(styles.wrapper, className, {
          [styles.disabled]: disabled,
        })}
        style={style}
        data-hook={dataHook}
      >
        <div
          onMouseOver={() => this._handleHover(true)}
          onMouseOut={() => this._handleHover(false)}
          className={classNames(styles.time, {
            focus,
            hover: hover && !focus,
            rtl,
            [styles.stretch]: width === '100%',
          })}
        >
          {this._renderTimeTextbox()}
        </div>
      </div>
    );
  }
}
