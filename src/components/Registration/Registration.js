import React from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

function Registration({props}){

    React.useEffect(() => {
        props.setIsAuthPage(true);
    }, [])

    return(
        <main className='auth-page'>
            <h1 className='auth-page__header'>Добро пожаловать!</h1>
            <form className='auth-page__form'>
                <div className='auth-page__form-inputs_register'>
                    <div className='auth-page__input-container'>
                        <p className='auth-page__input-name'>Имя</p>
                        <input className={props.nameError ? 'auth-page__input auth-page__input_wrong' : 'auth-page__input'} onChange={props.validateInputs} type="text" name="name" placeholder='Имя'/>
                        <span className='auth-page__input-error name-error'>{props.nameError}</span>
                    </div>
                    <div className='auth-page__input-container'>
                        <p className='auth-page__input-name'>E-mail</p>
                        <input className={props.emailError ? 'auth-page__input auth-page__input_wrong' : 'auth-page__input'} onChange={props.validateInputs} type="text" name="email" placeholder='movie-explorer@email.com'/>
                        <span className='auth-page__input-error email-error'>{props.emailError}</span>
                    </div>
                    <div className='auth-page__input-container'>
                        <p className='auth-page__input-name'>Пароль</p>
                        <input className={props.passwordError ? 'auth-page__input auth-page__input_wrong' : 'auth-page__input'} onChange={props.validateInputs} type="password" name="password" placeholder='Пароль'/>
                        <span className='auth-page__input-error email-error'>{props.passwordError}</span>
                    </div>
                </div>
                <p className={props.isServerErrorShown ? 'auth-page__submit-error' : 'auth-page__submit-error auth-page__submit-error_invisible'}>Ой. Серверная ошибка</p>
                <button className='auth-page__submit-button' disabled={!props.submitButtonStatus} onClick={props.leaveAuthPage} type='submit'>Зарегистрироваться</button>
            </form>
            <p className='auth-page__switch-auth'>Уже зарегистрированы? <Link className='auth-page__switch-auth-link' to='/signin' onClick={props.resetForm}>Войти</Link></p>
        </main>
    )
}

export default Registration;
