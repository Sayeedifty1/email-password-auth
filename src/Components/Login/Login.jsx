import React, { useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import './Login.css'; // Import custom styles
const auth = getAuth(app);
import '@fortawesome/fontawesome-free/css/all.min.css';


const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef();

    const handleLogIn = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        setError('');
        setSuccess('');
        // Validation
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please add at least one uppercase letter');
            return;
        }
        else if (!/(?=.*?[0-9].*[0-9])/.test(password)) {
            setError('Please add at least two numbers');
            return;
        }
        else if (password.length < 6) {
            setError('Please add at least 6 characters to your password');
            return;
        }
        setSuccess('Login successful!');

        // sign in auth
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                setSuccess('User login successful!')
                if (!loggedUser.emailVerified) {
                    alert('Please verify your email first');
                    return;
                }
            })

            .catch(error => {
                setError(error.message);
            })
    }

    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide an email to reset your password')
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email to reset your password')
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} sm={9} xs={12}>
                    <h1 className='text-center mb-4'>Please Login</h1>
                    <Form onSubmit={handleLogIn} className="login-form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" ref={emailRef} placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <div className="password-field">
                                <Form.Control type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required />
                                <i onClick={toggleShowPassword} className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`} />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>

                        {error && <p className='text-danger'>{error}</p>}
                        {success && <p className='text-success'>{success}</p>}

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                    <p><small>Forgot Password? <button onClick={handleResetPassword} className='btn btn-link'>reset now</button></small></p>
                    <p><small>new to this website? please <Link to="/register">Register</Link></small></p>
                </Col>
            </Row>

        </Container >
    );
};

export default Login;
