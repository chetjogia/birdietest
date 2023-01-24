import "./index.css";


function Summary() {
  return (
    <div className="summary-container">
      <h1>Summary</h1>
      <div className="attributes">
        <div>
          <p>Average Mood Over Period:</p>
          <p> - </p>
        </div>
        <div>
          <p>Number of Visits for Period:</p>
          <p> - </p>
        </div>
        <div>
          <p>Average Visit Time:</p>
          <p> - </p>
        </div>
        <div>
          <p>Average Daily Fluid Intake (ml):</p>
          <p> - </p>
        </div>
        <div>
          <p>Number of Alerts per Period:</p>
          <p> - </p>
        </div>
        <div>
          <p>% medicine Taken</p>
          <p> - </p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
