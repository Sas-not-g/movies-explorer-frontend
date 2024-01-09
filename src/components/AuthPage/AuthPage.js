import './AuthPage.css';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage({ pageType, setIsAuthPage, isAuthorizedUser, setIsAuthorizedUser, setCurrentUser, handleLogin, handleRegister, serverAuthErrorMessage, setServerAuthErrorMessage}){

    const navigate = useNavigate();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [timeoutId, setTimeoutId] = React.useState('');
    const [emailStatus, setEmailStatus] = React.useState(false);
    const [nameStatus, setNameStatus] = React.useState(pageType === 'login' ? true : false);
    const [passwordStatus, setPasswordStatus] = React.useState(false);
    const [submitButtonStatus, setSubmitButtonStatus] = React.useState(false);

    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] =React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [isServerErrorShown, setIsServerErrorShown] = React.useState(false);

    const props = {
        name: name,
        email: email,
        password: password,
        setIsAuthPage:setIsAuthPage,
        validateInputs:validateInputs,
        nameError:nameError,
        emailError:emailError,
        passwordError:passwordError,
        submitButtonStatus:submitButtonStatus,
        leaveAuthPage:leaveAuthPage,
        resetForm:resetForm,
        serverAuthErrorMessage:serverAuthErrorMessage,
        isServerErrorShown:isServerErrorShown,
        setCurrentUser: setCurrentUser,
        handleLogin: handleLogin,
        handleRegister: handleRegister

    }

    function leaveAuthPage(){
        setIsAuthPage(false);
        setIsAuthorizedUser(true);
    }

    function setValue(name, value){
        switch(name) {
            case "name":
                setName(value);
              break;
            case "email":
                setEmail(value);
              break;
            case "password":
                setPassword(value);
                break
            default:
          }
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
        }, 550));
    }

    function resetForm(){
        setEmailStatus(false);
        setPasswordStatus(false);
        setSubmitButtonStatus(false);
        setNameError('')
        setPasswordError('')
        setEmailError('')
        setName('')
        setEmail('')
        setPassword('')
        setIsServerErrorShown(false);
        pageType !== 'login' ? setNameStatus(true) : setNameStatus(false)
        

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
        
        setValue(name, value);
        clearError(name);
        setServerAuthErrorMessage('');

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

    React.useEffect(() => {
        if (serverAuthErrorMessage){
            setSubmitButtonStatus(false);
            setIsServerErrorShown(true)
        }
    },[serverAuthErrorMessage])

    React.useEffect(() => {
        if (isAuthorizedUser){
            setIsAuthPage(false);
            navigate('/movies', {replace: true});
        }
    },[isAuthorizedUser])

    React.useEffect(() =>{
        (!emailStatus || !passwordStatus || !nameStatus || serverAuthErrorMessage) ? setSubmitButtonStatus(false) : setSubmitButtonStatus(true);
    },[emailStatus, passwordStatus, nameStatus, serverAuthErrorMessage]);

    if (pageType === 'login'){
        return(<Login props={props}/>)
    } else {
        return(<Registration props={props} />)
    }
}

export default AuthPage;