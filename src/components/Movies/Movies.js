import './Movies.css';
import { getUserMovies } from '../../utils/MainApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCards from '../MoviesCards/MoviesCards'
import React from 'react';
import Preloader from '../Preloader/Preloader';

function Movies(props){

    function updateOwnedMoviesList(){
        return getUserMovies().then((res) => {
            props.setSavedMovies(res.data)});
    }

    React.useEffect(() => {
        switch(props.page){
            case 'search':
                props.setUnderlinedLink('movies');
                break;
            case 'saved':
                props.setUnderlinedLink('saved');
                break;
            default:
                break;
        }
        
    },[props.page]);

    return(
        <main className='movie-page'>
            <SearchForm searchMovies={props.searchMovies} page={props.page}/>
            {props.isPreloader ? <Preloader/> : 
            <MoviesCards page={props.page} movies={props.movies} searchMovies={props.searchMovies} savedMovies={props.savedMovies} shownSavedMovies={props.shownSavedMovies} setShownSavedMovies={props.setShownSavedMovies} updateSavedMovies={updateOwnedMoviesList} isFirstRequestDone={props.isFirstRequestDone} setIsFirstRequestDone={props.setIsFirstRequestDone}/>}
        </main>
    )
}

export default Movies;