import Home from './Home';
import { Route, Routes, Router, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { PrivateRoutes } from '../utils/PrivateRoute';

const Pages = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path="*"></Route>
      </Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
    </Routes>
  );
};

export default Pages;
