import React from 'react';

const Map = (props) => {
  const { url, height } = props;

  return (
    <iframe
      width='100%'
      height='100%'
      frameBorder='0'
      style={{ border: 'none' }}
      allowFullScreen
      src={url}
    ></iframe>
  );
};

export default Map;
