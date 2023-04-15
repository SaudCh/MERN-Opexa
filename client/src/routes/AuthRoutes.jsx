import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import('../screens/Auth/Login'));
const Register = lazy(() => import('../screens/Auth/Register'));
const ForgotPassword = lazy(() => import('../screens/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../screens/Auth/ResetPassword'));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />

        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
