import React from "react";

const ClearCompletedButton = ({ onClick }: { onClick: () => void }) => (
  <button className="clear-completed" onClick={onClick}>
    Clear completed
  </button>
);

export default ClearCompletedButton;
