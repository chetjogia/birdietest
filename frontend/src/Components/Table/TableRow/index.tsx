import React from 'react'
import '../../Table/index.css'


interface tableRowProps{
    data:any
}

function TableRow(props:tableRowProps){
    return (
        
        <tr className='row'>
            {Object.values(props.data).map((element:any)=><td className='cell'>{element}</td>)}
        </tr>
    )
}


export default TableRow