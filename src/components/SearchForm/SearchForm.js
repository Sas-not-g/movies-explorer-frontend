import './SearchForm.css';
import submitImage from '../../images/movie-submit.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm(){
    return(
        <section className='form__wrapper'>
            <form className='form__search'>
                <div className='form__input-section'>
                    <input className='form__search-input' placeholder='Фильм' required/>
                    <button className='form__submit-button' type='submit' onClick={(e) => e.preventDefault()}>
                        <img src={submitImage} alt='submit-button'/>
                    </button>
                </div>
                <div className='form__filter'>
                    <FilterCheckbox/>
                    <p className='form__checkbox-caption'>Короткометражки</p>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;