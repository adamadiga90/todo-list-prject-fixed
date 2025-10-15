import React from "react";
import TodoList from "../../Components/TodoList/TodoList";
import Reminder from "../../Components/Reminder/Reminder";
import Progress from "../../Components/progress/Progress";
import "../../index.css";

const Home = () => {
  return (
    <div className="home-container flex gap-5 m-auto flex-col lg:flex-row">
      <TodoList />
      <Reminder />
      <Progress />
    </div>
  );
};

export default Home;
