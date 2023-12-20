import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';


function Login({props}){

    React.useEffect(() => {
        props.setIsAuthPage(true);
    }, [])

    return(
        <main className='auth-page'>
            <h1 className='auth-page__header'>Рады видеть!</h1>
            <form className='auth-page__form'>
                <div className='auth-page__form-inputs_login'>
                    <div className='auth-page__input-container'>
                        <p className='auth-page__input-name'>E-mail</p>
                        <input className={props.emailError ? 'auth-page__input auth-page__input_wrong' : 'auth-page__input'} onChange={props.validateInputs} onBlur={props.toggleSubmitButton} type="email" name="email" placeholder='movie-explorer@email.com'/>
                        <span className='auth-page__input-error'>{props.emailError}</span>
                    </div>
                    <div className='auth-page__input-container'>
                        <p className='auth-page__input-name'>Пароль</p>
                        <input className={props.passwordError ? 'auth-page__input auth-page__input_wrong' : 'auth-page__input'} onChange={props.validateInputs} onBlur={props.toggleSubmitButton} type="password" name="password" placeholder='Пароль'/>
                        <span className='auth-page__input-error'>{props.passwordError}</span>
                    </div>
                </div>
                <p className={props.isServerErrorShown ? 'auth-page__submit-error' : 'auth-page__submit-error auth-page__submit-error_invisible'}>Ой. Серверная ошибка</p>
                <button className='auth-page__submit-button' type='submit' onClick={props.leaveAuthPage} disabled={!props.submitButtonStatus}>Войти</button>
            </form>
            <p className='auth-page__switch-auth'>Ещё не зарегистрированы? <Link className='auth-page__switch-auth-link' to='/signup' onClick={props.resetForm} >Регистрация</Link></p>
        </main>
    )
}

export default Login;