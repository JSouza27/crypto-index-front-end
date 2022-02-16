import styled from 'styled-components';

const HomeContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media(min-width: 767px) {
    flex-direction: row;
  }
`;

const HomeCard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export {
  HomeContainer,
  HomeCard,
  CardContainer,
};
