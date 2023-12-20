import './Movies.css';
import films from '../../utils/films';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCards from '../MoviesCards/MoviesCards'

function Movies(props){
    return(
        <main className='movie-page'>
            <SearchForm/>
            <MoviesCards films={films} page={props.page}/>
        </main>
    )
}

export default Movies;