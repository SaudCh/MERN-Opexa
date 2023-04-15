import React from "react";

import "./spinner.css";

//loading sipnner
const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className="text-center">
        <br />
        <br />
        <div className="lds-dual-ring"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
