import "./index.css";
import { useRef, useState } from "react";

interface SearchProps {
  distinctUsers: any;
  onClickHandler: any;
}

function Search(props: SearchProps) {
  const careRecipient = useRef<HTMLSelectElement>(null);
  const eventType = useRef<HTMLSelectElement>(null);
  const careGiver = useRef<HTMLSelectElement>(null);
  const startDate = useRef<HTMLInputElement>(null);
  const endDate = useRef<HTMLInputElement>(null);

  const [distinctEvents, setDistinctEvents] = useState<{
    success: String;
    payload: any;
  }>();
  const [distinctCareGivers, setDistinctCareGivers] = useState<{
    success: String;
    payload: any;
  }>();

  async function onChangeHandler() {
    const id = careRecipient.current?.value;
    const eventResponse = await fetch(
      `http://localhost:8000/distinctevents/${id}`
    );
    const eventData = await eventResponse.json();
    setDistinctEvents(eventData);

    const careResponse = await fetch(
      `http://localhost:8000/distinctcaregivers/${id}`
    );
    const careData = await careResponse.json();
    setDistinctCareGivers(careData);
  }

  console.log("DISTINCT EVENTS", distinctEvents);
  return (
    <div className="search-container">
      <h1>Birdie Care Dashboard</h1>
      <div className="form-div">
        <div className="search-div">
          <div className="care-recipient input-container">
            <label>Care Recipient:</label>
            <select
              id="search-filter"
              name="search-filter"
              ref={careRecipient}
              onChange={onChangeHandler}
            >
              <option value="select">Please Select a Care Recipient</option>
              {props.distinctUsers?.payload.map((element: any) => (
                <option value={element.care_recipient_id}>
                  {element.care_recipient_id}
                </option>
              ))}
            </select>
          </div>
          <div className="event-type input-container">
            <label>Event Type:</label>

            <select
              id="event-type-filter"
              name="event-type-filter"
              ref={eventType}
            >
              {!distinctEvents || careRecipient.current?.value === "select" ? (
                <option value="notice">Please Select a Care Recipient</option>
              ) : (
                distinctEvents?.payload.map((element: any) => (
                  <option value={element.event_type}>
                    {element.event_type}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="care-giver input-container">
            <label>Care Giver:</label>
            <select
              id="event-type-filter"
              name="event-type-filter"
              ref={careGiver}
            >
              {!distinctCareGivers ||
              careRecipient.current?.value === "select" ? (
                <option value="select">Please Select a Care Recipient</option>
              ) : (
                [<option value="all">all</option>,
                distinctCareGivers?.payload.map((element: any) => (
                  <option value={element.caregiver_id}>
                    {element.caregiver_id}
                  </option>
                ))]
              )}
            </select>
          </div>
        </div>

        <div className="date ">
          <div className="date-from input-container">
            <label>Date From:</label>
            <input type="date" ref={startDate} />
          </div>
          <div className="date-to input-container">
            <label>Date Until:</label>
            <input type="date" ref={endDate} />
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          props.onClickHandler(
            careRecipient.current?.value,
            eventType.current?.value,
            careGiver.current?.value,
            startDate.current?.value,
            endDate.current?.value
          )
        }
      >
        Search
      </button>
    </div>
  );
}

export default Search;
