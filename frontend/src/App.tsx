import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import Summary from "./Components/Summary";

function App() {
  const [distinctUsers, setDistinctUsers] = useState<{
    success: String;
    payload: any;
  }>();
  const [filteredUserData, setFilteredUserData] = useState();



  useEffect(() => {
    getDistinctUsers();
  }, []);

  async function getDistinctUsers() {
    const response = await fetch("http://localhost:8000/distinctusers");
    const data = await response.json();
    setDistinctUsers(data);
  }



  async function onClickHandler(careRecipient: any) {
    /*     const id = distinctUsers?.payload[0].care_recipient_id; */
    const id = careRecipient;
    const response = await fetch(
      `http://localhost:8000/events/${id}?startDate=2019-05-10&endDate=2019-05-12&eventType=null&careGiver=null`
    );
    const data = await response.json();
    setFilteredUserData(data);
  }

  console.log("Distinct USERS", distinctUsers);
  console.log("FILTERED DATA", filteredUserData);

  return (
    <div className="App">
      <div className="top-dashboard">
        <Search distinctUsers={distinctUsers} onClickHandler={onClickHandler} />
        <Summary />
      </div>
    </div>
  );
}

export default App;
