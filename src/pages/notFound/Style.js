import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  height: 17.62rem;
  flex-direction: column;
  justify-content: center;
  width: 17.62rem;

  & > span {
    font-size: 1.06rem;
    font-weight: 600;
    line-height: 2rem;
    text-align: center;
    margin-bottom:  2.93rem;
  }

  & > button {
    background-color: #511281;
    border: 1px solid #EAEAEA;
    border-radius: 0.5rem;
    box-shadow: 0px 2px 10px rgba(51, 51, 51, 0.1);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 500;
    height: 2.5rem;
    line-height: 1rem;
    letter-spacing: 1px;
    outline: none;
    text-align: center;
    width: 11.87rem;
  }
`;

const ImgContainer = styled.div`
  height: 100%;
  min-height: 12.31rem;
  min-width: 27.75rem;
  width: 100%;

  & > img {
    width: 100%;
  }

  @media(min-width: 767px) {
    height: 27.31rem;
    width: 42.75rem;
  }
`;

export {
  Wrapper,
  Content,
  ImgContainer,
};
