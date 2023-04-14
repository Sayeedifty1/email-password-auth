import React, { useState } from 'react';
import app from '../../firebase/firebase.config'
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';


const auth = getAuth(app);

const Register = () => {
    // const [email, setEmail] = useState('');
    // const [password , setPassword] = useState('');
    const [error , setError] = useState("");
    const [success , setSuccess] = useState("")

    const handleSubmit = (event) =>{
        event.preventDefault()
        const email =event.target.email.value;
        const password = event.target.password.value;
        console.log(email , password)
        //  create user with email and password
        createUserWithEmailAndPassword(auth , email , password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset()
            setSuccess ("User created Successfully");
        })
        .catch(error=>{
            console.log(error.message);
            setError(error.message);
            setSuccess('');
        })
    }

    const handleEmailChange = (event)=>{
        // console.log(event.target.value);
        // setEmail(event.target.value);
    }
    const handlePasswordBlur = (event) =>{
        // console.log(event.target.value);
    }
    return (
        <div className='mx-auto w-50'>
            <h4>Please Register</h4>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4' onChange={handleEmailChange} type="email" name="email" id="email;" placeholder='Your email' required /> <br />
                <input className='w-50 mb-4' onBlur={handlePasswordBlur} type="password" name="password" id="password;" placeholder='Your Password' required /> <br />
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <input type="submit" value="Register" />
            </form>
            
        </div>
    );
};

export default Register;