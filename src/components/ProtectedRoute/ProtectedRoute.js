import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserMovies } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

const ProtectedRoute = ({ element: Component, ...props }) => {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(()=>{
    if (props.savedMovies){
      const user = JSON.parse(localStorage.getItem('user'));
      props.setAllUserData(user);
      props.setIsAppReady(true);
    } else {
      getUserMovies().then((res) => props.setSavedMovies(res.data));
    }
  },[props.savedMovies]);


  if (props.isAuthorizedUser && props.savedMovies && currentUser.name){
    return(<Component {...props} />);
  } else if (localStorage.getItem('isAuthorizedUser') === 'true'){
    if (props.isAppReady){
      return(<Component {...props} />)
    }
    
  } else {
    return(<Navigate to="/" replace />)
  }
};


export default ProtectedRoute;
