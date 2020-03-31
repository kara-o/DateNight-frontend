import React from 'react';

const Map = props => {
  const { url } = props;
  console.log('here in map!', url);
  return (
    <iframe
      width='600'
      height='450'
      frameBorder='0'
      style={{ border: 'none' }}
      allowFullScreen
      src={url}
    ></iframe>
  );
};

export default Map;
