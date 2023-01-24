import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import Summary from "./Components/Summary";

function App() {
  const [distinctUsers, setDistinctUsers] = useState()


  useEffect( ()=>{
    getDistinctUsers()
  }, [])

  async function getDistinctUsers(){
    const response = await fetch('http://localhost:8000/distinctusers')
    const data = await response.json()
    setDistinctUsers(data)
  }


  
  console.log("Distinct USERS", distinctUsers)

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
