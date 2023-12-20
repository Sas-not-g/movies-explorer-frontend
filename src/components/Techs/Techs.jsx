import './Techs.css';

function Techs(){
    return(
        <section className='tech__wrapper'>
            <h2 id='techs' className="tech__header">Технологии</h2>
            <div className='tech__topic'>
                <h3 className='tech__topic-header'>7 технологий</h3>
                <p className='tech__topic-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className='tech__techs'>
                <li className='tech__tech-item'>HTML</li>
                <li className='tech__tech-item'>CSS</li>
                <li className='tech__tech-item'>JS</li>
                <li className='tech__tech-item'>React</li>
                <li className='tech__tech-item'>Git</li>
                <li className='tech__tech-item'>Express.js</li>
                <li className='tech__tech-item'>mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;