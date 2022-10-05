import React from 'react';
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      className="formButton"
      id="triggerButton"
      ref={buttonRef}
      onClick={showModal}
      hidden={true}
    >
      {triggerText}
    </button>
  );
};

export default Trigger;
