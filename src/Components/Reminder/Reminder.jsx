import React, { useEffect, useReducer, useState } from "react";
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
  const [preData, setPreData] = useState(0);
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
    if (preData.length > 0) {
      setData(preData);
      dispatch({
        type: ACTIONS.ADD_REMINDER,
        payload: { date: preData, name: name },
      });
      setPreData(0);
    }
  }

  useEffect(() => {
    console.log(preData);
    console.log(preData.length);
    // console.log(data);
    console.log(reminders);
  });

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);
  // localStorage.clear();
  console.log(name);

  return (
    <div className="reminder-container ">
      <div className={`${addingVisible ? "blur-[1px]" : "blur-none"}`}>
        <h1>Reminders</h1>
        <button onClick={() => setAddingVisible(true)}>Add a reminder</button>
      </div>
      {addingVisible ? (
        <div className="adding-tab blur-none ">
          <p>calendar</p>
          <form className="flex flex-col gap-3">
            <input
              className="bg-[#27108a] text-[#efeef7]"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <input
                type="date"
                value={preData}
                onChange={(e) => setPreData(e.target.value)}
                min={newDate}
              />

              <div className="flex gap-3">
                <button
                  className="text-[#9987e5] font-bold [padding: 10px]"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
                <button className="text-red-500">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
      <div className={`${addingVisible ? "blur-[1px]" : "blur-none"}`}>
        {reminders && reminders.length && reminders.length > 0
          ? reminders.map((reminderInfo) => (
              <ReminderElement reminderInfo={reminderInfo} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Reminder;
