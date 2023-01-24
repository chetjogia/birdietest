import { table } from "console";
import "./index.css";
import TableRow from "./TableRow";

interface tableProps {
  payload: any
}

function Table(props: tableProps) {
  if (props.payload?.length > 0) {
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
    let dataObject:any = {};

    if (tableArray) {
      for (let i = 0; i < tableArray.length; i++) {
        for (const [key, value] of Object.entries(tableArray[i])) {
          if (value !== undefined && !filteredHeaderArray.includes(key)) {
            filteredHeaderArray.push(key);
          }
        }
      }
    }

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
    return (
      <div className="main-table">
        <div className="table-container">
          <h1>Instructions:</h1>
          <p>
            Complete search criteria including date range, to see data for care
            recipient
          </p>
        </div>
      </div>
    );
  }
}

export default Table;
