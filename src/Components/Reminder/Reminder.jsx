// import React, { useEffect, useReducer, useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import "./reminder.css";
// import { useCheckDaysToEnd } from "../../AppContext";
// import { ACTIONS } from "../TodoList/TodoList";
// import ReminderElement from "./ReminderElement";

// function reducer(reminders, action) {
//   switch (action.type) {
//     case ACTIONS.ADD_REMINDER:
//       return [
//         ...reminders,
//         addReminder(action.payload.date, action.payload.name),
//       ];
//   }
// }

// function addReminder(date, name) {
//   return { date: date, name: name };
// }

// const Reminder = () => {
//   const [reminders, dispatch] = useReducer(
//     reducer,
//     JSON.parse(localStorage.getItem("reminders")) || []
//   );

//   const [addingVisible, setAddingVisible] = useState(false);
//   const [preData, setPreData] = useState();
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [data, setData] = useState(0);
//   const [name, setName] = useState("");

//   const daysAndToEnd = useCheckDaysToEnd();
//   const daysCount = daysAndToEnd[0];
//   const daysToEndCount = daysAndToEnd[1];
//   const daysOfYear = daysAndToEnd[2];
//   const year = daysAndToEnd[3];
//   const newDate = daysAndToEnd[4];
//   console.log(newDate);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (preData && preData.length > 0) {
//       setData(preData);
//       dispatch({
//         type: ACTIONS.ADD_REMINDER,
//         payload: { date: preData.toISOString().split("T")[0], name: name },
//       });
//       setPreData(null);
//       setAddingVisible(false);
//     }
//   }
//   useEffect(() => {
//     localStorage.setItem("reminders", JSON.stringify(reminders));
//   }, [reminders]);
//   // localStorage.clear();
//   console.log(name);

//   return (
//     <div className="reminder-container ">
//       <div className={`${addingVisible ? "blur-[1px]" : "blur-none"}`}>
//         <h1>Reminders</h1>
//         <button
//           className="add-reminder-btn"
//           type="button"
//           onClick={() => setAddingVisible(true)}
//         >
//           <span
//             style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
//           >
//             Add a reminder
//           </span>
//         </button>
//       </div>
//       {addingVisible ? (
//         <div className="adding-tab blur-none">
//           <h2 style={{ marginBottom: "8px" }}>Add Reminder</h2>
//           <form
//             style={{ display: "flex", flexDirection: "column", gap: "12px" }}
//           >
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Reminder name"
//             />
//             <div style={{ position: "relative" }}>
//               <input
//                 type="text"
//                 className="custom-datepicker"
//                 value={preData ? preData.toLocaleDateString() : ""}
//                 placeholder="Select date"
//                 readOnly
//                 onClick={() => setShowCalendar(true)}
//                 style={{ cursor: "pointer" }}
//               />
//               {showCalendar && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "48px",
//                     left: 0,
//                     zIndex: 100,
//                   }}
//                 >
//                   <DayPicker
//                     mode="single"
//                     selected={preData}
//                     onSelect={(date) => {
//                       if (date && date >= new Date(newDate)) {
//                         setPreData(date);
//                         setShowCalendar(false);
//                       }
//                     }}
//                     disabled={{ before: new Date(newDate) }}
//                     modifiersClassNames={{
//                       selected: "rdp-day_selected",
//                       today: "rdp-day_today",
//                       disabled: "rdp-day_disabled",
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//             <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
//               <button className="button-main" onClick={(e) => handleSubmit(e)}>
//                 Submit
//               </button>
//               <button
//                 className="button-cancel"
//                 type="button"
//                 onClick={() => {
//                   setAddingVisible(false);
//                   setPreData(null);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : null}
//       <div
//         className={`reminder-list ${
//           addingVisible ? "blur-[1px]" : "blur-none"
//         }`}
//       >
//         {reminders && reminders.length > 0 ? (
//           reminders.map((reminderInfo, idx) => (
//             <div className="reminder-card" key={idx}>
//               <ReminderElement reminderInfo={reminderInfo} />
//             </div>
//           ))
//         ) : (
//           <p style={{ color: "#9987e5", textAlign: "center" }}>
//             No reminders yet.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reminder;
import React, { useReducer, useState, useEffect } from "react";
import ReminderElement from "./ReminderElement";
import "./reminder.css";
import "../../App.css";
import { useCheckDaysToEnd } from "../../AppContext";

function reducer(reminders, action) {
  switch (action.type) {
    case "add-reminder":
      return addReminderFunction(
        reminders,
        action.payload.name,
        action.payload.date
      );
    case "delete-reminder":
      return reminders.filter((r, idx) => idx !== action.payload);
    default:
      return reminders;
  }
}

function addReminderFunction(reminders, name, date) {
  let oldReminders = JSON.parse(localStorage.getItem("reminders")) || [];
  let newReminders = [
    ...oldReminders,
    { name: name, id: Date.now(), date: date, isComplete: false },
  ];
  // localStorage.setItem("reminders", JSON.stringify(newReminders));
  return newReminders;
}

const Reminder = () => {
  const [reminders, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("reminders")) || []
  );
  const [addingVisible, setAddingVisible] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const daysAndToEnd = useCheckDaysToEnd();
  const theDate = daysAndToEnd[4];
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  function handleSubmit(e) {
    e.preventDefault();
    if (name && date) {
      dispatch({
        type: "add-reminder",
        payload: { name: name, date: date },
      });
      setName("");
      setDate("");
      setAddingVisible(false);
    }
  }

  console.log(daysAndToEnd[4]);
  let test = "2025-10-1";
  console.log(+theDate.slice(8, 10));
  console.log(+test.slice(8, 10));

  function checkIsComplete() {
    reminders.map((reminder, i) => {
      // reminder.date === daysAndToEnd[4]
      // reminder.date === test
      //   ? (reminder.isComplete = true)
      //   : (reminder.isComplete = false);
      if (reminder.date === daysAndToEnd[4]) {
        reminder.isComplete = true;
      }
      if (
        +reminder.date.slice(5, 7) < +theDate.slice(5, 7) ||
        (+reminder.date.slice(5, 7) === +theDate.slice(5, 7) &&
          +reminder.date.slice(8, 10) < +theDate.slice(8, 10))
      ) {
        dispatch({ type: "delete-reminder", payload: i });
        // reminder.isComplete =
      }
    });
    // dispatch({type:"delete-reminder", payload:reminders[0].id})
    // if ()
  }

  useEffect(() => {
    checkIsComplete();
  }, []);

  return (
    <div className="reminder-container modern">
      <div className="form-container">
        <button
          className="add-reminder-btn"
          type="button"
          onClick={() => setAddingVisible(true)}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14m7-7H5" />
            </svg>
            Add Reminder
          </span>
        </button>
        {addingVisible && (
          <form className="reminder-form-modern" onSubmit={handleSubmit}>
            <input
              className="modern-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Reminder name"
            />
            <input
              className="modern-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button className="add-reminder-btn" type="submit">
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
        )}
      </div>
      <h1 className="reminder-list-title">Reminders</h1>
      <div className="reminder-list modern">
        {reminders && reminders.length > 0 ? (
          reminders.map((reminderInfo, idx) => (
            <div className="reminder-card" key={idx}>
              <ReminderElement
                reminderInfo={reminderInfo}
                onDelete={() =>
                  dispatch({ type: "delete-reminder", payload: idx })
                }
              />
            </div>
          ))
        ) : (
          <p className="empty-list-text">No reminders yet. Add one above!</p>
        )}
      </div>
    </div>
  );
};

export default Reminder;
