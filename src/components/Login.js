
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
let navigate= useNavigate();
const [credentials, setCredentials] = useState({email:"",password:""});


    const handleSubmit = async(e)=>{
            e.preventDefault();
          
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:credentials.email,password:credentials.password})
              });
              const json = await response.json();
              console.log(json);
              if(json.success){
                //save the authtoken and redirect
                localStorage.setItem('token',json.authtoken);
               
                props.showAlert("Logged in Successfully","success");
                navigate("/");
              }
              else{
                props.showAlert("invalid credentials","danger");
              }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className='mt-3'>
            <h2>Login to continue iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login
