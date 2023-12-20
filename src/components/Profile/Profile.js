import './Profile.css';
import React from 'react';
import AccountTools from '../AccountTools/AccountTools';

function Profile({name, email, setIsProfilePage, setIsAuthorizedUser}){

    const [fieldMode, setFieldMode] = React.useState(true);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [userName, setUserName] = React.useState(name)
    const [newUserName, setNewUserName] = React.useState(name);
    const [userEmail, setUserEmail] = React.useState(email || 'email@email.com')
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true)
    const [formError, setFormError] = React.useState('');
    const [isErrorShown, setIsErrorShown] = React.useState(false)


    function handleSubmit(e){
        e.preventDefault();
        toggleEdit(false);
        setUserName(newUserName);
    }

    function toggleEdit(edit){
        setIsEditMode(edit);
        setFieldMode(!edit);
        setIsSubmitDisabled(!edit);
    }

    function setError(error){
        if (error){
            setIsSubmitDisabled(true);
            setIsErrorShown(true);
        } else {
            setIsSubmitDisabled(false);
            setIsErrorShown(false);
        }
        setFormError(error)
    }

    function handleInputChange(e){
        e.target.name === 'name' ? setNewUserName(e.target.value) : setUserEmail(e.target.value);
        (e.target.name ==='name' && (e.target.value.length > 15 || e.target.value.length <= 1)) ? setError('Имя должно быть больше 2 и меньше 16 символов') : setError();
    }

    React.useEffect(() => {
        setIsProfilePage(true);
    })

    return(
        <main className='profile'>
            <h1 className='profile__greeting'>Привет, {userName || 'user'}!</h1>
            <form className='profile__form' onSubmit={handleSubmit}>
                <fieldset className='profile__form-field' disabled={fieldMode}>
                    <div className='profile__input-row'>
                        <p className='profile__input-name'>Имя</p>
                        <input name='name' className='profile__input' placeholder='Имя' onChange={handleInputChange} value={newUserName || ''} />
                    </div>
                    <div className='profile__input-row'>
                        <p className='profile__input-name'>Email</p>
                        <input name='email' className='profile__input' placeholder='Email' onChange={handleInputChange} value={userEmail || ''}/>
                    </div>
                </fieldset>
                <p className={isErrorShown ? 'profile__submit-error' : 'profile__submit-error profile__submit-error_invisible'}>{formError}</p>
                <button 
                    className={isEditMode ? 'profile__form-submit-button' : 'profile__form-submit-button profile__form-submit-button_invisible'} 
                    type="submit" 
                    disabled={isSubmitDisabled || false}>
                    Сохранить
                </button>
            </form>
            <AccountTools isEditMode={isEditMode} toggleEdit={toggleEdit} setIsProfilePage={setIsProfilePage} setIsAuthorizedUser={setIsAuthorizedUser}/>
        </main>
    )
}


export default Profile;