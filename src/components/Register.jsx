import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
// import AddTaskIcon from '@mui/icons-material/AddTask'; 
import Keeper from './Keeper';
const Register = () => {

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });
  
  const handleChange = (event) => {
    const {name, value} = event.target;

    setNewUser( prevValue => {
        return {
            ...prevValue,
            [name]: value
        }
    });
  }

  const handleSubmit = async (event) => {  
    console.log("I am clicked");
    event.preventDefault();  
    const {name,email,password,cpassword}=newUser;
    if (password === cpassword) {
      const response = await fetch("http://localhost:7000/api/auth/createuser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name: name,email: email,password: password})
      });
      console.log("beforeresponse");
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect 
        console.log("suxxesfully added")
        localStorage.setItem('token', json.authtoken);
        navigate('/notes');
      // console.log(json); 
      
    }else{
      alert("Sorry a user with this email already exists"); 
      }
    } else {
      alert("Password should be match");
    }
  }


  return (
    <div>
      <div className='login'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="name" value={newUser.username} type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder='Name' minLength={3} required />
                </div>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="email" value={newUser.username} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Email address' minLength={3} required />
                </div>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="password" value={newUser.password} type="password" className="form-control" id="password" placeholder='Password' minLength={5} required autoComplete="false" />
                </div>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="cpassword" value={newUser.cpassword} type="password" className="form-control" id="cpassword" placeholder='Confirm Password' minLength={5} required />
                </div>
                {/* <button type="submit" style={{color: 'white'}}><HowToRegIcon /></button> */}
                <button type="submit"  class="btn btn-primary">submit</button>
            </form>
        </div>
    </div>
  )
}

export default Register;