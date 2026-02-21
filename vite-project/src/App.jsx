import { useState } from 'react'

import './App.css'

function App() {
 
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [image,setimage]=useState("");
   const [lemail,setlemail]=useState("");
  const [lpassword,setlpassword]=useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uimg,setuimg]=useState("");
  const [aname,setaname]=useState("");
    const sign=async ()=>{
      const api=await fetch("https://mybackend-zwr6.onrender.com/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,password,image})
      });
     const data=await api.json();
     alert(data.message);
    }

    const log=async ()=>{
      const api=await fetch("https://mybackend-zwr6.onrender.com/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:lemail,password:lpassword})
      });
      const data=await api.json();
     alert(data.message);
     if(data.message=='Loged in successfully'){
        setIsLoggedIn(true);
        setaname(data.Account.name);
        setuimg(data.Account.image);
     }
    }

  return (
    <>
     <div className="box">
      <div className="form">
        <h2 id='title'>Signup</h2>
        <input placeholder='Enter name' value={name} onChange={(e)=>{setname(e.target.value)}}></input>
         <input placeholder='Enter email' value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
         <input placeholder='Enter password' value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
         <input placeholder='Paste Image Path' value={image} onChange={(e)=>{setimage(e.target.value)}}></input>
         <button type='button' onClick={sign}>Signup</button>
        </div>
        
     <div className="loginform">
      <h2 id='title'>Login</h2>
        <input placeholder='Enter email' value={lemail} onChange={(e)=>{setlemail(e.target.value)}}></input>
        <input placeholder='Enter password' value={lpassword} onChange={(e)=>{setlpassword(e.target.value)}}></input>
        <button type='button' onClick={log}>Login</button>
       {isLoggedIn && <div>
        <h3>Welcome</h3>
        <img src={uimg} alt="User" width="60" height="60" style={{border:"3px solid white",borderRadius:"30px"}} />
        <h4 style={{margin:"10px"}}>{aname}</h4>

  </div>
  }
     </div>

     </div>
    </>
  )
}

export default App
