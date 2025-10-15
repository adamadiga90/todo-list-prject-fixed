import React from "react";

const ReminderElement = ({ reminderInfo, onDelete }) => {
  return (
    <div
      className={`reminder-card rounded-[10px] w-full flex items-center min-h-[48px] justify-between shadow-[0 4px 16px rgba(84, 46, 248, 0.08)] px-[18px] py-[10px] ${
        reminderInfo.isComplete ? "bg-amber-100 text-[#1a1333]" : "bg-[#1a1333]"
      }`}
    >
      <div>
        <span
          className={`font-semibold text-1rem `}
          style={{ fontWeight: 500, fontSize: "1rem", letterSpacing: "0.5px" }}
        >
          {reminderInfo.name}
          {reminderInfo.isComplete ? <span> YES</span> : <span> no</span>}
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
