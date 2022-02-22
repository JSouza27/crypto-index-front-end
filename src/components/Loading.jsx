import React from 'react';
import Lottie from 'react-lottie';
import * as loading from '../assets/66242-cryptocurrency.json';
import LoadingWrapper from './Style';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <LoadingWrapper>
      <div>
        <Lottie
          options={ defaultOptions }
          height={ 320 }
          width={ 320 }
        />
      </div>
      <span>Loading...</span>
    </LoadingWrapper>
  );
};

export default Loading;
