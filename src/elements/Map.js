import React from 'react';
import { useWindowSize } from '../hooks'

const Map = props => {
  const { url } = props;
  const size = useWindowSize()

  // const calculateSize = () => {
  //   if (size.width < 500) {

  //   }
  // }

  return (
    <iframe
      width='100%'   //600
      height='100%'   //450
      frameBorder='0'
      style={{ border: 'none' }}
      allowFullScreen
      src={url}
    ></iframe>
  );
};

export default Map;
