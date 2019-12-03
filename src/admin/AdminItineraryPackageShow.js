import React, { useState, useEffect } from 'react';
import {
  fetchItineraryPackage,
  createItineraryPackageItem,
  fetchItineraryPackageItems
} from './api-admin';
import { TextField } from '@material-ui/core';
import Button from '../layout/Button';

const KEY = 'AIzaSyCOyujenXkNqsCLNFS0JJS7aZ36oaeUhWs';

const ItineraryItemForm = props => {
  const { onSubmit } = props;
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const [blurb, setBlurb] = useState('');
  const [makeResLink, setMakeResLink] = useState('');
  const [googleMap, setGoogleMap] = useState('');

  const handleClick = () => {
    onSubmit({
      time,
      address,
      place,
      blurb,
      make_res_link: makeResLink,
      map: googleMap
    });
    setTime('');
    setAddress('');
    setPlace('');
    setBlurb('');
    setMakeResLink('');
    setGoogleMap('');
  };

  const handleCreateMap = () => {
    setGoogleMap(createMap(place));
  };

  const createMap = place => {
    const urlEscaped = encodeURI(place);
    return (
      <iframe
        width='600'
        height='450'
        frameborder='0'
        style={{ border: 'none' }}
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${KEY}&q=${urlEscaped}`}
      ></iframe>
    );
  };

  return (
    <form className='create-form'>
      <TextField
        label='Duration (minutes)'
        value={time}
        onChange={e => setTime(e.target.value)}
      />
      <TextField
        label='Address'
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <TextField
        label='Place'
        value={place}
        onChange={e => setPlace(e.target.value)}
      />
      <TextField
        label='Blurb'
        value={blurb}
        onChange={e => setBlurb(e.target.value)}
      />
      <TextField
        label='Make reservation link'
        value={makeResLink}
        onChange={e => setMakeResLink(e.target.value)}
      />
      <Button onClick={handleCreateMap}>Generate Map</Button>
      {googleMap}
      <Button onClick={handleClick}>Create</Button>
    </form>
  );
};

const AdminItineraryPackageShow = props => {
  const { userData } = props;
  const itinPackageId = props.match.params.id;
  const [itinPackage, setItinPackage] = useState(null);
  const [itinPackageItems, setItinPackageItems] = useState(null);

  useEffect(() => {
    if (userData) {
      debugger;
      fetchItineraryPackage(userData, itinPackageId).then(itinPackage => {
        setItinPackage(itinPackage);
        setItinPackageItems(itinPackage.itinerary_package_items);
      });
    }
  }, [userData]);

  const handleItemSubmit = formData => {
    createItineraryPackageItem(itinPackageId, formData, userData).then(
      pkgItem => {
        setItinPackageItems(itinPackageItems.concat([pkgItem]));
      }
    );
  };

  if (itinPackage === null || itinPackageItems === null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <h1>Itinerary Package: {itinPackage.title}</h1>
        <p>Package: {JSON.stringify(itinPackage)}</p>
        <p>
          Package items:{' '}
          {itinPackageItems.map(pkgItem => (
            <p key={pkgItem.id}>Package item: {JSON.stringify(pkgItem)}</p>
          ))}
        </p>
        <h1>Add items</h1>
        <ItineraryItemForm onSubmit={handleItemSubmit} />
      </div>
    </>
  );
};

export default AdminItineraryPackageShow;
