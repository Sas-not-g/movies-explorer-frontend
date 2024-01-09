import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo(){
    return(
        <section className="promo__container">
            <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
            <NavTab/>
        </section>
    )
}

export default Promo;