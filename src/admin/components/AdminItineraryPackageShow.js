import React, { useState, useEffect } from 'react';
import {
  fetchItineraryPackage,
  createItineraryPackageItem,
  deletePkgItem,
} from '../services/api-admin';
import { Button, SimpleCard, Map, Form, MyInput } from '../../elements';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';

const useStyles = createUseStyles({
  cardsContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
  },
  column: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    textAlign: 'center',
  },
  italic: {
    fontStyle: 'italic',
  },
  blurb: {
    width: '50%',
    resize: 'none',
    margin: '10px',
  },
  buttons: {
    margin: '10px',
  },
});

const KEY = 'AIzaSyCOyujenXkNqsCLNFS0JJS7aZ36oaeUhWs'; //public Google API key, ok if here

const ItineraryItemForm = (props) => {
  const { onSubmit } = props;
  const [duration, setDuration] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const [blurb, setBlurb] = useState('');
  const [makeResLink, setMakeResLink] = useState('');
  const [iFrame, setIFrame] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const classes = useStyles();

  const handleClick = () => {
    onSubmit({
      duration,
      address,
      place,
      blurb,
      make_res_link: makeResLink,
      map_iframe_url: iFrame,
      map_url: mapUrl,
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
    <Form>
      <MyInput
        placeholder='Duration (minutes)'
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <MyInput
        placeholder='Venue Name'
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <MyInput
        placeholder='Address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <textarea
        className={classes.blurb}
        rows={3}
        placeholder='Blurb'
        value={blurb}
        onChange={(e) => setBlurb(e.target.value)}
      />
      <div className={classes.links}>
        <MyInput
          placeholder='Make reservation link'
          value={makeResLink}
          onChange={(e) => setMakeResLink(e.target.value)}
        />
        <MyInput
          placeholder='Map URL'
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
        />
      </div>
      <div className={classes.buttons}>
        <Button onClick={handleCreateMap}>Generate Map</Button>
        {iFrame ? <Map url={iFrame} /> : null}
        <Button onClick={handleClick}>Add Item To Package</Button>
      </div>
    </Form>
  );
};

const AdminItineraryPackageShow = (props) => {
  const { userData } = props;
  const itinPackageId = props.match.params.id;
  const [itinPackage, setItinPackage] = useState(null);
  const [itinPackageItems, setItinPackageItems] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (userData) {
      fetchItineraryPackage(userData, itinPackageId).then((itinPackage) => {
        setItinPackage(itinPackage);
        setItinPackageItems(itinPackage.itinerary_package_items);
      });
    }
  }, [userData]);

  const displayItinPackage = () => {
    if (itinPackage) {
      const i = itinPackage;
      return (
        <div>
          <p>Neighborhood: {i.neighborhood}</p>
          <p>Blurb: {i.blurb}</p>
          <p>Price Range: {i.price_range}</p>
          {/* <MyLink
            destination={`/admin/itinerary_packages/${itinPackage.id}/edit`}
          >
            Edit
          </MyLink> */}
          <Button
            onClick={() =>
              history.push(`/admin/itinerary_packages/${itinPackage.id}/edit`)
            }
          >
            Edit
          </Button>
        </div>
      );
    }
  };

  const handleItemSubmit = (formData) => {
    createItineraryPackageItem(itinPackageId, formData, userData).then(
      (pkgItem) => {
        setItinPackageItems(itinPackageItems.concat([pkgItem]));
      }
    );
  };

  const handleDelete = (id) => {
    deletePkgItem(userData, itinPackage.id, id);
    const newItinPkgItems = itinPackageItems.filter((item) => item.id !== id);
    setItinPackageItems(newItinPkgItems);
  };

  if (itinPackage === null || itinPackageItems === null) {
    return <p>Loading...</p>;
  }

  const renderPackageItems = () => {
    return itinPackageItems.map((pkgItem) => {
      return <SimpleCard pkgItem={pkgItem} handleDelete={handleDelete} />;
    });
  };

  return (
    <>
      <div className={classes.column}>
        <div className={classes.container}>
          <h1>Itinerary Package: {itinPackage.title}</h1>{' '}
          <p>{displayItinPackage()}</p>
          <h2>Package Items:</h2>
          {itinPackageItems.length ? (
            <div className={classes.cardsContainer}>{renderPackageItems()}</div>
          ) : (
            <p className={classes.italic}>No Items</p>
          )}
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.container}>
          <h2>Add Items</h2>
          <ItineraryItemForm onSubmit={handleItemSubmit} />
        </div>
      </div>
    </>
  );
};

export default AdminItineraryPackageShow;
