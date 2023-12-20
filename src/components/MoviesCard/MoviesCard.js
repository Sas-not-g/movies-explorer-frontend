import './MoviesCard.css'
import image from '../../images/movie.png';
import savedIcon from '../../images/save-icon.svg';
import removeIcon from '../../images/removeIcon.svg'
import React from 'react';

function MoviesCard(props){
    const [isLiked, setIsLiked] = React.useState(false);
    const lengthHours = `${Math.floor(props.lenght / 60)}h `;
    const lengthMinutes = `${props.lenght % 60}m`;
    function toggleState(){
        setIsLiked(!isLiked);
    }

    function pageAdapt(){
        if (props.page === "search"){
            return (
                <>
                    {!isLiked && <button className="movies__card-save" onClick={toggleState}>Сохранить</button>}
                    {isLiked && <button type='button' className="movies__card-saved" onClick={toggleState}>
                        <img src={savedIcon} alt='savedIcon'/>
                    </button>}
                </>
            )
        } else if (props.page === "saved"){
            return(
                <button className="movies__card-remove" type='button'>
                    <img src={removeIcon} alt='removeIcon'/>
                </button>
            )
        }
    }

    return(
        <li className="movies__card">
            {pageAdapt()}
            <img className="movies__film-preview" src={image} alt={props.alt} />
            <div className="movies__description-bar">
                <h2 className="movies__movie-title">{props.name}</h2>
                <p className='movies__movie-lenght'>{lengthHours + lengthMinutes}</p>
            </div>
        </li>
    )
}

export default MoviesCard;