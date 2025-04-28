import React, { useState, useEffect } from 'react';
import './Watchlist.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/login');
            return;
        }
        loadUserWatchlist(currentUser.id);
    }, []);

    const loadUserWatchlist = async (userId) => {
        try {
            const response = await api.get(`/api/v1/watchlist/${userId}`);
            setWatchlist(response.data);
        } catch (error) {
            console.error('Error loading watchlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromWatchlist = async (movieId) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        try {
            await api.delete(`/api/v1/watchlist/${currentUser.id}/${movieId}`);
            setWatchlist(watchlist.filter(movie => movie.imdbId !== movieId));
        } catch (error) {
            console.error('Error removing from watchlist:', error);
        }
    };

    if (isLoading) {
        return <div className="text-center text-white mt-5">Loading...</div>;
    }

    return (
        <Container className="watchlist-container">
            <h2 className="text-white mt-4 mb-4">My Watchlist</h2>
            <Row>
                {watchlist.length === 0 ? (
                    <Col>
                        <p className="text-white text-center">Your watchlist is empty</p>
                    </Col>
                ) : (
                    watchlist.map((movie) => (
                        <Col key={movie.imdbId} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="h-100 bg-dark text-white">
                                <Card.Img variant="top" src={movie.poster} alt={movie.title} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => removeFromWatchlist(movie.imdbId)}
                                    >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default Watchlist;