import React from 'react';
import styled from 'styled-components';
import DrawerComponent from '../components/Drawer';

const Home = () => {
  const StyledIframe = styled.iframe`
    width: calc(100% - 450px);
    height: 600px;
  `;

  return (
    <>
      <StyledIframe src='http://192.168.1.5:3000' />
      <DrawerComponent />
    </>
  );
};

export default Home;
