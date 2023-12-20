import './AccountTools.css';
import { Link } from 'react-router-dom';

function AccountTools({isEditMode, toggleEdit, setIsProfilePage, setIsAuthorizedUser}){


    function signout(){
        setIsAuthorizedUser(false);
        setIsProfilePage(false);
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