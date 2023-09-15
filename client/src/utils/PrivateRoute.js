import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  let token = false;

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken != null) {
    token = true;
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};
