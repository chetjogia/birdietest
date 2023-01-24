import "./index.css";
import { useRef,useState } from "react";

interface SearchProps {
  distinctUsers: any;
  onClickHandler: any;
}

function Search(props: SearchProps) {
  const careRecipient = useRef<HTMLSelectElement>(null)
  const eventType = useRef<HTMLSelectElement>(null)
  const [distinctEvents, setDistinctEvents] = useState<{
    success: String;
    payload: any;
  }>()
  const [distinctCareGivers, setDistinctCareGivers] = useState<{
    success: String;
    payload: any;
  }>()



  async function onChangeHandler() {
    const id = careRecipient.current?.value
    const eventResponse = await fetch(`http://localhost:8000/distinctevents/${id}`);
    const eventData = await eventResponse.json()
    setDistinctEvents(eventData)

    const careResponse = await fetch(`http://localhost:8000/distinctcaregivers/${id}`)
    const careData = await careResponse.json()
    setDistinctCareGivers(careData)

  }

  console.log("DISTINC EVENTS", distinctEvents)
  return (
    <div className="search-container">
      <h1>Search</h1>
      <div className="care-recipient input-container">
        <label>Care Recipient:</label>
        <select id="search-filter" name="search-filter" ref={careRecipient} onChange={onChangeHandler}>
          {props.distinctUsers?.payload.map((element: any) => (
            <option value={element.care_recipient_id}>{element.care_recipient_id}</option>
          ))}
        </select>
      </div>
      <div className="event-type input-container">
        <label>Event Type:</label>
        <select id="event-type-filter" name="event-type-filter" ref={eventType}>
          {distinctEvents?.payload.map((element: any) => (
            <option value={element.event_type}>{element.event_type}</option>
          ))}
        </select>
      </div>
      <div className="care-giver input-container">
        <label>Care Giver:</label>
        <select id="event-type-filter" name="event-type-filter" ref={eventType}>
          {distinctCareGivers?.payload.map((element: any) => (
            <option value={element.caregiver_id}>{element.caregiver_id}</option>
          ))}
        </select>
      </div>
      <div className="date ">
        <div className="date-from input-container">
          <label>Date From:</label>
          <input type="date" />
        </div>
        <div className="date-to input-container">
          <label>Date Until:</label>
          <input type="date" />
        </div>
      </div>
      <button onClick={()=>props.onClickHandler(careRecipient.current?.value)}>Search</button>
    </div>
  );
}

export default Search;