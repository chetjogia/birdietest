import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import Table from "./Components/Table";

function App() {
  const [distinctUsers, setDistinctUsers] = useState<{
    success: String;
    payload: [];
  }>();
  const [payload, setPayload] = useState();

  useEffect(() => {
    getDistinctUsers();
  }, []);

  async function getDistinctUsers() {
    const response = await fetch("https://birdie-test-backend.onrender.com/distinctusers");
    const data = await response.json();
    setDistinctUsers(data);
  }

  async function onClickHandler(
    careRecipient: string,
    eventType: string | null,
    careGiver: string | null,
    startDate: string,
    endDate: string
  ) {
    if (eventType === "all") {
      eventType = null;
    }

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
