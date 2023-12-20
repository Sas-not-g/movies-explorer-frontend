import './NavTab.css'

function NavTab(){
    return (
        <nav className='navigation'>
            <a className='navigation__button' href='#project'>О проекте</a>
            <a className='navigation__button' href='#techs'>Технологии</a>
            <a className='navigation__button' href='#aboutme'>Студент</a>
        </nav>
    )
}

export default NavTab