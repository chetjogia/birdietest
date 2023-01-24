import { table } from "console";
import "./index.css";
import TableRow from "./TableRow";

interface tableProps {
  payload: any;
}

function Table(props: tableProps) {
  if (props.payload?.length > 0) {
    const tableArray = props.payload?.map((element: any) => {
      return {
        timestamp: element.timestamp,
        visitId: element.visit_id,
        fluidIntake: element?.consumed_volume_ml,
        fluid: element?.fluid,
        mood: element?.mood,
        note: element?.note,
        padCondition: element?.pad_condition,
        medicationType: element?.medication_type,
        meal: element?.meal,
        taskNote: element?.task_schedule_note,
        taskDefinition: element?.task_definition_description,
      };
    });

    console.log("TABLE ARRAY", tableArray);

    let filteredHeaderArray: any = [];
    let filteredDataArray: any = [];
    let dataObject: any = {};

  

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

    console.log(filteredHeaderArray);

    console.log(filteredDataArray);

    return (
      <table className="table-container">
        <tr className="row">
          {filteredHeaderArray.map((element: any) => (
            <th className="cell">{element}</th>
          ))}
        </tr>
        {filteredDataArray.map((element: any) => (
          <TableRow data={element}></TableRow>
        ))}
      </table>
    );
  } else {
    return <table className="table-container"></table>;
  }
}

export default Table;
