import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import Table from "./Components/Table";

function App() {

  //on mount, run get distinct users to populate the care recipient dropdown
  useEffect(() => {
    getDistinctUsers();
  }, []);

  const [distinctUsers, setDistinctUsers] = useState<{
    success: String;
    payload: [];
  }>();
  const [payload, setPayload] = useState();


  //get all distinct users from database
  async function getDistinctUsers() {
    const response = await fetch("https://birdie-test-backend.onrender.com/distinctusers");
    const data = await response.json();
    setDistinctUsers(data);
  }

  //on click of the search button obtain the information from the database based on the search criteria selected. Dates are required.
  async function onClickHandler(
    careRecipient: string,
    eventType: string | null,
    careGiver: string | null,
    startDate: string,
    endDate: string
  ) {

    //if all is selected for caregivers the query sends a null value to exclude from the filter in backend
    if (careGiver === "all") {
      careGiver = null;
    }

    const id = careRecipient;
    const response = await fetch(
      `https://birdie-test-backend.onrender.com/events/${id}?startDate=${startDate}&endDate=${endDate}&eventType=${eventType}&careGiver=${careGiver}`
    );
    const data = await response.json();
    const payloadArray = data.payload.map((element: any) =>
      JSON.parse(element.payload)
    );
    
    //obtain the payload array for the queried data which has been converted from json to a javascript object and set in state to be passed to table
    setPayload(payloadArray);
  }

  return (
    <div className="App">
      <div className="top-dashboard">
        <Search distinctUsers={distinctUsers} onClickHandler={onClickHandler} />
      </div>
      <div className="bottom-dashboard">
        <Table payload={payload} />
      </div>
    </div>
  );
}

export default App;
