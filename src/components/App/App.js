import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { register, authorize } from '../../utils/MainApi.js';
import { getUserMovies } from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Profile from '../Profile/Profile.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';
import moviesApi from '../../utils/MoviesApi.js';

function App(){

    const [isAuthPage, setIsAuthPage] = React.useState(false);
    const [isProfilePage, setIsProfilePage] = React.useState(false);
    const [isAuthorizedUser, setIsAuthorizedUser] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isPreloader, setIsPreloader] = React.useState(false);
    const [isFirstRequestDone, setIsFirstRequestDone] = React.useState(false);
    const [isAppReady, setIsAppReady] = React.useState(false);
    const [initialMovies, setInitialMovies] = React.useState([]);
    const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem('foundMovies') || '[]'));
    const [savedMovies, setSavedMovies] = React.useState(false)
    const [shownSavedMovies, setShownSavedMovies] = React.useState(false);

    const [underlinedLink, setUnderlinedLink] = React.useState('main');
    const [notFound, setNotFound] = React.useState(false);

    const [serverAuthErrorMessage, setServerAuthErrorMessage] = React.useState('');

    const [isMenuOpened, setIsMenuOpened] = React.useState(false);

    const navigate = useNavigate();

    function toggleMenu(){
        setIsMenuOpened(() => !isMenuOpened);
    }

    function handleRegister(name, email, password){
        register(name, email, password).then((res) => {
            handleLogin(res.user.email, password)
        }).catch((err) => {
            if (err.includes('400')){
                setServerAuthErrorMessage('Введены некорректные данные');
            } else if (err.includes('409')){
                setServerAuthErrorMessage('Пользователь с таким email уже существует');
            } else {
                setServerAuthErrorMessage('Ой. Ошибка на сервере');
            }
        });
    }

    function handleLogin(email, password){
        authorize(email, password).then((res) => {
            localStorage.setItem('isAuthorizedUser', 'true');
            localStorage.setItem('user', JSON.stringify({email: res.email, name: res.name, _id: res._id}));
            setAllUserData(res);
            getUserMovies().then((res) => setSavedMovies(res.data)).then(() => leaveAuthPage());
        }).catch((err) => {
            if (err.includes('401')){
                setServerAuthErrorMessage('Такого пользователя не существует');
            } else if (err.includes('400')){
                setServerAuthErrorMessage('Введены некорректные данные');
            } else {
                setServerAuthErrorMessage('Ой. Ошибка на сервере');
            }
        });
    }

    function setAllUserData(user){
        setCurrentUser({email: user.email, name: user.name, _id: user._id});
        setIsAuthorizedUser(true);
    }

    function leaveAuthPage(){
        navigate('/movies', {replace: true});
        setIsAuthPage(false);
        setIsAuthorizedUser(true);
    }

    function searchMovies(inputValue, isShort, page){
        if (page === 'search'){
            if (initialMovies.length === 0){
                setIsPreloader(true);
                moviesApi.getInitialCards().then(res => res.json()).then((res) =>{
                     setIsFirstRequestDone(true);
                     setInitialMovies(res);
                     setMovies(filterMovies(res, isShort, inputValue, page));
                     setIsPreloader(false);
                });
            } else {
                setMovies(filterMovies(initialMovies, isShort, inputValue, page));
            }
            
        } else if (page === 'saved'){
            setShownSavedMovies(filterMovies(savedMovies, isShort, inputValue, page));
        }

    }

    function filterMovies(movieList, isShort, inputValue, page){

        const filteredMovieList = movieList.filter((movie) => {

            if (isShort){
                return ((movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())) && movie.duration <= 40);
            }
            
            return movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputValue.toLowerCase());
        })
        
        if (page === 'search'){
            localStorage.setItem('foundMovies', JSON.stringify(filteredMovieList));
        }
        return filteredMovieList
    }

