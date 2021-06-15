import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { localGet } from '../../reusable/OtherReuse'
import { reuseApi } from '../../reusable/ReuseApi'
import TableData from '../../reusable/TableData'
 
function ShowStudent() {
  const [item,setItem]=useState()
  const [heading,setHeading]=useState()

  useEffect(()=>{
    const userData=async()=>{
      const data = await reuseApi("get", "dashboard/Teachers", null, {
        "access-token": localGet("token"),
      });
      if (data.status === 200) {
        alert(data.data.message);
        if (data.data.statusCode === 200) {
          const header = ["status", "_id", "Name","email_id","Action"];
          setHeading(header)
          setItem(data.data.data)
        }
      }
    }
    userData()
  },[])

  return (
    <div className="container">
      <h1>Show All Student</h1>
       {item && (
        <TableData
          headingCol={heading}
          tableData={item}
        ></TableData>
      )}
    </div>
  );
}

export default ShowStudent
