import { st, classes } from './Content.st.css';
import React, { useState, useCallback } from 'react';
import Divider from '../../../Divider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollableContainer, {
  positionY,
} from '../../../common/ScrollableContainer';
import { dataHooks } from '../../constants';
import { useBaseModalLayoutContext } from '../../BaseModalLayoutContext';

export const Content = ({
  dataHook,
  className,
  children,
  contentHideDividers,
  onContentScrollPositionChanged,
}) => {
  const { contentClassName, content = children } = useBaseModalLayoutContext();
  const [scrollPositionY, setScrollPositionY] = useState(positionY.NONE);

  const handleScrollPositionChanged = useCallback(
    ({ position, target }) => {
      if (scrollPositionY !== position.y) {
        if (!contentHideDividers) {
          setScrollPositionY(position.y);
        }
        if (onContentScrollPositionChanged) {
          onContentScrollPositionChanged({ position, target });
        }
      }
    },
    [contentHideDividers, onContentScrollPositionChanged, scrollPositionY],
  );

  const isTopDividerHidden = useCallback(
    () =>
      contentHideDividers ||
      scrollPositionY === positionY.TOP ||
      scrollPositionY === positionY.NONE,
    [contentHideDividers, scrollPositionY],
  );

  const isBottomDividerHidden = useCallback(
    () =>
      contentHideDividers ||
      scrollPositionY === positionY.BOTTOM ||
      scrollPositionY === positionY.NONE,
    [contentHideDividers, scrollPositionY],
  );

  className = classNames(contentClassName, className);
  const registerToScrollPositionChanges =
    !contentHideDividers || !!onContentScrollPositionChanged;

  return (
    (content && (
      <div
        data-hook={dataHook}
        data-hidedividers={contentHideDividers}
        className={st(
          classes.root,
          {
            hideTopDivider: isTopDividerHidden(),
            hideBottomDivider: isBottomDividerHidden(),
          },
          className,
        )}
      >
        {!contentHideDividers && <Divider className={classes.topDivider} />}
        <ScrollableContainer
          dataHook={dataHooks.contentWrapper}
          className={classes.innerContent}
          onScrollPositionChanged={
            (registerToScrollPositionChanges && handleScrollPositionChanged) ||
            null
          }
        >
          {content}
        </ScrollableContainer>
        {!contentHideDividers && <Divider className={classes.bottomDivider} />}
      </div>
    )) ||
    null
  );
};

Content.displayName = 'BaseModalLayout.Content';

Content.propTypes = {
  /** additional css classes */
  className: PropTypes.string,
  /** data hook for testing */
  dataHook: PropTypes.string,
  /** the content you want to render in the modal, children passed directly will be treated as `content` as well */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** hides the content scrolling dividers  */
  contentHideDividers: PropTypes.bool,
  /** A Handler for changes in the content scroll position
   * ##### Signature:
   * function({position: {y: positionY}, target: HTMLElement}) => void
   * * `positionY`: top | middle | bottom | none
   */
  onContentScrollPositionChanged: PropTypes.func,
};

Content.defaultProps = {
  contentHideDividers: false,
};
