import styled from 'styled-components';

const LoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;

  & > span {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export default LoadingWrapper;
