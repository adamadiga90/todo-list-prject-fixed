import React from "react";

const ReminderElement = ({ reminderInfo }) => {
  return (
    <div>
      <p>{reminderInfo.date}</p>
      <p>{reminderInfo.name}</p>
    </div>
  );
};

export default ReminderElement;
