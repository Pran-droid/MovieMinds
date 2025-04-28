import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import './Reviews.css';

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const navigate = useNavigate();

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            localStorage.setItem('returnUrl', window.location.pathname);
            navigate('/login');
            return;
        }

        const rev = revText.current;

        // Add validation for empty review
        if (!rev.value.trim()) {
            alert('Please write a review before submitting');
            return;
        }

        try {
            const response = await api.post("/api/v1/reviews", {
                reviewBody: rev.value.trim(),
                imdbId: movieId,
                username: currentUser.username,
                date: new Date().toLocaleString()
            });

            const updatedReviews = [{
                body: rev.value.trim(),
                username: currentUser.username,
                date: new Date().toLocaleString()
            }];
    
            rev.value = "";
            setReviews(updatedReviews);
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        movie?.reviewIds.map((review, index) => {
                            return(
                                <div key={index} className="review-card mb-3">
                                    <div className="review-header">
                                        <strong>{review.username || 'Anonymous'}</strong>
                                        <small>{review.date || 'No date'}</small>
                                    </div>
                                    <div className="review-body">
                                        {review.body}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        reviews?.map((review, index) => {
                            return(
                                <div key={index} className="review-card mb-3">
                                    <div className="review-header">
                                        <strong>{review.username || 'Anonymous'}</strong>
                                        <small>{review.date || 'No date'}</small>
                                    </div>
                                    <div className="review-body">
                                        {review.body}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews