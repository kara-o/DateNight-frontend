import React, { useEffect, useState } from 'react';
import { fetchRequest, cancelRequest } from '../services/api';
import * as moment from 'moment';
import { QuestionModal, SideDialog, ItineraryItem } from '../../elements';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  details: {
    marginTop: '0px'
  }
});

const RequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
      });
    }
  }, [userData]);

  const renderContacts = () => {
    return request.contacts.map((c, i) => {
      return (
        <li key={c.id}>
          Contact #{i + 1}: {c.phone}
        </li>
      );
    });
  };

  const sortItinItemsByDate = items => {
    const sortedItems = items.sort((item1, item2) => {
      const time1 = new Date(item1.arrival_time);
      const time2 = new Date(item2.arrival_time);
      if (time1 > time2) {
        return 1;
      }
      if (time1 < time2) {
        return -1;
      }
      return 0;
    });

    return sortedItems.map(item => {
      return (
        <ItineraryItem
          key={item.id}
          item={item}
          index={sortedItems.indexOf(item)}
        />
      );
    });
  };

  const renderItinerary = () => {
    return (
      <>
        {request.fulfilled ? (
          new Date(request.start_time) > new Date() ? (
            <SideDialog>
              <p>
                Get excited! Your itinerary is all set. You will be getting text
                alerts starting on the morning of your date!
              </p>
            </SideDialog>
          ) : (
            <>
              {!request.itinerary_items.length
                ? 'Empty'
                : sortItinItemsByDate(request.itinerary_items)}
            </>
          )
        ) : (
          <SideDialog>
            <p>We are busy working to get your night out all set up!</p>
            <p>
              Check back soon for confirmation that your itinerary is ready...
            </p>
          </SideDialog>
        )}
      </>
    );
  };

  const friendlyRelativeDate = () => {
    const dateDay = moment(request.start_time).startOf('h:mm a');
    const now = moment();
    if (dateDay < now) {
      return `Your date was ${dateDay.fromNow()}`;
    } else if (dateDay.diff(now, 'days') < 2) {
      return 'Your date is tomorrow';
    } else {
      return `Your date is ${dateDay.fromNow()}`;
    }
  };

  const handleCancel = () => {
    cancelRequest(userData, requestId).then(requestJson => {
      props.history.push({
        pathname: '/',
        state: { cancelledRequest: requestJson }
      });
    });
  };

  return (
    <>
      {request ? (
        <>
          <SideDialog>
            <h2>{friendlyRelativeDate()}!</h2>
            <p className={classes.details}>
              <p>Date: {moment(request.start_time).format('MMMM Do YYYY')}</p>
              <p>Time: {moment(request.start_time).format('h:mm a')}</p>
              <p>Party: {request.party_size} people</p>
              <ul>{renderContacts()}</ul>
              <p>Neighborhood: {request.neighborhood}</p>
              <p>Price Range: {request.price_range}</p>
              {request.notes ? <p>Notes: {request.notes}</p> : null}
            </p>
            {new Date(request.start_time) >= new Date() ? (
              <QuestionModal
                questionText='Are you sure you want to cancel this request?'
                buttonText='Cancel Request'
                declineText='No way!'
                acceptText='Yes, please cancel.'
                navigateAwayAction={handleCancel}
              />
            ) : null}
          </SideDialog>
          {renderItinerary()}
        </>
      ) : null}
    </>
  );
};

export default RequestShow;
