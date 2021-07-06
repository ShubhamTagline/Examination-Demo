import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { localGet, showLoader } from '../../reusable/OtherReuse'
import { reuseApi } from '../../reusable/ReuseApi'
import TableData from '../../reusable/TableData'
import Title from '../../reusable/Title'
 
function ShowStudent() {
  const [item,setItem]=useState()
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    const userData=async()=>{
      const response = await reuseApi("get", "dashboard/Teachers", null, {
        "access-token": localGet("token"),
      });
        setLoader(false)
        if (response.data.statusCode === 200) {
          setItem(response.data.data);
        }
    }
    userData()
  },[])

  return (
    <>
      <Title title="Show All Student"/>
      {loader && showLoader()}
      {item && (
        <TableData
          headingCol={["_id", "name", "email", "status"]}
          tableData={item}
          buttonAction={true}
        ></TableData>
      )}
    </>
  );
}

export default ShowStudent
