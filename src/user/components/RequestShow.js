import React, { useEffect, useState } from 'react';
import { fetchRequest, cancelRequest } from '../services/api';
import * as moment from 'moment';
import {
  QuestionModal,
  SideDialog,
  ItineraryDisplay,
  RequestContainer,
  Review
} from '../../elements';
import { useWindowSize } from '../../hooks'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  column: {
    width: '100%',
    boxSizing: 'border-box'
  },
  column1: {
    gridRow: '2/3'
  },
  column2: {
    gridRow: '3/4'
  }
});

const RequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);
  const size = useWindowSize()
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
      });
    }
  }, [userData]);

  const renderDialogOrItinerary = () => {
    if (request.fulfilled) {
      if (new Date(request.start_time) > new Date()) {
        return (
          <SideDialog>
            <p>
              Get excited! Your itinerary is all set. You will be getting text
              alerts starting on the morning of your date!
            </p>
          </SideDialog>
        );
      } else {
        return <ItineraryDisplay items={request.itinerary_items} />;
      }
    } else {
      return (
        <SideDialog>
          <p>We are busy working to get your night out all set up!</p>
          <p>
            Check back soon for confirmation that your itinerary is ready...
          </p>
        </SideDialog>
      );
    }
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

  console.log(window.innerWidth, window.innerHeight)

  return (
    <>
      {request ? (
        <>
          <div className={size.width >= 800 ? classes.column : classes.column1}>
            <RequestContainer
              title={`${friendlyRelativeDate()}!`}
              request={request}
            >
              {new Date(request.start_time) >= new Date() ? (
                <QuestionModal
                  buttonText='Cancel Request'
                  declineText='No way!'
                  acceptText='Yes, please cancel.'
                  navigateAwayAction={handleCancel}
                >
                  Are you sure you want to cancel this request?
                </QuestionModal>
              ) : <Review request={request} userData={userData} />}
            </RequestContainer>
          </div>
          <div className={size.width >= 800 ? classes.column : classes.column2}>{renderDialogOrItinerary()}</div>
        </>
      ) : null}
    </>
  );
};

export default RequestShow;
