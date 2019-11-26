import React from 'react';

const RequestShow = props => {
  console.log('here!', props);

  const fetchRequest = () => {
    fetch(
      `http://localhost:3000/api/v1/users/${props.currentUserData.user.id}/requests/${props.match.params.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${props.currentUserData.jwt}`
        }
      }
    )
      .then(res => res.json())
      .then(console.log);
  };

  return <div>{props.currentUserData.user ? fetchRequest() : null}</div>;
};

export default RequestShow;
