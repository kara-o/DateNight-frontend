import React from 'react';

const Map = (props) => {
  const { url, width = null, height = null } = props;

  return (
    <iframe
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      frameBorder='0'
      style={{ border: 'none' }}
      allowFullScreen
      src={url}
    ></iframe>
  );
};

export default Map;
