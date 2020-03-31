import React, { useEffect, useState } from 'react';
import {
  Button,
  MyLink,
  ItineraryDisplay,
  RequestContainer,
  Filter,
  ListContainer
} from '../../elements';
import { fetchRequest } from '../../user/services/api';
import {
  toggleRequestFulfilled,
  fetchItineraryPackages,
  applyItineraryPackage,
  sendTextMessages,
  scrapeNames,
  scrapeSinglePage,
  deleteItinItem,
  addItinItem
} from '../services/api-admin';
import * as moment from 'moment';
import { Dialog } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import { createUseStyles } from 'react-jss';

const KEY = 'AIzaSyCOyujenXkNqsCLNFS0JJS7aZ36oaeUhWs'; // Google Maps API, okay if public

const useStyles = createUseStyles({
  columnOne: {
    width: '100%'
  },
  columnTwo: {
    width: '100%'
  }
});

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
  const [filter, setFilter] = useState('Single Venues');
  const [showVenues, setShowVenues] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
        scrapeNames(
          userData,
          moment(res.request.start_time).format('YYYY-MM-DD')
        ).then(names => setScrapedNames(names));
      });
      fetchItineraryPackages(userData).then(setItinPackages);
    }
  }, [userData]);

  const handleComplete = () => {
    toggleRequestFulfilled(
      userData,
      requestId,
      !request.fulfilled
    ).then(respJson => setRequest(respJson.request));
  };

  const handleApplyPackage = itinPackageId => {
    applyItineraryPackage(requestId, itinPackageId, userData).then(respJson =>
      setRequest(respJson.request)
    );
  };

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

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = () => {
    if (modalInfo) {
      const neighborhood = modalInfo.neighborhood
        ? modalInfo.neighborhood
        : 'Seattle';
      return (
        <Dialog open={open} onClose={handleClose}>
          <h2>{modalInfo.name}</h2>
          <p>
            {neighborhood + ' • ' + modalInfo.cuisine + ' • ' + modalInfo.price}
          </p>
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

  const renderFilter = () => {
    return (
      <Filter value={filter} onChange={e => setFilter(e.target.value)}>
        <option value={'Single Venues'}>
          Venues for {moment(request.start_time).format('MMMM Do YYYY')}
        </option>
        <option value={'Packages'}>Packages</option>
      </Filter>
    );
  };

  const displayPackages = () => {
    return itinPackages.map(pkg => {
      return (
        <li key={pkg.id}>
          <MyLink destination={`/admin/itinerary_packages/${pkg.id}`}>
            {pkg.price_range.split(' ')[0]} - {pkg.neighborhood} - {pkg.title}
          </MyLink>
          <Button type='button' onClick={() => handleApplyPackage(pkg.id)}>
            Apply
          </Button>
        </li>
      );
    });
  };

  const displayScrapedVenues = () => {
    return scrapedNames.length
      ? scrapedNames.map((info, idx) => (
          <li
            key={idx}
            onClick={() => {
              scrapeSinglePage(userData, info).then(infoJson => {
                setOpen(true);
                setModalInfo(infoJson);
                createMapUrl(infoJson.name, infoJson.address);
              });
            }}
          >
            {info.name}
          </li>
        ))
      : null;
  };

  const displayVenues = () => {
    return (
      <ListContainer title={renderFilter()}>
        {filter === 'Packages' ? displayPackages() : displayScrapedVenues()}
      </ListContainer>
    );
  };

  return request ? (
    <>
      <div className={classes.columnOne}>
        <RequestContainer
          className={classes.requestContainer}
          title='Request'
          request={request}
          admin={true}
        >
          <Button type='button' onClick={handleComplete}>
            {request.fulfilled ? 'Mark as incomplete' : 'Mark as complete'}
          </Button>
          {request.fulfilled ? (
            <Button type='button' onClick={handleMessage}>
              Alert (DEMO ONLY)
            </Button>
          ) : null}
        </RequestContainer>
        {showVenues ? (
          <ItineraryDisplay
            items={request.itinerary_items}
            admin={true}
            handleRemove={handleRemove}
          />
        ) : null}
      </div>
      <div className={classes.columnTwo}>
        {showVenues ? (
          displayVenues()
        ) : (
          <ItineraryDisplay
            items={request.itinerary_items}
            admin={true}
            handleRemove={handleRemove}
          >
            {!request.fulfilled ? (
              <Button type='button' onClick={() => setShowVenues(true)}>
                Add to Itinerary
              </Button>
            ) : null}
          </ItineraryDisplay>
        )}
      </div>
      {openModal()}
    </>
  ) : null;
};

export default AdminRequestShow;
