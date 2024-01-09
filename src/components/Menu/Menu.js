import { Link } from 'react-router-dom';
import './Menu.css';
import React from 'react';


function Menu({isMenuOpened, toggleMenu, underlinedLink, setUnderlinedLink}){

    function handleForward(e){
        toggleMenu();
        setUnderlinedLink(e.target.classList[1].split('_')[3]);
        
    }

    return(
        <section className={isMenuOpened ? 'menu-container menu-container_opened' : 'menu-container'}>
                <div className="menu__background" onClick={toggleMenu}></div>
                <div className={isMenuOpened ? 'menu__content menu__content_opened' : 'menu__content'}>
                    <div className='menu__link-list'>
                        <Link to='/' className={underlinedLink === 'main' ? 'menu__link menu__link_main menu__link_underlined' : 'menu__link menu__link_main'} onClick={handleForward}>Главная</Link>
                        <Link to='/movies' className={underlinedLink === 'movies' ? 'menu__link menu__link_movies menu__link_underlined' : 'menu__link menu__link_movies'} onClick={handleForward}>Фильмы</Link>
                        <Link to='saved-movies' className={underlinedLink === 'saved' ? 'menu__link menu__link_saved menu__link_underlined' : 'menu__link menu__link_saved'} onClick={handleForward}>Сохранённые фильмы</Link>
                        <Link to='/profile' className='menu__link menu__link_account' onClick={handleForward}>Аккаунт</Link>
                    </div>
                </div>
            </section>
    )
}

export default Menu;