import './MoviesCards.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCards(props){

    const [cardsToLoad, setCardsToLoad] = React.useState(12);
    const [cardsToAdd, setCardsToAdd] = React.useState(3);
    const [currentCard, setCurrentCard] = React.useState(12);
    const [cardsToRender, setCardsToRender] = React.useState([]);



    function handleReRender(){
        if (props.page === 'search'){
            renderCards(cardsToLoad);
        } else if( props.page === 'saved'){
            renderSavedCards();
        }
    }

    function checkScreenWidth(){
        const screenWidth = window.screen.width;

        if (screenWidth >= 990){
            setCardsToLoad(12);
            setCardsToAdd(3);
        } else if (screenWidth >= 630 && screenWidth < 990) {
            setCardsToLoad(8);
            setCardsToAdd(2);
        } else if (screenWidth < 630) {
            setCardsToLoad(5);
            setCardsToAdd(2);
        } 
    }

    function renderCards(cntCards){
        if (props.isFirstRequestDone === false && !JSON.parse(localStorage.getItem('foundMovies'))){
            setCardsToRender([]);
        } else {

            let countOfCards = 0;
            const newCardsToRender = props.movies.map(movie => {
                countOfCards+=1;
                if (countOfCards > cntCards){
                    return '';
                }
                setCurrentCard(countOfCards);
                return (<MoviesCard key={movie.id} movie={movie} page={props.page} isSavedPage={false} savedMovies={props.savedMovies} updateSavedMovies={props.updateSavedMovies}/>)
            })

            setCardsToRender(newCardsToRender);
        }
    }

    function renderSavedCards(){
        const savedList = props.shownSavedMovies ? props.shownSavedMovies : props.savedMovies;
        const newCardsToRender = savedList.map(savedMovie => {
            return(<MoviesCard key={savedMovie.movieId} movie={savedMovie} page={props.page} isSavedPage={true} updateSavedMovies={props.updateSavedMovies}/>)
        })

        setCardsToRender(newCardsToRender);
    }

    function renderMoreCards(){
        renderCards(currentCard + cardsToAdd);
    }

    function handleResize(){
        setTimeout(checkScreenWidth, 1000);
    }

    React.useEffect(() => {
        checkScreenWidth();
    }, [])

    React.useEffect(() => {
        props.setShownSavedMovies(false);
    }, [props.page]);

    React.useEffect(() => {
        if (props.page==='saved'){
            handleReRender()
        }
    }, [props.savedMovies, props.movies, props.page, props.shownSavedMovies])

    React.useEffect(() => {
        if (!props.savedMovies || props.isFirstRequestDone === false){
            props.updateSavedMovies().then(() => {
                handleReRender()    
            })
        } else {
            handleReRender()
        }
    }, [props.page, props.movies])

    window.onresize = handleResize;
    

    return(
        <section className='movies__wrapper'>

            {cardsToRender.length > 0
            ?
                <ul className={props.page === 'saved' ? 'movies__grid movies__grid_saved' : 'movies__grid'}>
                    {cardsToRender}
                </ul> 
            :   
                <p className="movies__not-found">Ой. Тут ничего нет :/ </p>
            }

            {(props.page ==='search' && props.movies.length > currentCard)? <button className='movies__more-button' onClick={renderMoreCards}>Ещё</button> : null}
        </section>
    )
}

export default MoviesCards;