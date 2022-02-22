import React from 'react';
import { useNavigate } from 'react-router-dom';
import statusCode from '../../assets/Group.png';
import { Content, ImgContainer, Wrapper } from './Style';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <ImgContainer>
        <img src={ statusCode } alt="status 404" />
      </ImgContainer>
      <Content>
        <span>Opps! Page Not Found</span>
        <button type="button" onClick={ () => goHome() }> BACK TO HOME</button>
      </Content>
    </Wrapper>
  );
};

export default NotFound;
