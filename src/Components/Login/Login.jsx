import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
            setError('please add at least one uppercase');
            return;
        }
        else if (!/(?=.*?[0-9].*[0-9])/.test(password)) {
            setError('Please add at least two numbers');
            return;
        }
        else if (password.length < 6) {
            setError('please add at least 6 characters in your password ');
            return;
        }
        setSuccess('Login successful!');

        // sign in auth
        signInWithEmailAndPassword(auth , email, password)
        .then(result =>{
            const loggedUser = result.user;
            setSuccess('user login successfully')
        })

        .catch (error =>{
            setError(error.message);
        })
    }
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} sm={9} xs={12}>
                    <h1 className='text-warning mb-4'>Please Login</h1>
                    <Form onSubmit={handleLogIn}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" required />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        {error && <p className='text-danger'>{error}</p>}
                        {success && <p className='text-success'>{success}</p>}
                        <Button variant="primary" type="Login">
                            Login
                        </Button>
                    </Form>
                    <p><small>new to this website? please <Link to="/register">Register</Link></small></p>
                </Col>
            </Row>
           
        </Container>
    );
};

export default Login;
