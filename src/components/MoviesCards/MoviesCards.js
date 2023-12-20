import './MoviesCards.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCards(props){
    let keyV = 1;
    return(
        <section className='movies__wrapper'>
            <ul className={props.page === 'saved' ? 'movies__grid movies__grid_saved' : 'movies__grid'}>
                {props.films.map(film => {
                    keyV +=1;
                    return (<MoviesCard key={keyV} name={film.name} lenght={film.length} img ={film.img} page={props.page} alt={film.alt}/>)
                })}
            </ul>
            {props.page === "search" ? <button className='movies__more-button'>Ещё</button> : null}
        </section>
    )
}

export default MoviesCards;