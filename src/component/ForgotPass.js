import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotAry } from '../contain/FormAry'
import InputFields from '../reusable/InputFields'
import { alertMsg, validateForm, validEmail } from '../reusable/OtherReuse'
import { reuseApi } from '../reusable/ReuseApi'

function ForgotPass() {

  const initialState={
    email:'',
    errors:{
      email:' '
    }
  }
  const [item,setItem]=useState(initialState)

  const handleChange=(e)=>{
    let name=e.target.name
    let value=e.target.value
    let errors=item.errors

    switch (name) {
      case "email":
        errors && (errors.email=validEmail(value))
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

  const handleClick=async(e)=>{
    e.preventDefault()
    if(validateForm(item.errors)){
      alert("submit")
      delete item.errors
      const data = await reuseApi("post", "users/ForgotPassword",item);
      if(data.status===200){
        alert(data.data.message)
        if(data.data.statusCode===200){ 
          setItem(initialState)
        }
      }
    }else{
      alertMsg()
    }
  }

  return (
    <div>
      <h1>Forgot Password Page</h1> <br />
      <form onSubmit={handleClick}>
        <InputFields fields={forgotAry} onChange={handleChange} errors={item.errors} data={item}></InputFields>
      </form> <br />
      <Link to="/signIn">Back to Login?</Link>
    </div>
  );
}

export default ForgotPass
