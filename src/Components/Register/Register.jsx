import React, { useState } from 'react';
import app from '../../firebase/firebase.config'
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth';
import { Link } from 'react-router-dom';


const auth = getAuth(app);

const Register = () => {
    // const [email, setEmail] = useState('');
    // const [password , setPassword] = useState('');
    const [error , setError] = useState("");
    const [success , setSuccess] = useState("")

    const handleSubmit = (event) =>{
        // 1. prevent page refresh
        event.preventDefault()
        setSuccess('');
        setError('');
        // collect form data
        const name = event.target.name.value;
        const email =event.target.email.value;
        const password = event.target.password.value;
        console.log(email , password)
        // Validate
        if(!/(?=.*[A-Z])/.test(password)){
            setError('please add at least one uppercase');
            return;
        }
        else if (!/(?=.*?[0-9].*[0-9])/.test(password)){
            setError('Please add at least two numbers');
            return;
        }
        else if (password.length<6){
            setError('please add at least 6 characters in your password ');
            return ;
        }
        //  create user with email and password
        createUserWithEmailAndPassword(auth , email , password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset()
            setSuccess ("User created Successfully");
            sendVerificationEmail(result.user);
            updateUserData(result.user ,name)
        })
        .catch(error=>{
            console.log(error.message);
            setError(error.message);
            
        })
    }

    const sendVerificationEmail = (user) =>{
        sendEmailVerification(user)
        .then(result => {
            console.log(result)
        alert('verify your email')
        }) 
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
          displayName: name
        })
        .then(() => {
          console.log('user name updated')
        })
        .catch(error => {
          setError(error.message)
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
                <input className='w-50 mb-4'  type="text" name="name" id="name;" placeholder='Your Name' required /> <br />
                <input className='w-50 mb-4' onChange={handleEmailChange} type="email" name="email" id="email;" placeholder='Your email' required /> <br />
                <input className='w-50 mb-4' onBlur={handlePasswordBlur} type="password" name="password" id="password;" placeholder='Your Password' required /> <br />
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <input type="submit" value="Register" />
            </form>
            <p><small>Already have an Account? please <Link to="/login">Log in</Link></small></p>
        </div>
    );
};

export default Register;