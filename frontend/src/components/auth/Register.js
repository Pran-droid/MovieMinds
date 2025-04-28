import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import './Auth.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            setIsLoading(false);
            return;
        }

        try {
            await api.post("/api/v1/users/register", {
                username,
                email,
                password
            });
            navigate('/login');
        } catch (error) {
            if (error.response?.data) {
                alert(error.response.data);
            } else {
                alert('Registration failed. Please try again.');
            }
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4" style={{ backgroundColor: '#2b2b2b', color: 'white' }}>
                        <h2 className="text-center mb-4">Register</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    required
                                />
                            </Form.Group>

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

                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                />
                            </Form.Group>

                            <Button variant="info" type="submit" className="w-100" disabled={isLoading}>
                                {isLoading ? 'Registering...' : 'Register'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;