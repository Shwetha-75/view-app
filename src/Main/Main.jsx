import React from 'react'
import axios from "axios";
export default function Login() {

    const [data,setData]=React.useState({
        username:'',
        password:''
    });

    const [result,setResult]=React.useState("")
  const [protectedData,setProtectedData]=React.useState("")
   const handleFormSubmission=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("username",data.username);
    formData.append("password",data.password);
    try{
          const response = await axios.post("http://192.168.1.3:5000/login",formData,{
            headers:{
                 'Content-Type':'multipart/form-data'
            },
            withCredentials:true
          })

          console.log(response);
          setResult(response.data.status)
    }catch(error){
          console.log(error)
    }
   } 

   const handleLogout=async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.get("http://192.168.1.3:5000/logout",{
            withCredentials:true
        }
                     
        )
       setResult(response.data.status)
    }catch(error){
        console.log(error)
    }
   };

   const onCheckUserName=async()=>{
        try{
              const response = await axios.get("http://192.168.1.3:5000/protected",{
                withCredentials:true
              });
              setProtectedData(response.data.message)

        }catch(error){
            console.log(error)
        }
   }

  return (
    <div>
        <h1></h1>
        <form onSubmit={handleFormSubmission} method='POST'>
            <label>User Name: </label>
            <input
            type="text"
            name="username"
            value={data.username||""}
            onChange={(e)=>{setData(
                {
                    ...data,
                    username:e.target.value
                }
            )}}
            />
            <br></br>
            <label>Password : </label>
            <input
            type="password"
            name="password"
            value={data.password||""}
            onChange={(e)=>{setData(
                {
                    ...data,
                    password:e.target.value
                }
            )}}
            />
            <br></br>
            <input
            style={{
                backgroundColor:'green',
                color:'white'
            }}
            type="submit"
            value="Submit"
            />
        </form>
         <div>-------------------------------------------****--------------------------------</div>
         <h1>{result}</h1>
        <br></br>
        <h1>Check your user name</h1>
        <button
        
        onClick={onCheckUserName}
        >Check</button>
        <h1>{protectedData}</h1>
        <br>
        </br>
          <button
          onClick={handleLogout}
          style={{
            backgroundColor:'red',
            color:'white'
          }}
          >Logout</button>

    </div>
  )
}
