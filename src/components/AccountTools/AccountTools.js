import './AccountTools.css';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/MainApi';

function AccountTools({isEditMode, toggleEdit, setIsProfilePage, setIsAuthorizedUser, setSavedMovies, setIsFirstRequestDone}){


    function signout(){
        logout().then((res) =>{
            console.log(res);
            setSavedMovies(false);
            setIsFirstRequestDone(false);
            setIsAuthorizedUser(false);
            setIsProfilePage(false);
            localStorage.clear()
        })
        
    }

    if (!isEditMode){
        return(
            <div className='tools__tool-list'>
                <button type='button' className='tools__link tools__link_to-edit' onClick={() => toggleEdit(true)}>Редактировать</button>
                <Link to='/'className='tools__link tools__link_signout' onClick={signout}>Выйти из аккаунта</Link>
            </div>
        )
    }
}

export default AccountTools;