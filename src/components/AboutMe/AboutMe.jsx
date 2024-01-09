import './AboutMe.css';
import student from '../../images/student.png';

function AboutMe(){
    return(
        <section className='aboutme__wrapper'>
            <h2 id='aboutme' className='aboutme__header'>Студент</h2>
            <div className='aboutme__student-info'>
                <div className='aboutme__topic'>
                    <h3 className='aboutme__topic-header'>Александр</h3>
                    <p className='aboutme__topic-status'>Фронтенд-разработчик, 19 лет</p>
                    <p className='aboutme__topic-about'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut inventore, ad quas porro fugiat praesentium sequi architecto ea sit ipsum dolorum veritatis, cum eos fuga fugit distinctio quia sint error.</p>
                    <a className='aboutme__github' href="https://github.com/Sas-not-g" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className='aboutme__photo' src={student} alt='студент'></img>
            </div>
        </section>
    )
}

export default AboutMe;