import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { localGet, showLoader } from '../../reusable/OtherReuse'
import { reuseApi } from '../../reusable/ReuseApi'
import TableData from '../../reusable/TableData'
 
function ShowStudent() {
  const [item,setItem]=useState()
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    const userData=async()=>{
      const data = await reuseApi("get", "dashboard/Teachers", null, {
        "access-token": localGet("token"),
      });
      if (data.status === 200) {
        setLoader(false)
        if (data.data.statusCode === 200) {
          setItem(data.data.data)
        }
      }
    }
    userData()
  },[])

  return (
    <div className="container">
      <h1>Show All Student</h1>
      {loader && showLoader()}
      {item && (
        <TableData
          headingCol={["_id", "name", "email", "status"]}
          tableData={item}
          buttonAction={true}
        ></TableData>
      )}
    </div>
  );
}

export default ShowStudent
