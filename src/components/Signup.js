import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
    let navigate= useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const handleSubmit = async(e)=>{
        e.preventDefault();
      const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully","success")
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
            <h2>Create an account to use  iNotebook</h2>
            <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" value={credentials.name} className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} className="form-control" onChange={onChange} id="password" name="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">confirm Password</label>
                    <input type="password" value={credentials.cpassword} className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
