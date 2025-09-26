import React from "react";
import Home from "./pages/Home/Home";
import Sidebar from "./Components/Sidbar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AppContextProvider from "./AppContext";
import Info from "./pages/Info";

const App = () => {
  return (
    <AppContextProvider className="App">
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </AppContextProvider>
  );
};

export default App;
