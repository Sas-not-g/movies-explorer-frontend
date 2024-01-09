import logoPath from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import AccountTab from '../AccountTab/AccountTab';
import React from 'react';

import { Link } from 'react-router-dom';

function Header({isAuthPage, setIsAuthPage, isAuthorizedUser, setIsAuthorizedUser, setIsProfilePage, isMenuOpened, toggleMenu, underlinedLink, setUnderlinedLink, notFound}){

    function resetHeaderFooter(isReset){
        setUnderlinedLink('main')
        setIsProfilePage(!isReset);
        setIsAuthPage(!isReset);
    }  

    React.useEffect(() => {
        if (!isAuthorizedUser){
            localStorage.getItem('isAuthorizedUser') === 'true' ? setIsAuthorizedUser(true) : setIsAuthorizedUser(false);
        }
    })

    document.body.style.cssText = isMenuOpened ? 'position: fixed; overflow-y: scroll' : 'position: static; overflow-y: auto'; //to prevent scrolling when menu is present

    if (notFound){
        return(null);
    } else {
    return(
        <header className={isAuthPage ? 'header header_auth' : 'header'}>
             <Link to='/' className='header__logo' onClick={() => resetHeaderFooter(true)}><img src = {logoPath} alt='логотип'/></Link>
             <Navigation isAuth={isAuthPage} resetHeaderFooter={resetHeaderFooter} isAuthorizedUser={isAuthorizedUser} underlinedLink={underlinedLink} setUnderlinedLink={setUnderlinedLink}/>
             <AccountTab isAuthPage={isAuthPage} isAuthorizedUser={isAuthorizedUser} isMenuOpened={isMenuOpened} toggleMenu={toggleMenu} setUnderlinedLink={setUnderlinedLink}/>
        </header>
    )
    }
}

export default Header