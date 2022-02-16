import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    flex-direction: column;
    
    & > label {
      font-size: 1.5rem;
    }

    & > input {
      margin: 1.375rem 0;
    }
  }
`;

export {
  Wrapper,
  FormContainer,
};
