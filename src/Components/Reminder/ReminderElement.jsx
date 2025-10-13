import React from "react";

const ReminderElement = ({ reminderInfo, onDelete }) => {
  return (
    <div className="reminder-card">
      <div>
        <span
          style={{ fontWeight: 500, fontSize: "1rem", letterSpacing: "0.5px" }}
        >
          {reminderInfo.name}
          {reminderInfo.isComplete ? <span>yes</span> : <span>no</span>}
        </span>
        <span
          // className={`${reminderInfo.isComplete}`}
          style={{ marginLeft: "16px", color: "#9987e5", fontSize: "0.95rem" }}
        >
          {reminderInfo.date}
        </span>
      </div>
      <button className="delete-button" title="Delete" onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
};

export default ReminderElement;
