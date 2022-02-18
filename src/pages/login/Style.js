import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  background-color: #E9FCE9;
  color: #4D625F;
  display: flex;
  font-size: 1.12rem;
  font-weight: normal;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 26.62rem;
  margin: 1rem;
  width: 21.56rem;

  & > div {
    display: flex;
    flex-direction: column;

    & > input {
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

  & > button {
    background-color: #5EDE99;
    border: none;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 1.12rem;
    font-weight: 600;
    height: 2.62rem;
    line-height: 1rem;
    margin-top: 1.5rem;
  }
`;

export {
  Wrapper,
  FormContainer,
};
