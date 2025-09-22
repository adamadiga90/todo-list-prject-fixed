import React, { useEffect, useReducer, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./reminder.css";
import { useCheckDaysToEnd } from "../../AppContext";
import { ACTIONS } from "../TodoList/TodoList";
import ReminderElement from "./ReminderElement";

function reducer(reminders, action) {
  switch (action.type) {
    case ACTIONS.ADD_REMINDER:
      return [
        ...reminders,
        addReminder(action.payload.date, action.payload.name),
      ];
  }
}

function addReminder(date, name) {
  return { date: date, name: name };
}

const Reminder = () => {
  const [reminders, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("reminders")) || []
  );

  const [addingVisible, setAddingVisible] = useState(false);
  const [preData, setPreData] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [data, setData] = useState(0);
  const [name, setName] = useState("");

  const daysAndToEnd = useCheckDaysToEnd();
  const daysCount = daysAndToEnd[0];
  const daysToEndCount = daysAndToEnd[1];
  const daysOfYear = daysAndToEnd[2];
  const year = daysAndToEnd[3];
  const newDate = daysAndToEnd[4];
  console.log(newDate);

  function handleSubmit(e) {
    e.preventDefault();
    if (preData) {
      setData(preData);
      dispatch({
        type: ACTIONS.ADD_REMINDER,
        payload: { date: preData.toISOString().split("T")[0], name: name },
      });
      setPreData(null);
    }
  }

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);
  // localStorage.clear();
  console.log(name);

  return (
    <div className="reminder-container ">
      <div className={`${addingVisible ? "blur-[1px]" : "blur-none"}`}>
        <h1>Reminders</h1>
        <button
          className="add-reminder-btn"
          type="button"
          onClick={() => setAddingVisible(true)}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            Add a reminder
          </span>
        </button>
      </div>
      {addingVisible ? (
        <div className="adding-tab blur-none">
          <h2 style={{ marginBottom: "8px" }}>Add Reminder</h2>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Reminder name"
            />
            <div style={{ position: "relative" }}>
              <input
                type="text"
                className="custom-datepicker"
                value={preData ? preData.toLocaleDateString() : ""}
                placeholder="Select date"
                readOnly
                onClick={() => setShowCalendar(true)}
                style={{ cursor: "pointer" }}
              />
              {showCalendar && (
                <div
                  style={{
                    position: "absolute",
                    top: "48px",
                    left: 0,
                    zIndex: 100,
                  }}
                >
                  <DayPicker
                    mode="single"
                    selected={preData}
                    onSelect={(date) => {
                      if (date && date >= new Date(newDate)) {
                        setPreData(date);
                        setShowCalendar(false);
                      }
                    }}
                    disabled={{ before: new Date(newDate) }}
                    modifiersClassNames={{
                      selected: "rdp-day_selected",
                      today: "rdp-day_today",
                      disabled: "rdp-day_disabled",
                    }}
                  />
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button className="button-main" onClick={(e) => handleSubmit(e)}>
                Submit
              </button>
              <button
                className="button-cancel"
                type="button"
                onClick={() => setAddingVisible(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
      <div
        className={`reminder-list ${
          addingVisible ? "blur-[1px]" : "blur-none"
        }`}
      >
        {reminders && reminders.length > 0 ? (
          reminders.map((reminderInfo, idx) => (
            <div className="reminder-card" key={idx}>
              <ReminderElement reminderInfo={reminderInfo} />
            </div>
          ))
        ) : (
          <p style={{ color: "#9987e5", textAlign: "center" }}>
            No reminders yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Reminder;
