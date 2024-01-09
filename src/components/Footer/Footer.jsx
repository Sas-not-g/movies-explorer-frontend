import './Footer.css';

function Footer({isAuthPage, isProfilePage, notFound}){
    if (isAuthPage || isProfilePage || notFound){
        return(null);
    } else {

    return(
        <footer className='footer'>
            <p className='footer__collab'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__info-bar'>
                <p className='footer__date'>© 2023</p>
                <ul className='footer__link-items'>
                    <li className='footer__link-item'>
                        <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className='footer__link-item'>
                        <a className='footer__link' href='https://github.com/Sas-not-g' target='_blank' rel="noreferrer">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
    }
}

export default Footer;