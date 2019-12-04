import React, { useState, useEffect } from 'react';
import {
  fetchItineraryPackage,
  createItineraryPackageItem,
  deletePkgItem
} from './api-admin';
import Button from '../layout/Button';
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Paper
} from '@material-ui/core';
import Map from '../layout/Map';

const KEY = 'AIzaSyCOyujenXkNqsCLNFS0JJS7aZ36oaeUhWs';

const ItineraryItemForm = props => {
  const { onSubmit } = props;
  const [duration, setDuration] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const [blurb, setBlurb] = useState('');
  const [makeResLink, setMakeResLink] = useState('');
  const [iFrame, setIFrame] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const handleClick = () => {
    onSubmit({
      duration,
      address,
      place,
      blurb,
      make_res_link: makeResLink,
      map_iframe_url: iFrame,
      map_url: mapUrl
    });
    setDuration('');
    setAddress('');
    setPlace('');
    setBlurb('');
    setMakeResLink('');
    setIFrame('');
    setMapUrl('');
  };

  const handleCreateMap = () => {
    setIFrame(createMapUrl(place, address));
  };

  const createMapUrl = (place, address) => {
    const urlEscaped = encodeURI(place + ' ' + address);
    const iFrameUrl = `https://www.google.com/maps/embed/v1/place?key=${KEY}&q=${urlEscaped}`;
    return iFrameUrl;
  };

  return (
    <Paper elevation={10} className='paper'>
      <form className='create-form'>
        <TextField
          label='Duration (minutes)'
          value={duration}
          onChange={e => setDuration(e.target.value)}
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
        <TextField
          label='Map URL'
          value={mapUrl}
          onChange={e => setMapUrl(e.target.value)}
        />
        <div className='btns-div'>
          <Button className='btn' onClick={handleCreateMap}>
            Generate Map
          </Button>
          {iFrame ? <Map url={iFrame} /> : null}
          <Button className='btn' onClick={handleClick}>
            Add Item To Package
          </Button>
        </div>
      </form>
    </Paper>
  );
};

const AdminItineraryPackageShow = props => {
  const { userData } = props;
  const itinPackageId = props.match.params.id;
  const [itinPackage, setItinPackage] = useState(null);
  const [itinPackageItems, setItinPackageItems] = useState(null);

  useEffect(() => {
    if (userData) {
      fetchItineraryPackage(userData, itinPackageId).then(itinPackage => {
        setItinPackage(itinPackage);
        setItinPackageItems(itinPackage.itinerary_package_items);
      });
    }
  }, [userData]);

  const displayItinPackage = () => {
    if (itinPackage) {
      const i = itinPackage;
      return (
        <Paper elevation={10} className='paper'>
          <p>Neighborhood: {i.neighborhood}</p>
          <p>Blurb: {i.blurb}</p>
          <p>Price Range: {i.price_range}</p>
        </Paper>
      );
    }
  };

  const handleItemSubmit = formData => {
    createItineraryPackageItem(itinPackageId, formData, userData).then(
      pkgItem => {
        setItinPackageItems(itinPackageItems.concat([pkgItem]));
      }
    );
  };

  const handleDelete = id => {
    deletePkgItem(userData, itinPackage.id, id);
    const newItinPkgItems = itinPackageItems.filter(item => item.id !== id);
    setItinPackageItems(newItinPkgItems);
  };

  if (itinPackage === null || itinPackageItems === null) {
    return <p>Loading...</p>;
  }

  const renderPackageItems = () => {
    if (itinPackageItems) {
      return itinPackageItems.map(pkgItem => {
        return (
          <Card elevation={10} key={pkgItem.id} className='card'>
            <CardContent>
              <Typography
                className='card-title'
                color='textSecondary'
                gutterBottom
              >
                {pkgItem.place}
              </Typography>
              <Typography>{pkgItem.duration} minutes</Typography>
            </CardContent>
            <Button onClick={() => handleDelete(pkgItem.id)}>Remove</Button>
          </Card>
        );
      });
    }
  };

  return (
    <>
      <div className='pkg-display'>
        <h1>Itinerary Package: {itinPackage.title}</h1>{' '}
        <Link to={`/admin/itinerary_packages/${itinPackage.id}/edit`}>
          Edit
        </Link>
        <p>{displayItinPackage()}</p>
        <h2>Package Items:</h2>
        <div className='itin-item-cards'>{renderPackageItems()}</div>
      </div>
      <div className='pkg-display'>
        <h2>Add Items</h2>
        <ItineraryItemForm onSubmit={handleItemSubmit} />
      </div>
    </>
  );
};

export default AdminItineraryPackageShow;
