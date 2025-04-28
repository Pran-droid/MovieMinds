import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post("/api/v1/users/login", {
                email: email,
                password: password
            });

            localStorage.setItem('currentUser', JSON.stringify(response.data));

            // Check if there's a return URL
            const returnUrl = localStorage.getItem('returnUrl');
            if (returnUrl) {
                localStorage.removeItem('returnUrl');
                navigate(returnUrl);
            } else {
                navigate('/');
            }
        } catch (error) {
            alert('Invalid credentials!');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4" style={{ backgroundColor: '#2b2b2b', color: 'white' }}>
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>

                            <Button variant="info" type="submit" className="w-100" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                            <div className="text-center mt-3">
                                <span>Don't have an account? </span>
                                <Button variant="link" onClick={() => navigate('/register')} className="p-0">Register</Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;