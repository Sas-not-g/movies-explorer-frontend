import './SearchForm.css';
import React from 'react';
import submitImage from '../../images/movie-submit.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm({searchMovies, page}){

    const [formValue, setFormValue] = React.useState('');
    const [isShort, setIsShort] = React.useState(false);
    const [isResultShown, setIsResultShown] = React.useState(false);

    function handleChange(e){
        setFormValue(e.target.value);
    }

    function handleSubmit(e){
        if (e){e.preventDefault()}
        searchMovies(formValue, isShort, page);
        setIsResultShown(true);
        if (page === 'search'){
            localStorage.setItem('request', formValue);
            localStorage.setItem('isShort', isShort);
        }
    }

    React.useEffect(() => {
        setIsResultShown(false);
    },[formValue])

    React.useEffect(()=>{
        if (isResultShown){
            handleSubmit()
        }
    },[isShort])

    React.useEffect(() => {
        if (page === 'search'){
            const preloadedRequest = localStorage.getItem('request');
            const preloadedIsShort = localStorage.getItem('isShort');
            if (preloadedRequest && preloadedIsShort && page === 'search'){
                setFormValue(preloadedRequest);
                setIsShort(preloadedIsShort === 'true' ? true : false);
            }
        } else if (page === 'saved'){
            setFormValue('');
            setIsShort(false);
        }


    }, [page])

    return(
        <section className='form__wrapper'>
            <form className='form__search' onSubmit={handleSubmit}>
                <div className='form__input-section'>
                    <input className='form__search-input' placeholder='Фильм' onChange={handleChange} value={formValue || ''} required/>
                    <button className='form__submit-button' type='submit'>
                        <img src={submitImage} alt='submit-button'/>
                    </button>
                </div>
                <div className='form__filter'>
                    <FilterCheckbox isShort={isShort} setIsShort={setIsShort}/>
                    <p className='form__checkbox-caption'>Короткометражки</p>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;