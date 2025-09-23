// import React, { useEffect, useReducer, useRef, useState } from "react";
// import Todo from "./Todos";
// import "./todolist.css";
// import "../../App.css";
// import { useCheckDaysToEnd } from "../../AppContext";
// const daysData = JSON.parse(localStorage.getItem("days-and-to-end"));
// // console.log(daysData);
// // let year = daysData ? daysData[1];
// // console.log(year);

// // const year = JSON.parse(localStorage.getItem("days-and-to-end"))[3] || [];
// // const daysOfYear = JSON.parse(localStorage.getItem("days-and-to-end"))[2] || [];
// // const daysCount = JSON.parse(localStorage.getItem("days-and-to-end"))[0] || [];
// // const daysToEndCount =
// //   JSON.parse(localStorage.getItem("days-and-to-end"))[1] || [];

// export const ACTIONS = {
//   ADD_TODO: "add-note",
//   TOGGLE_TODO: "toggle-todo",
//   DELETE_TODO: "delete-todo",
//   UPDATE_TODOS: "update-todos",
//   ADD_REMINDER: "add-reminder",
// };
// function reducer(todos, action) {
//   switch (action.type) {
//     case ACTIONS.ADD_TODO: {
//       return updateLocalStorage(
//         action.payload.name,
//         action.payload.priority,
//         action.payload.repeat
//       );
//     }
//     case ACTIONS.UPDATE_TODOS:
//       return JSON.parse(localStorage.getItem("todos"));

//     case ACTIONS.TOGGLE_TODO:
//       return toggleFunction(todos, action.payload.id);
//     case ACTIONS.DELETE_TODO:
//       if (
//         localStorage.getItem("todos") &&
//         JSON.parse(localStorage.getItem("todos")).length === 1
//       ) {
//         localStorage.clear();
//       }
//       return todos.filter((todo) => {
//         return action.payload.id !== todo.id;
//       });
//   }
// }
// function toggleFunction(todos, id) {
//   return todos.map((todo) => {
//     if (todo.id === id) {
//       return {
//         ...todo,
//         isComplete: !todo.isComplete,
//       };
//     }
//     return todo;
//   });
// }
// function updateLocalStorage(name, priority, repeat) {
//   const oldLocal = JSON.parse(localStorage.getItem("todos")) || [];
//   let newLocal = [
//     ...oldLocal,
//     {
//       name: name,
//       id: Date.now(),
//       isComplete: false,
//       priority: priority,
//       repeat: repeat,
//     },
//   ];
//   return newLocal;
// }

// const TodoList = () => {
//   const [todos, dispatch] = useReducer(
//     reducer,
//     JSON.parse(localStorage.getItem("todos")) || []
//   );

//   const [name, setName] = useState("");
//   const [counter, setCounter] = useState(0);
//   const [windowVisible, setWindowVisible] = useState(false);
//   const [priority, setPriority] = useState(3);
//   const [priorityVisible, setPriorityVisible] = useState(false);
//   const [repeatVisible, setRepeatVisible] = useState(false);
//   const [repeat, setRepeat] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const windowRef = useRef(null);
//   const priorityRef = useRef(null);
//   const repeatRef = useRef(null);

