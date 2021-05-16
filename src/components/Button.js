import React from 'react';

const Button = ({ type, klass, onClick, text, id }) => {
  return (
    <button type={type} className={klass} id={id} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
