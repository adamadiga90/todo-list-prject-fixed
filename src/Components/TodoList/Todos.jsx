// import React from "react";
// import { ACTIONS } from "./TodoList";
// import { FaRegTrashCan } from "react-icons/fa6";
// const Todo = ({ todo, dispatch }) => {
//   function handleToggle() {
//     dispatch({
//       type: ACTIONS.TOGGLE_TODO,
//       payload: {
//         id: todo.id,
//       },
//     });
//   }
//   function handleDelete() {
//     dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } });
//   }

//   return (
//     <div className="todo-item">
//       <div className="toggle-and-label">
//         <button
//           bg={todo.priority}
//           style={{
//             backgroundColor: todo.isComplete ? "#4a4a4a" : null,
//           }}
//           onClick={handleToggle}
//         ></button>
//         <p
//           style={{
//             textDecoration: todo.isComplete ? "line-through" : null,
//           }}
//         >
//           {todo.name}
//           {/* '' */}
//           {/* {todo.repeat[0]}/{todo.repeat[1]} */}
//         </p>
//       </div>

//       <button
//         className="delete-button"
//         onClick={handleDelete}
//         style={{
//           width: "auto",
//           height: "30px",
//           outline: "none",
//           border: "none",
//           borderRadius: "4px",
//           display: "block",
//         }}
//       >
//         <FaRegTrashCan />
//       </button>
//     </div>
//   );
// };

// export default Todo;
import React from "react";
import { ACTIONS } from "./TodoList";
import { FaRegTrashCan } from "react-icons/fa6";
import { useCheckDaysToEnd } from "../../AppContext";

const Todos = ({ todo, dispatch }) => {
  const daysAndToEnd = useCheckDaysToEnd();
  const daysCount = daysAndToEnd[0];
  const year = daysAndToEnd[3];
  // console.log(year);

  return (
    <div className="todo-item">
      <div className="toggle-and-label">
        <button
          bg={todo.priority}
          title={`Priority ${todo.priority}`}
          onClick={() =>
            dispatch({
              type: ACTIONS.TOGGLE_TODO,
              payload: { id: todo.id, daysCount: daysCount, year: year },
            })
          }
        >
          {todo.isComplete ? "✓" : ""}
        </button>
        <span
          style={{
            textDecoration: todo.isComplete ? "line-through" : "none",
            opacity: todo.isComplete ? 0.6 : 1,
            fontWeight: 500,
            fontSize: "1rem",
            letterSpacing: "0.5px",
          }}
        >
          {todo.name}
        </span>
      </div>
      <button
        className="delete-button text-white hover:text-red-600 bg-[#542ef8] "
        title="Delete"
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
        }
      >
        <FaRegTrashCan />
      </button>
    </div>
  );
};

export default Todos;
