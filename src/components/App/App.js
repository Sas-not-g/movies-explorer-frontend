import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Profile from '../Profile/Profile.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';

function App(){

    const [isAuthPage, setIsAuthPage] = React.useState(false);
    const [isProfilePage, setIsProfilePage] = React.useState(false);
    const [isAuthorizedUser, setIsAuthorizedUser] = React.useState(false);
    const [userName, setUserName] = React.useState('me');
    const [userEmail, setUserEmail] = React.useState('myemail@mail.ru');
    const [underlinedLink, setUnderlinedLink] = React.useState('main');
    const [notFound, setNotFound] = React.useState(false);

    const [isMenuOpened, setIsMenuOpened] = React.useState(false);

    function toggleMenu(){
        setIsMenuOpened(() => !isMenuOpened);
    }

return(
    <div className='root'>
        <Header isAuthPage={isAuthPage} setIsAuthPage={setIsAuthPage} isAuthorizedUser={isAuthorizedUser} setIsProfilePage={setIsProfilePage} isMenuOpened={isMenuOpened} toggleMenu={toggleMenu} underlinedLink={underlinedLink} setUnderlinedLink={setUnderlinedLink} notFound={notFound}/>
        <Menu isMenuOpened={isMenuOpened} toggleMenu={toggleMenu} underlinedLink={underlinedLink} setUnderlinedLink={setUnderlinedLink}/>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path='/movies' element={<Movies page="search"/>}/>
            <Route path='/saved-movies' element={<Movies page="saved"/>}/>
            <Route path='/signin' element={<AuthPage pageType='login' setIsAuthPage={setIsAuthPage} setIsAuthorizedUser={setIsAuthorizedUser}/>}/>
            <Route path='/signup' element={<AuthPage pageType='register' setIsAuthPage={setIsAuthPage} setIsAuthorizedUser={setIsAuthorizedUser}/>}/>
            <Route path='/profile' element={<Profile name={userName} email={userEmail} setIsProfilePage={setIsProfilePage} setIsAuthorizedUser={setIsAuthorizedUser}/>}/>
            <Route path="*" element={<NotFoundPage setNotFound={setNotFound}/>} />
        </Routes>
        <Footer isAuthPage={isAuthPage} isProfilePage={isProfilePage} notFound={notFound}/>
    </div>
)
}

export default App;