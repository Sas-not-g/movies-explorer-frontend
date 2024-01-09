import './AboutProject.css'

function AboutProject(){
    return(
        <section className="project">
            <h2 id='project' className="project__header">О проекте</h2>
            <div className="project__flex">
                <div className='project__topic'>
                    <h3 className='project__topic-header'>Дипломный проект включал 5 этапов</h3>
                    <p className='project__topic-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='project__topic'>
                    <h3 className='project__topic-header'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project__topic-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__weeks">
                <p className='project__one-week project__weeks-text'>1 неделя</p>
                <p className='project__four-week project__weeks-text'>4 недели</p>
                <p className='project__week-theme project__weeks-text'>Back-end</p>
                <p className='project__week-theme project__weeks-text'>Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;