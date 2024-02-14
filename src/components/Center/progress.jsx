import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ percentage, label }) => {
  const progressStyles = {
    width: `${percentage}%`,
  };

  return (
    <>
    <label>{label}</label>
    <div className="progress-bar">
      <div className="progress" style={progressStyles}></div>
    </div>
    </>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
