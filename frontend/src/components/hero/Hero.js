import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import api from '../../api/axiosConfig';

const Hero = ({movies}) => {

    const navigate = useNavigate();

    function reviews(movieId)
    {
        navigate(`/Reviews/${movieId}`);
    }

    const addToWatchlist = async (movie) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            localStorage.setItem('returnUrl', window.location.pathname);
            navigate('/login');
            return;
        }

        try {
            await api.post('/api/v1/watchlist/add', {
                userId: currentUser.id || currentUser._id, 
                imdbId: movie.imdbId,
                title: movie.title,
                poster: movie.poster
            });
            alert('Added to watchlist successfully!');
        } catch (error) {
            if (error.response?.status === 400) {
                alert('Movie is already in your watchlist');
            } else {
                console.error('Error:', error);
                alert('Failed to add movie to watchlist');
            }
        }
    };

  return (
    <div className ='movie-carousel-container'>
      <Carousel>
        {
            movies?.map((movie) =>{
                return(
                    <Paper key={movie.imdbId}>
                        <div className = 'movie-card-container'>
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="" />
                                    </div>
                                    <div className="movie-title">
                                        <h3><b>{movie.title}</b></h3>
                                        <h6>{movie.releaseDate}</h6>
                                        <h6>Genre: {movie.genres.join(', ')}</h6>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon"
                                                    icon = {faCirclePlay}
                                                />
                                            </div>
                                        </Link>

                                        <div className="movie-review-button-container">
                                            <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                        </div>
                                        <div className="movie-review-button-container">
                                            <Button variant="info" onClick={() => addToWatchlist(movie)}>+Watchlist</Button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
            })
        }
      </Carousel>
    </div>
  )
}

export default Hero