//   const daysAndToEnd = useCheckDaysToEnd();
//   const daysCount = daysAndToEnd[0];
//   const daysToEndCount = daysAndToEnd[1];
//   const daysOfYear = daysAndToEnd[2];
//   const year = daysAndToEnd[3];

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (name && name.length > 0) {
//       setCounter((prevCounter) => prevCounter + 1);
//       dispatch({
//         type: ACTIONS.ADD_TODO,
//         payload: {
//           name: name,
//           priority: priority,
//           repeat: [repeat, daysCount, daysOfYear, year],
//         },
//       });
//     }
//     setName("");
//     setPriority(3);
//     setWindowVisible(false);
//     setOpenDropdown(null);
//   }
//   function handleP1Click() {
//     setPriority(1);
//     setOpenDropdown(null);
//   }
//   function handleP2Click() {
//     setPriority(2);
//     setOpenDropdown(null);
//   }
//   function handleP3Click() {
//     setPriority(3);
//     setOpenDropdown(null);
//   }
//   useEffect(() => {
//     const handleDropDown = (e) => {
//       if (
//         priorityRef.current &&
//         openDropdown === "priority" &&
//         !priorityRef.current.contains(e.target)
//       ) {
//         setOpenDropdown(null);
//       }
//       if (
//         repeatRef.current &&
//         openDropdown === "repeat" &&
//         !repeatRef.current.contains(e.target)
//       ) {
//         setOpenDropdown(null);
//       }
//     };

//     if (openDropdown !== null) {
//       document.addEventListener("click", handleDropDown);
//     }
//     return () => {
//       document.removeEventListener("click", handleDropDown);
//     };
//   }, [openDropdown]);

//   function checkRepeatedTodos() {
//     let allTodos = JSON.parse(localStorage.getItem("todos"));
//     if (allTodos && allTodos.length > 0) {
//       allTodos.map((todo) => {
//         if (todo.repeat[3] !== year && todo.repeat[0]) {
//           todo.isComplete = false;
//         }
//         if (todo.repeat[0] === "1") {
//           if (todo.repeat[1] + 1 <= daysCount) {
//             todo.repeat[1] = daysCount;
//             todo.isComplete = false;
//           }
//         } else if (todo.repeat[0] === "2") {
//           if (todo.repeat[1] + 2 <= daysCount) {
//             todo.repeat[1] = daysCount;
//             todo.isComplete = false;
//           }
//         } else if (todo.repeat[0] === "3") {
//           if (todo.repeat[1] + 3 <= daysCount) {
//             todo.repeat[1] = daysCount;
//             todo.isComplete = false;
//           }
//         }
//       });
//     }
//     localStorage.setItem("todos", JSON.stringify(allTodos));
//   }
//   useEffect(() => {
//     setTimeout(() => {
//       checkRepeatedTodos();
//       dispatch({ type: ACTIONS.UPDATE_TODOS });
//     }, 10);
//   }, []);
//   useEffect(() => {
//     if (todos && todos.length > 0) {
//       localStorage.setItem("todos", JSON.stringify(todos));
//     }
//   }, [todos]);

//   useEffect(() => {
//     const dots = document.getElementsByClassName("dots-button");
//     console.log(dots);

//     function handleWindowClick(e) {
//       if (
//         e.target !== dots[0] &&
//         windowVisible &&
//         windowRef.current &&
//         !windowRef.current.contains(e.target)
//       ) {
//         setWindowVisible(false);
//       }
//     }
//     if (windowVisible && openDropdown === null) {
//       document.addEventListener("click", handleWindowClick);
//     }
//     return () => {
//       document.addEventListener("click", handleWindowClick);
//     };
//   }, [windowVisible]);

//   return (
//     <div className="todo-list-container">
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <input
//             className="input-from"
//             placeholder="add todo"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </form>
//         <button
//           onClick={() => setWindowVisible(!windowVisible)}
//           className="dots-button"
//         >
//           •••
//         </button>

//         <div
//           style={{ display: windowVisible ? "flex" : "none" }}
//           className="dots-window-container"
//           ref={windowRef}
//         >
//           <div className="priority">
//             <button
//               className="priority-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpenDropdown("priority");
//               }}
//             >
//               Set priority
//             </button>
//             {openDropdown === "priority" ? (
//               <div ref={priorityRef} className="priority-buttons">
//                 <button
//                   onClick={handleP1Click}
//                   style={{ color: "#fb4141", border: "1px solid #fb4141" }}
//                 >
//                   1
//                 </button>
//                 <button
//                   onClick={handleP2Click}
//                   style={{ color: "#FF9A00", border: "1px solid #ff9a00" }}
//                 >
//                   2
//                 </button>
//                 <button
//                   onClick={handleP3Click}
//                   style={{ color: "#5cb338", border: "1px solid #5cb338" }}
//                 >
//                   3
//                 </button>
//               </div>
//             ) : null}
//           </div>
//           <div className="repeat">
//             <button
//               className="priority-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpenDropdown("repeat");
//               }}
//             >
//               Set Repeat
//             </button>
//             {openDropdown === "repeat" ? (
//               <div ref={repeatRef} className="priority-buttons">
//                 <button
//                   style={{
//                     color: "#fb4141",
//                     border: "1px solid #fb4141",
//                     padding: "0",
//                     fontWeight: "bold",
//                     width: "60px",
//                   }}
//                   onClick={() => {
//                     setRepeat("1");
//                     setOpenDropdown(null);
//                   }}
//                 >
//                   Every Day
//                 </button>
//                 <button
//                   style={{
//                     color: "#ff9a00",
//                     border: "1px solid #ff9a00",
//                     padding: "0",
//                     fontWeight: "bold",
//                     width: "60px",
//                   }}
//                   onClick={() => {
//                     setRepeat("2");
//                     setOpenDropdown(null);
//                   }}
//                 >
//                   Every 2 Days
//                 </button>
//                 <button
//                   style={{
//                     color: "#5cb338",
//                     border: "1px solid #5cb338",
//                     padding: "0",
//                     fontWeight: "bold",
//                     width: "60px",
//                   }}
//                   onClick={() => {
//                     setRepeat("3");
//                     setOpenDropdown(null);
//                   }}
//                 >
//                   Every 3 Days
//                 </button>
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </div>
//       <h1 className="text-1xl !">Todo-List</h1>
//       <div className=" not-completed-todo-list">
//         {JSON.parse(localStorage.getItem("todos")) &&
//         JSON.parse(localStorage.getItem("todos")).length &&
//         JSON.parse(localStorage.getItem("todos")).length > 0 ? (
//           <div>
//             <div className="todo-list">
//               {todos.map((todo) =>
//                 !todo.isComplete && todo.priority === 1 ? (
//                   <Todo key={todo.id} todo={todo} dispatch={dispatch} />
//                 ) : null
//               )}
//             </div>
//             <div className="todo-list">
//               {todos.map((todo) =>
//                 !todo.isComplete && todo.priority === 2 ? (
//                   <Todo key={todo.id} todo={todo} dispatch={dispatch} />
//                 ) : null
//               )}
//             </div>
//             <div className="todo-list">
//               {todos.map((todo) =>
//                 !todo.isComplete && todo.priority === 3 ? (
//                   <Todo key={todo.id} todo={todo} dispatch={dispatch} />
//                 ) : null
//               )}
//             </div>
//           </div>
//         ) : null}
//       </div>
//       <div className="todo-list completed-todo-list">
//         <h2>Completed todos</h2>
//         {JSON.parse(localStorage.getItem("todos")) &&
//         JSON.parse(localStorage.getItem("todos")).length &&
//         JSON.parse(localStorage.getItem("todos")).length > 0
//           ? todos.map((todo) =>
//               todo.isComplete ? (
//                 <Todo key={todo.id} todo={todo} dispatch={dispatch} />
//               ) : null
//             )
//           : null}
//       </div>
//     </div>
//   );
// };

// export default TodoList;
import React, { useEffect, useReducer, useRef, useState } from "react";
import Todo from "./Todos";
import "./todolist.css";
import "../../App.css";
import { useCheckDaysToEnd } from "../../AppContext";
const daysData = JSON.parse(localStorage.getItem("days-and-to-end"));

export const ACTIONS = {
  ADD_TODO: "add-note",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  UPDATE_TODOS: "update-todos",
  ADD_REMINDER: "add-reminder",
};
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      return updateLocalStorage(
        action.payload.name,
        action.payload.priority,
        action.payload.repeat
      );
    }
    case ACTIONS.UPDATE_TODOS:
      return JSON.parse(localStorage.getItem("todos"));

    case ACTIONS.TOGGLE_TODO:
      return toggleFunction(todos, action.payload.id);
    case ACTIONS.DELETE_TODO:
      if (
        localStorage.getItem("todos") &&
        JSON.parse(localStorage.getItem("todos")).length === 1
      ) {
        localStorage.clear();
      }
      return todos.filter((todo) => {
        return action.payload.id !== todo.id;
      });
  }
}
function toggleFunction(todos, id) {
  return todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        isComplete: !todo.isComplete,
      };
    }
    return todo;
  });
}
function updateLocalStorage(name, priority, repeat) {
  const oldLocal = JSON.parse(localStorage.getItem("todos")) || [];
  let newLocal = [
    ...oldLocal,
    {
      name: name,
      id: Date.now(),
      isComplete: false,
      priority: priority,
      repeat: repeat,
    },
  ];
  return newLocal;
}

