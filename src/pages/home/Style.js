import styled from 'styled-components';

const HomeContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.12rem;
  justify-content: center;
  height: 100vh;
  padding: 1rem;
  width: 100vw;
`;

const HomeContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  & > div > button {
    background-color: #fff;
    border: 1px solid #511281;
    border-radius: 0.25rem;
    color: #511281;
    font-size: 1.12rem;
    font-weight: 600;
    height: 2.62rem;
    line-height: 1rem;
    margin-bottom: 1.5rem;
    width: 16.56rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media(min-width: 767px) {
    flex-direction: row;
    margin-top: 4.5rem;
  }
`;

const HomeCard = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid #EAEAEA;
  border-radius: 1.12rem;
  box-shadow: 0px 2px 10px rgba(51, 51, 51, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 7rem;
  margin: 0.5rem;
  width: 13.43rem;

  & > span:nth-child(2) {
    color: #000;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.75rem;
    margin-top: 2rem;
  }

  & > input {
    border: none;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.75rem;
    margin-top: 2rem;
    outline: none;
    text-align: center;
    width: 100%;
  }

  @media(min-width: 767px) {
    height:  8.56rem;
  }
`;

export {
  HomeContainer,
  HomeCard,
  CardContainer,
  HomeContent,
};
