import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.12rem;
  font-weight: normal;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  position: relative;
  width: 100vw;

  & > div:nth-child(1) {
    left: 20px;
    position: absolute;
    top: 20px;
    width: 100%;

    & > button {
      background-color: #fff;
      border: 1px solid #511281;
      color: #511281;
    }
  }
`;

const Button = styled.button`
    background-color: #5EDE99;
    border: none;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 1.12rem;
    font-weight: 600;
    height: 2.62rem;
    line-height: 1rem;
    margin-top: 1.5rem;
`;

const Content = styled.div`
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem 0;

    & > span {
      font-weight: 700;
    }

    & > input, select {
      background-color: #fff;
      border: 1px solid #EAEAEA;
      border-radius: 0.5rem;
      box-shadow: 0px 2px 10px rgba(51, 51, 51, 0.1);
      color: #5D5C5D;
      font-size: 1.2rem;
      margin: 0.85rem 0;
      outline: none;
      padding: 0.75rem 1rem;

      &:focus {
        border: 1px solid #5EDE99;
      }
    }
  }
`;

export {
  Container,
  Content,
  Button,
};
