import React from 'react'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { newPassAry } from '../contain/FormAry'
import InputFields from '../reusable/InputFields'
import { alertMsg, validateForm, validPassword } from '../reusable/OtherReuse'
import { reuseApi } from '../reusable/ReuseApi'

function NewPassword() {
  const initialState={
    Password:'',
    ConfirmPassword:'',
    errors:{
      Password:' ',
      ConfirmPassword:' '
    }
  }

  const [item,setItem]=useState(initialState)
  
  const handleChange=(e)=>{
    let name=e.target.name
    let value=e.target.value
    let errors=item.errors

    switch (name) {
      case "Password":
        errors && (errors.Password=validPassword(value))
        break;
      case "ConfirmPassword":
        errors && (errors.ConfirmPassword=validPassword(value))
        break;

      default:
        break;
    }

    setItem({
      ...item,
      [name]:value,
      errors
    })
  }

  const search=useLocation().search
  let history=useHistory()
  
  const handleClick=async(e)=>{
    e.preventDefault()
    if(validateForm(item.errors)){
      alert('submit')
      const token=new URLSearchParams(search).get("token")
      delete item.errors
      const data=await reuseApi("post",`users/ForgotPassword/Verify?token=${token}`,item)
      if(data.status===200){
        alert(data.data.message)
        if(data.data.statusCode===200){
          history.push("/signIn")
        }
      }
    }else{
      alertMsg();
    }
  }
  
  return (
    <div>
      <h1>New Password</h1>
      <form onSubmit={handleClick}>
        <InputFields fields={newPassAry} onChange={handleChange} errors={item.errors}></InputFields>
      </form>
    </div>
  )
}

export default NewPassword
