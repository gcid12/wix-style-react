import React from 'react';
import PropTypes from 'prop-types';
import styles from './Animate.st.css';
import { dataHooks, childSize, childWidthRange } from './constants';

// return true if in range, otherwise false
const inRange = (x, min, max) => (x - min) * (x - max) <= 0;

/** Animate Component */
class Animate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      classNames: '',
      animationFinished: false,
    };
    this.childRef = React.createRef();
  }

  _renderFirstChild = () => {
    const { children } = this.props;
    const childrenArray = React.Children.toArray(children);

    return childrenArray[0]
      ? React.cloneElement(childrenArray[0], {
          'data-hook': dataHooks.animateContent,
        })
      : null;
  };

  _getChildComponentSize = () => {
    const width = this.childRef.current.offsetWidth;
    const mediumWidthRange = childWidthRange.medium;

    return inRange(width, mediumWidthRange.from, mediumWidthRange.to)
      ? childSize.medium
      : childSize.small;
  };

  componentDidMount() {
    const { triggerAnimation } = this.props;
    return triggerAnimation ? this._startStopAnimation() : null;
  }

  componentDidUpdate(prevProps) {
    const { triggerAnimation, loop } = this.props;

    if (
      prevProps.triggerAnimation !== triggerAnimation ||
      prevProps.loop !== loop
    ) {
      this._startStopAnimation();
    }
  }

  _onAnimationStart = () => {
    const { onEnter } = this.props;
    this.setState(
      {
        animationFinished: false,
      },
      () => onEnter && onEnter(),
    );
  };

  _onAnimationEnd = () => {
    const { onExited } = this.props;
    this.setState(
      {
        animationFinished: true,
        classNames: '',
      },
      () => onExited && onExited(),
    );
  };

  _startStopAnimation = () => {
    const size = this._getChildComponentSize();
    const { classNames } = this.state;
    const { loop, delay } = this.props;

    this.setState({
      classNames: classNames
        ? ''
        : { ...styles('animation', { loop, delay, size }) },
    });
  };

  render() {
    const { classNames } = this.state;
    const { dataHook } = this.props;

    return (
      <div
        data-hook={dataHook}
        {...classNames}
        onAnimationStart={this._onAnimationStart}
        onAnimationEnd={this._onAnimationEnd}
      >
        <div className={styles.wrapper}>
          <div className={styles.observer} ref={this.childRef} />
          {this._renderFirstChild()}
        </div>
      </div>
    );
  }
}

Animate.displayName = 'Animate';

Animate.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** The component which we would like to animate. When given multiple components- only the first child node will be animated. */
  children: PropTypes.node,

  /** Triggers the animation transition */
  triggerAnimation: PropTypes.bool,

  /** A callback fired immediately after the transition enters.*/
  onEnter: PropTypes.func,

  /** A callback fired immediately after the transition finishes.*/
  onExited: PropTypes.func,

  /** when set to true, bounces repetitively until stopped by other event*/
  loop: PropTypes.bool,

  /** when set to true, bounces with a delay*/
  delay: PropTypes.bool,
};

Animate.defaultProps = {};

export default Animate;
