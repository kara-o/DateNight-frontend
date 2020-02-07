import React, { useEffect, useState } from 'react';
import Button from '../../layout/Button';
import { fetchRequest } from '../../user/services/api';
import {
  scrapeNames,
  scrapeSinglePage,
  deleteItinItem,
  addItinItem
} from '../services/api-admin';
import * as moment from 'moment';
import {
  toggleRequestFulfilled,
  fetchItineraryPackages,
  applyItineraryPackage,
  sendTextMessages
} from '../services/api-admin';
import { Link } from 'react-router-dom';
import ItineraryItem from './ItineraryItem';
import { Paper, CircularProgress, Dialog, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';

const KEY = 'AIzaSyCOyujenXkNqsCLNFS0JJS7aZ36oaeUhWs'; // Google Maps API, okay if public

const AdminRequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);
  const [itinPackages, setItinPackages] = useState(null);
  const [scrapedNames, setScrapedNames] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [resTime, setResTime] = useState(null);
  const [iFrame, setIFrame] = useState(null);

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
        scrapeNames(
          userData,
          moment(res.request.start_time).format('YYYY-MM-DD')
        ).then(names => setScrapedNames(names));
      });
      // fetchItineraryPackages(userData).then(setItinPackages);
    }
  }, []);

  const handleComplete = () => {
    toggleRequestFulfilled(
      userData,
      requestId,
      !request.fulfilled
    ).then(respJson => setRequest(respJson.request));
  };

  const renderContacts = () => {
    return request.contacts.map((c, i) => {
      return (
        <li key={c.id} className='contact'>
          Contact #{i + 1}: {c.phone}
        </li>
      );
    });
  };

  // const handleApplyPackage = itinPackageId => {
  //   applyItineraryPackage(requestId, itinPackageId, userData).then(respJson =>
  //     setRequest(respJson.request)
  //   );
  // };

  const handleMessage = () => {
    sendTextMessages(userData, requestId);
  };

  const handleRemove = item => {
    deleteItinItem(userData, item.id).then(() => {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
      });
    });
  };

  const loading = () => {
    return <CircularProgress />;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = () => {
    if (modalInfo) {
      return (
        <Dialog className='item-modal' open={open} onClose={handleClose}>
          <Paper elevation={10} className='paper'>
            <h2>{modalInfo.name}</h2>
            <p>{modalInfo.neighborhood}</p>
            <p>{modalInfo.cuisine}</p>
            <p>{modalInfo.price}</p>
            <p>{modalInfo.blurb}</p>
            <a href={modalInfo.make_res_link} target='_blank'>
              Reservation Link
            </a>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                disableToolbar
                variant='inline'
                minutesStep={15}
                margin='normal'
                label='Time'
                value={resTime}
                onChange={time => setResTime(time)}
              />
            </MuiPickersUtilsProvider>

            <Button
              type='button'
              onClick={() => {
                handleClose();
                handleAddItinItem();
              }}
            >
              Add to Itinerary
            </Button>
          </Paper>
        </Dialog>
      );
    }
  };

  const createMapUrl = (name, address) => {
    const urlEscaped = encodeURI(name + ' ' + address);
    const iFrameUrl = `https://www.google.com/maps/embed/v1/place?key=${KEY}&q=${urlEscaped}`;
    setIFrame(iFrameUrl);
  };

  const handleAddItinItem = () => {
    const itinInfo = {
      ...modalInfo,
      reservation_time: resTime,
      map_iframe_url: iFrame
    };
    addItinItem(userData, itinInfo, requestId).then(res => {
      setRequest(res.request);
    });
  };

  return request ? (
    <div className='admin-show'>
      <div className='show'>
        <h2>Request</h2>
        <Paper elevation={10} className='paper show'>
          <p>Date: {moment(request.start_time).format('MMMM Do YYYY')}</p>
          <p>Time: {moment(request.start_time).format('h:mm a')}</p>
          <p>Party: {request.party_size} people</p>
          <ul>{renderContacts()}</ul>
          <p>Neighborhood: {request.neighborhood}</p>
          <p>Price Range: {request.price_range}</p>
          <p>Notes: {request.notes}</p>
          <p>
            Fulfilled: {(!!request.fulfilled).toString()}{' '}
            {request.cancelled ? (
              <span>
                <strong style={{ color: 'red' }}>CANCELLED</strong>
              </span>
            ) : null}
          </p>
          <Button type='button' onClick={handleComplete}>
            {request.fulfilled ? 'Mark as incomplete' : 'Mark as complete'}
          </Button>
          {request.fulfilled ? (
            <Button type='button' onClick={handleMessage}>
              Alert (DEMO ONLY)
            </Button>
          ) : null}
        </Paper>
      </div>
      <div className='itinerary'>
        <h2>Itinerary</h2>
        {!request.itinerary_items.length
          ? 'Empty'
          : request.itinerary_items.map(item => (
              <ItineraryItem
                handleRemove={handleRemove}
                key={item.id}
                item={item}
                admin={true}
              />
            ))}
      </div>
      <div className='packages'>
        {/* <h2>Packages</h2>
        <ul className='pkg-list-show'>
          {itinPackages.map(pkg => (
            <li className='pkg-link' key={pkg.id}>
              <Link to={`/admin/itinerary_packages/${pkg.id}`}>
                {pkg.price_range.split(' ')[0]} - {pkg.neighborhood} -{' '}
                {pkg.title}
              </Link>
              <Button type='button' onClick={() => handleApplyPackage(pkg.id)}>
                Apply
              </Button>
            </li>
          ))}
        </ul> */}
        <h2>Venues for {moment(request.start_time).format('MMMM Do YYYY')}</h2>
        <ul className='pkg-list-show'>
          {scrapedNames.length > 0
            ? scrapedNames.map((info, idx) => (
                <li
                  className='pkg-link single-item'
                  key={idx}
                  onClick={() => {
                    scrapeSinglePage(userData, info).then(infoJson => {
                      setOpen(true);
                      setModalInfo(infoJson);
                      createMapUrl(infoJson.address);
                    });
                  }}
                >
                  {info.name}
                </li>
              ))
            : loading()}
        </ul>
      </div>
      {openModal()}
    </div>
  ) : (
    loading()
  );
};

export default AdminRequestShow;