const TodoList = () => {
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0);
  const [windowVisible, setWindowVisible] = useState(false);
  const [priority, setPriority] = useState(3);
  const [priorityVisible, setPriorityVisible] = useState(false);
  const [repeatVisible, setRepeatVisible] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const windowRef = useRef(null);
  const priorityRef = useRef(null);
  const repeatRef = useRef(null);

  const daysAndToEnd = useCheckDaysToEnd();
  const daysCount = daysAndToEnd[0];
  const daysToEndCount = daysAndToEnd[1];
  const daysOfYear = daysAndToEnd[2];
  const year = daysAndToEnd[3];

  function handleSubmit(e) {
    e.preventDefault();
    if (name && name.length > 0) {
      setCounter((prevCounter) => prevCounter + 1);
      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: {
          name: name,
          priority: priority,
          repeat: [repeat, daysCount, daysOfYear, year],
        },
      });
    }
    setName("");
    setPriority(3);
    setWindowVisible(false);
    setOpenDropdown(null);
  }
  function handleP1Click() {
    setPriority(1);
    setOpenDropdown(null);
  }
  function handleP2Click() {
    setPriority(2);
    setOpenDropdown(null);
  }
  function handleP3Click() {
    setPriority(3);
    setOpenDropdown(null);
  }
  useEffect(() => {
    const handleDropDown = (e) => {
      if (
        priorityRef.current &&
        openDropdown === "priority" &&
        !priorityRef.current.contains(e.target)
      ) {
        setOpenDropdown(null);
      }
      if (
        repeatRef.current &&
        openDropdown === "repeat" &&
        !repeatRef.current.contains(e.target)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown !== null) {
      document.addEventListener("click", handleDropDown);
    }
    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, [openDropdown]);

  function checkRepeatedTodos() {
    let allTodos = JSON.parse(localStorage.getItem("todos"));
    if (allTodos && allTodos.length > 0) {
      allTodos.map((todo) => {
        if (todo.repeat[3] !== year && todo.repeat[0]) {
          todo.isComplete = false;
        }
        if (todo.repeat[0] === "1") {
          if (todo.repeat[1] + 1 <= daysCount) {
            todo.repeat[1] = daysCount;
            todo.isComplete = false;
          }
        } else if (todo.repeat[0] === "2") {
          if (todo.repeat[1] + 2 <= daysCount) {
            todo.repeat[1] = daysCount;
            todo.isComplete = false;
          }
        } else if (todo.repeat[0] === "3") {
          if (todo.repeat[1] + 3 <= daysCount) {
            todo.repeat[1] = daysCount;
            todo.isComplete = false;
          }
        }
      });
    }
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }
  useEffect(() => {
    setTimeout(() => {
      checkRepeatedTodos();
      dispatch({ type: ACTIONS.UPDATE_TODOS });
    }, 10);
  }, []);
  useEffect(() => {
    if (todos && todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const dots = document.getElementsByClassName("dots-button");
    function handleWindowClick(e) {
      if (
        e.target !== dots[0] &&
        windowVisible &&
        windowRef.current &&
        !windowRef.current.contains(e.target) &&
        openDropdown === null
      ) {
        setWindowVisible(false);
      }
    }
    if (windowVisible && openDropdown === null) {
      document.addEventListener("click", handleWindowClick);
    }
    return () => {
      document.removeEventListener("click", handleWindowClick);
    };
  }, [windowVisible]);

  return (
    <div className="todo-list-container modern">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="todo-form-modern">
          <input
            className="input-from modern-input"
            placeholder="Add a new todo..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="add-todo-btn">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
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
              Add
            </span>
          </button>
        </form>
        <button
          onClick={() => setWindowVisible(!windowVisible)}
          className="dots-button modern-dots"
          aria-label="More options"
        >
          •••
        </button>

        <div
          style={{ display: windowVisible ? "flex" : "none" }}
          className="dots-window-container"
          ref={windowRef}
        >
          <div className="priority">
            <button
              className="priority-button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown("priority");
              }}
            >
              Set priority
            </button>
            {openDropdown === "priority" ? (
              <div ref={priorityRef} className="priority-buttons">
                <button
                  onClick={handleP1Click}
                  style={{ color: "#fb4141", border: "1px solid #fb4141" }}
                >
                  1
                </button>
                <button
                  onClick={handleP2Click}
                  style={{ color: "#FF9A00", border: "1px solid #ff9a00" }}
                >
                  2
                </button>
                <button
                  onClick={handleP3Click}
                  style={{ color: "#5cb338", border: "1px solid #5cb338" }}
                >
                  3
                </button>
              </div>
            ) : null}
          </div>
          <div className="repeat">
            <button
              className="priority-button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown("repeat");
              }}
            >
              Set Repeat
            </button>
            {openDropdown === "repeat" ? (
              <div ref={repeatRef} className="priority-buttons">
                <button
                  style={{
                    color: "#fb4141",
                    border: "1px solid #fb4141",
                    padding: "0",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                  onClick={() => {
                    setRepeat("1");
                    setOpenDropdown(null);
                  }}
                >
                  Every Day
                </button>
                <button
                  style={{
                    color: "#ff9a00",
                    border: "1px solid #ff9a00",
                    padding: "0",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                  onClick={() => {
                    setRepeat("2");
                    setOpenDropdown(null);
                  }}
                >
                  Every 2 Days
                </button>
                <button
                  style={{
                    color: "#5cb338",
                    border: "1px solid #5cb338",
                    padding: "0",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                  onClick={() => {
                    setRepeat("3");
                    setOpenDropdown(null);
                  }}
                >
                  Every 3 Days
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <h1 className="todo-list-title">Todo List</h1>
      <div className="not-completed-todo-list">
        {todos && todos.length > 0 ? (
          <div>
            {[1, 2, 3].map((priorityLevel) => (
              <div className="todo-list" key={priorityLevel}>
                {todos.map((todo) =>
                  !todo.isComplete && todo.priority === priorityLevel ? (
                    <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                  ) : null
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-list-text">No todos yet. Add one above!</p>
        )}
      </div>
      <div className="todo-list completed-todo-list">
        <h2>Completed todos</h2>
        {todos && todos.length > 0
          ? todos.map((todo) =>
              todo.isComplete ? (
                <Todo key={todo.id} todo={todo} dispatch={dispatch} />
              ) : null
            )
          : null}
      </div>
    </div>
  );
};

export default TodoList;
