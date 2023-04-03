import React from 'react';

const Spinner = ({ size = '10px', color = 'blue' }) => {
  const spinnerSize = `h-[${size}] w-[${size}]`;
  const spinnerColor = `text-${color}-500`;
  const spinnerClasses = `animate-spin rounded-full border-b-2 border-${color}-500`;
 debugger
  return (
    <div className={`${spinnerSize} ${spinnerColor} ${spinnerClasses}`}></div>
  );
};

export default Spinner;
