import React from 'react';

const Button = ({ type, onClick, className = '', children }) => {
  return (
    <button onClick={onClick} className={`${className} button`} type={type}>
      {children}
    </button>
  );
};

export default Button;
