import './MoviesCard.css'
import savedIcon from '../../images/save-icon.svg';
import removeIcon from '../../images/removeIcon.svg'
import React from 'react';
import { addMovie, removeMovie, getUserMovies } from '../../utils/MainApi.js';

const beatfilmsBaseUrl = 'https://api.nomoreparties.co';

function MoviesCard({movie, page, isSavedPage, savedMovies, updateSavedMovies}){
    const [isLiked, setIsLiked] = React.useState(false);
    const [filmDatabaseId, setFilmDatabaseId] = React.useState('') 
    const lengthHours = `${Math.floor(movie.duration / 60)}h `;
    const lengthMinutes = `${movie.duration % 60}m`;
    const imageUrl = isSavedPage ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`;

    function handleSaveMovie(){
        addMovie(
            movie.country,
            movie.director,
            movie.duration,
            movie.year,movie.description,
            beatfilmsBaseUrl + movie.image.url,
            movie.trailerLink,
            movie.nameRU,
            movie.nameEN,
            beatfilmsBaseUrl + movie.image.formats.thumbnail.url,
            movie.id
            ).then((res) => {
                setFilmDatabaseId(res.movie._id);
                updateSavedMovies();
            })
    }

    function handleDeleteMovie(id){
        removeMovie(id).then((res) => {
            updateSavedMovies();
            
        });
    }

    function findMovieToDelete(){
        if (filmDatabaseId){
            handleDeleteMovie(filmDatabaseId)
        } else {
            savedMovies.forEach(savedMovie => {
                if (savedMovie.movieId === movie.id){
                handleDeleteMovie(savedMovie._id)
            }})
        }
    }

    function toggleState(){
        isLiked ? findMovieToDelete() : handleSaveMovie();
        setIsLiked(!isLiked);
    }

    React.useEffect(() => {
        if (page === 'search'){
            savedMovies.some((savedMovie) => savedMovie.movieId === movie.id ) ? setIsLiked(true) : setIsLiked(false);
        }
        
    },[movie]);

    function pageAdapt(){
        if (page === "search"){
            return (
                    <button type='button' className={isLiked ? 'movies__card-saved' :'movies__card-save'} onClick={toggleState}>{isLiked ? <img src={savedIcon} alt='savedIcon'/> : 'Сохранить'}</button>
            )
        } else if (page === "saved"){
            return(
                <button className="movies__card-remove" type='button' onClick={() => handleDeleteMovie(movie._id)}>
                    <img src={removeIcon} alt='removeIcon'/>
                </button>
            )
        }
    }

    return(
        <li className="movies__card">
            {pageAdapt()}
            <a href={movie.trailerLink} target='_blank' rel="noreferrer"><img className="movies__film-preview" src={imageUrl} alt={movie.nameRU} /></a>
            <div className="movies__description-bar">
                <h2 className="movies__movie-title">{movie.nameRU}</h2>
                <p className='movies__movie-lenght'>{lengthHours + lengthMinutes}</p>
            </div>
        </li>
    )
}

export default MoviesCard;