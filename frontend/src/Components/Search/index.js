import "./index.css";

function Search() {
  return (
    <div className="search-container">
      <h1>Search</h1>
      <div className="care-recipient input-container">
        <label>Care Recipient:</label>
        <input type="text" />
      </div>
      <div className="event-type input-container">
        <label>Event Type:</label>
        <input type="text" />
      </div>
      <div className="care-giver input-container">
        <label>Care Giver:</label>
        <input type="text" />
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
    
    </div>
  );
}

export default Search;
