import './AccountTab.css';
import { Link } from 'react-router-dom';

function AccountTab({isAuthorizedUser, isAuthPage, isMenuOpened, toggleMenu, setUnderlinedLink}){


    if (isAuthPage){
        return('')
    }
    
    if (isAuthorizedUser){
        return(
            <>
                <Link to='/profile' className='account-tab__account-link' onClick={() => setUnderlinedLink('account')}>Аккаунт</Link>
                <button className="account-tab__menu-button" tabIndex="0" onClick={toggleMenu} type='button'>
                        <span className={isMenuOpened ? 'account-tab__icon-bar account-tab__icon-bar_opened' : 'account-tab__icon-bar'}></span>
                        <span className={isMenuOpened ? 'account-tab__icon-bar account-tab__icon-bar_opened' : 'account-tab__icon-bar'}></span>
                        <span className={isMenuOpened ? 'account-tab__icon-bar account-tab__icon-bar_opened' : 'account-tab__icon-bar'}></span>
                </button>
            </>
        )
    } else {
       return(
            <nav className='account-tab__auth-links'>
                <Link to='/signup' className='account-tab__auth-link account-tab__auth-link_signup'>Регистрация</Link>
                <Link to='/signin' className='account-tab__auth-link account-tab__auth-link_signin'>Войти</Link>
            </nav>
       ) 
    }
}

export default AccountTab;