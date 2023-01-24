
import "./index.css";

interface summaryProps {
  allUserEvents: any;
}

function Summary(props: summaryProps) {

  if(props.allUserEvents){

    
  }
  let moodScore=0;

  for (let i = 0; i < props.allUserEvents?.length; i++) {
    if (props.allUserEvents[i].event_type === "mood_observation") {
      if (props.allUserEvents[i].mood === "happy") {
        moodScore++;
      } else if (props.allUserEvents[i].mood === "sad") {
        moodScore--;
      }
    }
  }

  let mood = ""

  if(moodScore>0){
   mood = "Happy"
  }
  else if(moodScore === 0){
   mood = "Okay"
  }
  else{
  mood = "Sad"
  } 
  

  return (
    <div className="summary-container">
      <h1>Summary</h1>
      <div className="attributes">
        <div>
          <p>Average Mood Over Period:</p>
          <p> {mood ? mood : "-"} </p>
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
