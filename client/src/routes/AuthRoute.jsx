import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, } from '../contexts/AuthContext';

const AuthRoute = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return component;
  }

  return <Navigate to="/" />;
};

export default AuthRoute;
