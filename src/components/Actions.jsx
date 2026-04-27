import React from "react";

function Actions({ handleCancel, handleSave }) {
  return (
    <div className="actions">
      <button className="btn" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default Actions;