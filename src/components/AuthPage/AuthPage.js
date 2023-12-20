import './AuthPage.css';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage({ pageType, setIsAuthPage, setIsAuthorizedUser }){

    const navigate = useNavigate();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const [timeoutId, setTimeoutId] = React.useState('');
    const [emailStatus, setEmailStatus] = React.useState(false);
    const [nameStatus, setNameStatus] = React.useState(pageType === 'login' ? true : false);
    const [passwordStatus, setPasswordStatus] = React.useState(false);
    const [submitButtonStatus, setSubmitButtonStatus] = React.useState(false);

    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] =React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [isServerErrorShown, setIsServerErrorShown] = React.useState(false)

    const props = {
        setIsAuthPage:setIsAuthPage,
        validateInputs:validateInputs,
        nameError:nameError,
        emailError:emailError,
        passwordError:passwordError,
        submitButtonStatus:submitButtonStatus,
        leaveAuthPage:leaveAuthPage,
        resetForm:resetForm,
        isServerErrorShown:isServerErrorShown
    }

    function leaveAuthPage(e){
        e.preventDefault();
        navigate('/', {replace: true});
        setIsAuthPage(false);
        setIsAuthorizedUser(true);
    }

    function displayError(name, msg){
        clearTimeout(timeoutId);
        setTimeoutId(setTimeout(() => {
            if (name === 'email'){
                setEmailError(msg);
            } else if(name === 'password') {
                setPasswordError(msg);
            } else {
                setNameError(msg);
            }
            setIsServerErrorShown(true);
        }, 550));
    }

    function resetForm(){
        setEmailStatus(false);
        setPasswordStatus(false);
        setSubmitButtonStatus(false);
        if (pageType !== 'login'){
            setNameStatus(true);
        } else {
            setNameStatus(false);
        }

    }

    function clearError(name){
        if (name === 'email'){
            setEmailError('');
        } else if(name === 'password') {
            setPasswordError('');
        } else {
            setNameError('');
        }
    }

    function validateInputs(e){
        const element = e.target;
        const value = element.value;
        const name = element.name;

        clearError(name);

        if (value === ''){
            displayError(name, 'Это обязательное поле');
            return
        }

        if (name === 'email'){
          const error = !value.match(emailRegex) ? 'Некорректный email': '';
          error ? setEmailStatus(false) : setEmailStatus(true);
          displayError(name, error);
        }

        if (name === 'password'){
            const error = (value.length > 15 || value.length < 3) ? 'Пароль должен быть больше 2 и меньше 16 символов длиной' : '';
            error ? setPasswordStatus(false) : setPasswordStatus(true);
            displayError(name,error);
        }

        if (name === 'name'){
            const error = (value.length > 15 || value.length < 3) ? 'Имя должно быть больше 2 и меньше 16 символов длиной' : '';
            error ? setNameStatus(false) : setNameStatus(true);
            displayError(name,error);
        }
    }

    React.useEffect(() =>{
        (!emailStatus || !passwordStatus || !nameStatus) ? setSubmitButtonStatus(false) : setSubmitButtonStatus(true);
    },[emailStatus, passwordStatus, nameStatus]);

    if (pageType === 'login'){
        return(<Login props={props}/>)
    } else {
        return(<Registration props={props} />)
    }
}

export default AuthPage;