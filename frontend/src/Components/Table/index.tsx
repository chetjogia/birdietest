import { table } from "console";
import "./index.css";
import TableRow from "./TableRow";

interface tableProps {
  payload: any;
}

function Table(props: tableProps) {
  if (props.payload?.length > 0) {
    //if there is a non empty array then clean the data according to the fields that will be required. Some are optional as they only populate dependent on event type.
    const tableArray = props.payload?.map((element: any) => {
      return {
        Date: new Date(element.timestamp).toLocaleString("en-gb"),
        CareGiver_ID: element.caregiver_id,
        visit_ID: element.visit_id,
        Fluid_Intake_ml: element?.consumed_volume_ml,
        Fluid_Type: element?.fluid,
        Mood: element?.mood,
        Note: element?.note,
        Pad_Condition: element?.pad_condition,
        Medication_Type: element?.medication_type,
        Meal: element?.meal,
        Task_Note: element?.task_schedule_note,
        Task_Definition: element?.task_definition_description,
      };
    });

    let filteredHeaderArray: string[] = [];
    let filteredDataArray: string[] = [];
    let dataObject: any = {};

    //obtain the headers for the table, excluding the values of the tableArray objects that are undefined
    if (tableArray) {
      for (let i = 0; i < tableArray.length; i++) {
        for (const [key, value] of Object.entries(tableArray[i])) {
          if (value !== undefined && !filteredHeaderArray.includes(key)) {
            filteredHeaderArray.push(key);
          }
        }
      }
    }

    //obtain the data for the table from the tableArray, based on the headers that exist in the filteredHeaderArray
    if (tableArray) {
      for (let i = 0; i < tableArray.length; i++) {
        dataObject = {};
        for (const [key, value] of Object.entries(tableArray[i])) {
          if (filteredHeaderArray.includes(key)) {
            dataObject[key] = value;
          }
        }
        filteredDataArray.push(dataObject);
      }
    }

    //render the table with the data, using table row component
    return (
      <div className="main-table">
        <table className="table-container">
          <tr className="row">
            {filteredHeaderArray.map((element: any) => (
              <th className="cell">{element}</th>
            ))}
          </tr>
          {filteredDataArray.map((element: any) => (
            <TableRow key={element.id} data={element}></TableRow>
          ))}
        </table>
      </div>
    );
  } else {
    //render instructions if payload is not present
    return (
      <div className="main-table">
        <div className="instructions">
          <h1>Instructions:</h1>
          <p><strong>Step 1: </strong>Choose a care recipient</p>
         <p> <strong>Step 2:</strong> Complete remaining search criteria as desired to see data for
          care recipient and press "Search" button(Note: Date range is required)</p> 
          <h2>Example criteria: </h2>
            <p><strong>Care Recipient: </strong>"df50cac5-293c-490d-a06c-ee26796f850d"</p>
            <p><strong>Event Type:</strong> "food_intake_observation"</p>
            <p><strong>Care Giver:</strong> "all"</p>
            <p><strong>Date From:</strong> "01/01/2019"</p> 
            <p><strong>Date Until:</strong> "24/01/2023"</p>
        </div>
      </div>
    );
  }
}

export default Table;
