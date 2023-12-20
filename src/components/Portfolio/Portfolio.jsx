import './Portfolio.css';

function Portfolio(){
    return(
        <section className='portfolio__wrapper'>
            <h2 className='portfolio__header'>Портфолио</h2>
            <ul className='portfolio__list'>
                <li className='portfolio__list-item'>
                    <a className='portfolio__list-item-link' href='https://github.com/Sas-not-g/how-to-learn_v2' target='_blank' rel="noreferrer">
                        <p className='portfolio__item-text'>Статичный сайт</p>
                        <p className='portfolio__item-text'>&#8599;</p>
                    </a>
                </li>
                <li className='portfolio__list-item'>
                    <a className='portfolio__list-item-link' href="https://github.com/Sas-not-g/russian-travel" target='_blank' rel="noreferrer">
                        <p className='portfolio__item-text'>Адаптивный сайт</p>
                        <p className='portfolio__item-text'>&#8599;</p>
                    </a>
                </li>
                <li className='portfolio__list-item'>
                    <a className='portfolio__list-item-link' href='https://github.com/Sas-not-g/react-mesto-api-full-gha' target='_blank' rel="noreferrer">
                        <p className='portfolio__item-text'>Одностраничное приложение</p>
                        <p className='portfolio__item-text'>&#8599;</p>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;