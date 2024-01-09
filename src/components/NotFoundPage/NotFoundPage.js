import React from 'react';
import './NotFoundPage.css';

function NotFoundPage({setNotFound}){

    function goBack(){
        setNotFound(false)
        window.history.back();
    }

    React.useEffect(() => {
     setNotFound(true);
    })

    return(
            <main className='not-found__container'>
                <h1 className='not-found__code'>404</h1>
                <p className='not-found__message'>Страница не найдена</p>
                <p className='not-found__return-button' onClick={goBack}>Назад</p>
            </main>
    )
}

export default NotFoundPage;