import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, classes, callback }) => {
  return (
    <button className={classes} onClick={callback}> {text} </button>
  );
}

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.string,
  callback: PropTypes.func.isRequired 
}