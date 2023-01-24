import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./Components/Search";
import Summary from "./Components/Summary";

function App() {
  return (
    <div className="App">
      <div className="top-dashboard">
        <Search />
        <Summary />
      </div>
    </div>
  );
}

export default App;
