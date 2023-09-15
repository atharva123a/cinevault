import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavBar from '../components/Header';
import DataTable from '../components/DataTable';

const Home = () => {
  return (
    <>
      <HeaderNavBar></HeaderNavBar>
      <DataTable></DataTable>
    </>
  );
};

export default Home;
