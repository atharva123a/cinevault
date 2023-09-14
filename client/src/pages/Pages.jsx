import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
    </Routes>
  );
};

export default Pages;
