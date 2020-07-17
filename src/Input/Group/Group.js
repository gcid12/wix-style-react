import React from 'react';
import PropTypes from 'prop-types';
import InputConsumer from '../InputConsumer';
import Box from '../../Box';

const Group = ({ children }) => (
  <InputConsumer consumerCompName={Group.displayName}>
    {() => <Box alignItems="center">{children}</Box>}
  </InputConsumer>
);

Group.displayName = 'Input.Group';
Group.propTypes = {
  children: PropTypes.node,
};

export default Group;
