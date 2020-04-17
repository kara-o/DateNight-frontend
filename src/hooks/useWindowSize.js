import { useState, useEffect } from 'react';

//slightly modified from https://usehooks.com/useWindowSize/

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); //useEffect cleanup!
  }, []);

  return windowSize;
}

export default useWindowSize