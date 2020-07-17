import React from 'react';
import PropTypes from 'prop-types';
import classes from './Affix.st.css';
import InputConsumer from '../InputConsumer';

const Affix = ({ children, value }) => (
  <InputConsumer consumerCompName={Affix.displayName}>
    {({ size, inPrefix, inSuffix, roundInput, disabled, onInputClicked }) => (
      <div
        {...classes('root', { size, inPrefix, inSuffix, roundInput, disabled })}
        onClick={onInputClicked}
        data-hook="custom-affix"
      >
        {value || children}
      </div>
    )}
  </InputConsumer>
);

Affix.displayName = 'Input.Affix';
Affix.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
};

export default Affix;
