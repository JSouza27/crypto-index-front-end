import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export {
  Container,
  Content,
};
