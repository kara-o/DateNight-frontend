import React, { useEffect, useState } from 'react';
import {
  Button,
  MyLink,
  ItineraryItem,
  SideDialog,
  RequestContainer,
  ScrollContainer
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
import { Dialog, Select, MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import { createUseStyles } from 'react-jss';

const KEY = 'AIzaSyCOyujenXkNqsCLNFS0JJS7aZ36oaeUhWs'; // Google Maps API, okay if public

const useStyles = createUseStyles({
  showVenues: {
    gridColumn: '1/2',
    gridRow: '3/4'
  },
  hideVenues: {
    gridColumn: '2/3',
    gridRow: '2/4'
  },
  venueContainer: {
    gridColumn: '2/3',
    gridRow: '2/4'
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
  }, []);

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
      <div>
        {/* <InputLabel id='select-label'>Filter</InputLabel> */}
        <Select
          labelId='select-label'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <MenuItem value={'Single Venues'}>
            Venues for {moment(request.start_time).format('MMMM Do YYYY')}
          </MenuItem>
          <MenuItem value={'Packages'}>Packages</MenuItem>
        </Select>
      </div>
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
      <>
        {renderFilter()}
        <ScrollContainer>
          {filter === 'Packages' ? displayPackages() : displayScrapedVenues()}
        </ScrollContainer>
      </>
    );
  };

  return request ? (
    <>
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
      <SideDialog styles={showVenues ? classes.showVenues : classes.hideVenues}>
        <h2>Itinerary</h2>
        {!request.fulfilled ? (
          <Button type='button' onClick={() => setShowVenues(true)}>
            Add to Itinerary
          </Button>
        ) : null}
        <ScrollContainer>
          {request.itinerary_items.length
            ? request.itinerary_items.map(item => (
                <ItineraryItem
                  handleRemove={handleRemove}
                  key={item.id}
                  item={item}
                  admin={true}
                />
              ))
            : null}
        </ScrollContainer>
      </SideDialog>
      {showVenues ? (
        <SideDialog styles={classes.venueContainer}>
          {displayVenues()}
        </SideDialog>
      ) : null}
      {openModal()}
    </>
  ) : null;
};

export default AdminRequestShow;
