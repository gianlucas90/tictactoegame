import './Button.css';
import React from 'react';

const Button = (props) => {
  const { text, onClick, value } = props;

  let className = 'button';
  if (props.class) className = className + ' ' + props.class;

  return (
    <button onClick={onClick} value={value} className={className}>
      {text}
    </button>
  );
};

export default Button;
