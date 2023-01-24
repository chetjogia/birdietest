import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import Table from "./Components/Table";

function App() {
  const [distinctUsers, setDistinctUsers] = useState<{
    success: String;
    payload: any;
  }>();
  const [filteredUserData, setFilteredUserData] = useState();
  const [payload, setPayload] = useState();

  useEffect(() => {
    getDistinctUsers();
  }, []);

  async function getDistinctUsers() {
    const response = await fetch("http://localhost:8000/distinctusers");
    const data = await response.json();
    setDistinctUsers(data);
  }

  async function onClickHandler(
    careRecipient: any,
    eventType: any,
    careGiver: any,
    startDate: any,
    endDate: any
  ) {
    /*     const id = distinctUsers?.payload[0].care_recipient_id; */

    if(eventType === "all"){
      eventType = null
    }

    if(careGiver === "all"){
      careGiver = null
    }
    console.log("Care Recipient", careRecipient);
    console.log("Event Type", eventType);
    console.log("Care Giver", careGiver);
    console.log("Start Date", startDate);
    console.log("End Date", endDate);

    //`http://localhost:8000/events/${id}?startDate=2019-05-10&endDate=2019-05-12&eventType=null&careGiver=null`
    const id = careRecipient;
    const response = await fetch(
      `http://localhost:8000/events/${id}?startDate=${startDate}&endDate=${endDate}&eventType=${eventType}&careGiver=${careGiver}`
    );
    const data = await response.json();
    setFilteredUserData(data);

 
    const payloadArray = data.payload.map((element: any) =>
      JSON.parse(element.payload)
    );
    console.log("PAYLOAD", payloadArray);
    setPayload(payloadArray);


    
  }


  console.log("Distinct USERS", distinctUsers);
  console.log("FILTERED DATA", filteredUserData);

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
