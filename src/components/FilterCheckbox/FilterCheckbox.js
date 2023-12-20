import './FilterCheckbox.css';

function FilterCheckbox(){
    return(
        <label className='filter'>
            <input className='filter__input' type='checkbox'/>
            <span className='filter__switch-circle'></span>
        </label>
    )
}

export default FilterCheckbox;