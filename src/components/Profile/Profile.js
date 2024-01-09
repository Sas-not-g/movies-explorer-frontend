import './Profile.css';
import React from 'react';
import AccountTools from '../AccountTools/AccountTools';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { patchUserData } from '../../utils/MainApi.js';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

function Profile({setIsProfilePage, setIsAuthorizedUser, setCurrentUser, setUnderlinedLink, setSavedMovies, setIsFirstRequestDone}){

    const [timeoutId, setTimeoutId] = React.useState('');
    const [fieldMode, setFieldMode] = React.useState(true);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [userName, setUserName] = React.useState('')
    const [newUserName, setNewUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [newUserEmail, setNewUserEmail] = React.useState('');

    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);

    const [formError, setFormError] = React.useState('');
    const [isNotificationShown, setIsNotificationShown] = React.useState(false)
    const [isErrorShown, setIsErrorShown] = React.useState(false);

    const [serverProfileErrorMessage, setServerProfileErrorMessage] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e){
        e.preventDefault();
        patchUserData(newUserName,newUserEmail).then((res) =>{
            setIsNotificationShown(true);
            setTimeout(() =>{
                setIsNotificationShown(false)
                toggleEdit(false)
            }, 5000);
            setCurrentUser({name:res.name, email: res.email, _id: res._id});
            localStorage.setItem('user', JSON.stringify({name:res.name, email: res.email, _id: res._id}))
            setUserName(newUserName);
            setUserEmail(newUserEmail)
        }).catch((err) => {
           
            if (err.includes('409')){
                setFormError('Пользователь с таким email уже существует');
                setIsSubmitDisabled(true);
                setIsErrorShown(true);
            } else if (err.includes('400')){
                setFormError('Введены некорректные данные');
                setIsSubmitDisabled(true);
                setIsErrorShown(true);
            }
        })
        
    }

    function toggleEdit(edit){
        setIsEditMode(edit);
        setFieldMode(!edit);
        setIsSubmitDisabled(!edit);
    }

    function handleInputChange(e){
        setIsSubmitDisabled(false);
        switch(e.target.name){
            case 'name':
                setNewUserName(e.target.value);
                (e.target.value.length > 15 || e.target.value.length <= 1) ? setNameError('Имя должно быть больше 2 и меньше 16 символов') : setNameError('');
                break;
            case 'email':
                setNewUserEmail(e.target.value);
                e.target.value.match(emailRegex) ? setEmailError('') : setEmailError('Некорректный email');
                break;
            default:
                break;

        }
    }


    React.useEffect(() => {
        if (nameError){
            setIsSubmitDisabled(true);
            setIsErrorShown(true);
            setFormError(nameError)
        } else if (emailError){
            setIsSubmitDisabled(true);
            setIsErrorShown(true);
            setFormError(emailError);
        } else {
            setIsSubmitDisabled(false);
            setIsErrorShown(false);
            setFormError('')
        }
    },[nameError, emailError, newUserName, newUserEmail])

    React.useEffect(() => {
        if (newUserName === userName && newUserEmail === userEmail){
            setIsSubmitDisabled(true);
        }
    },[newUserEmail, newUserName])

    React.useEffect(() => {
        setIsProfilePage(true);
        setUnderlinedLink('profile');
        setUserName(currentUser.name);
        setNewUserName(currentUser.name);
        setUserEmail(currentUser.email);
        setNewUserEmail(currentUser.email);
    },[])

    return(
        <main className='profile'>
            <h1 className='profile__greeting'>Привет, {userName}!</h1>
            <form className='profile__form' onSubmit={handleSubmit}>
                <fieldset className='profile__form-field' disabled={fieldMode}>
                    <div className='profile__input-row'>
                        <p className='profile__input-name'>Имя</p>
                        <input name='name' className='profile__input' placeholder='Имя' onChange={handleInputChange} value={newUserName || ''} />
                    </div>
                    <div className='profile__input-row'>
                        <p className='profile__input-name'>Email</p>
                        <input name='email' className='profile__input' placeholder='Email' onChange={handleInputChange} value={newUserEmail || ''}/>
                    </div>
                </fieldset>
                <p className={isErrorShown ? 'profile__submit-error' : 'profile__submit-error profile__submit-error_invisible'}>{formError}</p>
                {isNotificationShown ? <p className='profile__submit-notification'>Изменения применены</p> : ''}
                <button 
                    className={isEditMode ? 'profile__form-submit-button' : 'profile__form-submit-button profile__form-submit-button_invisible'} 
                    type="submit" 
                    disabled={isSubmitDisabled || false}>
                    Сохранить
                </button>
            </form>
            <AccountTools isEditMode={isEditMode} toggleEdit={toggleEdit} setIsProfilePage={setIsProfilePage} setIsAuthorizedUser={setIsAuthorizedUser} setSavedMovies={setSavedMovies} setIsFirstRequestDone={setIsFirstRequestDone}/>
        </main>
    )
}


export default Profile;