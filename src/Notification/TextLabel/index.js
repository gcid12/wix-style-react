import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Text';
import { dataHooks } from '../constants';
import { classes } from '../Notification.st.css';

const TextLabel = ({ children, ellipsis }) => (
  <div className={classes.label}>
    <Text ellipsis={ellipsis} light dataHook={dataHooks.notificationLabel}>
      {children}
    </Text>
  </div>
);

TextLabel.propTypes = {
  ellipsis: PropTypes.bool,
  children: PropTypes.node,
};

TextLabel.defaultProps = {
  ellipsis: true,
};

TextLabel.displayName = 'Notification.TextLabel';

export default TextLabel;