return(
    <CurrentUserContext.Provider value={currentUser}>
        <div className='root'>
            <Header isAuthPage={isAuthPage} setIsAuthPage={setIsAuthPage} isAuthorizedUser={isAuthorizedUser} setIsAuthorizedUser={setIsAuthorizedUser} setIsProfilePage={setIsProfilePage} isMenuOpened={isMenuOpened} toggleMenu={toggleMenu} underlinedLink={underlinedLink} setUnderlinedLink={setUnderlinedLink} notFound={notFound}/>
            <Menu isMenuOpened={isMenuOpened} toggleMenu={toggleMenu} underlinedLink={underlinedLink} setUnderlinedLink={setUnderlinedLink}/>
            <Routes>
                <Route path="/" element={<Main/>}/>

                <Route path='/movies' element={
                    <ProtectedRoute
                     element={Movies}
                     setCurrentUser={setCurrentUser}
                     setAllUserData={setAllUserData}
                     setIsAuthorizedUser={setIsAuthorizedUser}
                     isAppReady={isAppReady}
                     setIsAppReady={setIsAppReady}
                     isPreloader={isPreloader}
                     isAuthorizedUser={isAuthorizedUser}
                     isFirstRequestDone={isFirstRequestDone}
                     setIsFirstRequestDone={setIsFirstRequestDone}
                     page="search"
                     movies={movies}
                     searchMovies={searchMovies}
                     savedMovies={savedMovies}
                     shownSavedMovies={shownSavedMovies}
                     setShownSavedMovies={setShownSavedMovies}
                     setSavedMovies={setSavedMovies}
                     setUnderlinedLink={setUnderlinedLink}
                    />
                    }
                />

                <Route path='/saved-movies' element={
                    <ProtectedRoute
                     element={Movies}
                     setCurrentUser={setCurrentUser}
                     setAllUserData={setAllUserData}
                     setIsAuthorizedUser={setIsAuthorizedUser}
                     isAuthorizedUser={isAuthorizedUser}
                     isAppReady={isAppReady}
                     setIsAppReady={setIsAppReady}
                     isFirstRequestDone={isFirstRequestDone}
                     setIsFirstRequestDone={setIsFirstRequestDone}
                     page="saved"
                     movies={movies}
                     searchMovies={searchMovies}
                     savedMovies={savedMovies}
                     shownSavedMovies={shownSavedMovies}
                     setShownSavedMovies={setShownSavedMovies}
                     setSavedMovies={setSavedMovies}
                     setUnderlinedLink={setUnderlinedLink}
                    />
                    }
                />

                <Route path='/signin' element={<AuthPage pageType='login' setIsAuthPage={setIsAuthPage} isAuthorizedUser={isAuthorizedUser} setIsAuthorizedUser={setIsAuthorizedUser} setCurrentUser={setCurrentUser} handleLogin={handleLogin} serverAuthErrorMessage={serverAuthErrorMessage} setServerAuthErrorMessage={setServerAuthErrorMessage}/>}/>
                <Route path='/signup' element={<AuthPage pageType='register' setIsAuthPage={setIsAuthPage} isAuthorizedUser={isAuthorizedUser} setIsAuthorizedUser={setIsAuthorizedUser} setCurrentUser={setCurrentUser} handleRegister={handleRegister} serverAuthErrorMessage={serverAuthErrorMessage} setServerAuthErrorMessage={setServerAuthErrorMessage}/>}/>

                <Route path='/profile' element={
                    <ProtectedRoute
                    element={Profile}
                    savedMovies={savedMovies}
                    setCurrentUser={setCurrentUser}
                    setAllUserData={setAllUserData}
                    isAuthorizedUser={isAuthorizedUser}
                    isAppReady={isAppReady}
                    setIsAppReady={setIsAppReady}
                    setIsProfilePage={setIsProfilePage}
                    setIsAuthorizedUser={setIsAuthorizedUser}
                    setSavedMovies={setSavedMovies}
                    setIsFirstRequestDone={setIsFirstRequestDone}
                    setUnderlinedLink={setUnderlinedLink}
                    />
                    }
                />

                <Route path='*' element={
                    <ProtectedRoute
                    element={NotFoundPage}
                    savedMovies={savedMovies}
                    setCurrentUser={setCurrentUser}
                    setAllUserData={setAllUserData}
                    isAuthorizedUser={isAuthorizedUser}
                    setIsAuthorizedUser={setIsAuthorizedUser}
                    isAppReady={isAppReady}
                    setIsAppReady={setIsAppReady}
                    setSavedMovies={setSavedMovies}
                    setNotFound={setNotFound}
                    />
                    }
                />

            </Routes>
            <Footer isAuthPage={isAuthPage} isProfilePage={isProfilePage} notFound={notFound}/>
        </div>
    </CurrentUserContext.Provider>
    )
}

export default App;