import React from 'react';
import RawText from './RawText';
import { st, classes } from './Caption.st.css';
import Ellipsis, { extractEllipsisProps } from '../common/Ellipsis';

const CaptionWithEllipsis = ({ className, caption, ...props }) => {
  const { ellipsisProps, componentProps } = extractEllipsisProps(props);

  return (
    <Ellipsis
      {...ellipsisProps}
      wrapperClassName={{ className: classes[caption] }}
      render={({ ref, ellipsisClasses }) => (
        <RawText
          {...componentProps}
          size="medium"
          weight="bold"
          ref={ref}
          className={st(classes.root, { caption }, ellipsisClasses(className))}
        />
      )}
    />
  );
};

CaptionWithEllipsis.displayName = 'Caption';

CaptionWithEllipsis.propTypes = {
  ...RawText.propTypes,
  ...Ellipsis.propTypes,
};

CaptionWithEllipsis.defaultProps = {
  ...RawText.defaultProps,
  ...Ellipsis.defaultProps,
};

export default CaptionWithEllipsis;
