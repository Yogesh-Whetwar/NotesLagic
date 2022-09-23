import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login'; 
const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser( prevValue => {
        return {
            ...prevValue,
            [name]: value
        }    
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: user.email, password: user.password})
    });
    const json = await response.json();
    console.log(json);
    console.log(json.success);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/notes');
    } else {
      alert("Please try to login with correct Credentials");
    }
  }


  return (
    <div>
      <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} autoComplete="off" >
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="email" value={user.username} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' minLength={3} required autocomplete="false"/>
                </div>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="password" value={user.password} type="password" className="form-control" id="exampleInputPassword1" placeholder='Create Password' minLength={5} required autocomplete="false"/>
                </div>
                <button type="submit"  class="btn btn-primary"><LoginIcon /></button>
            </form>
        </div>
    </div>
  )
}

export default Login;