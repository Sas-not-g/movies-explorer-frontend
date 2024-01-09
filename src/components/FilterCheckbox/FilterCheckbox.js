import './FilterCheckbox.css';

function FilterCheckbox({isShort, setIsShort}){

    function handleChange(e){
        setIsShort(e.target.checked);
    }

    return(
        <label className='filter'>
            <input className='filter__input' onChange={handleChange} checked={isShort || false} type='checkbox'/>
            <span className='filter__switch-circle'></span>
        </label>
    )
}

export default FilterCheckbox;