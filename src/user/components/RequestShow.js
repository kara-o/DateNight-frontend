import React, { useEffect, useState } from 'react';
import { fetchRequest, cancelRequest } from '../services/api';
import * as moment from 'moment';
import {
  QuestionModal,
  SideDialog,
  ItineraryDisplay,
  RequestContainer,
  Rating
} from '../../elements';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  column: {
    width: '100%',
    boxSizing: 'border-box'
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

  return (
    <>
      {request ? (
        <>
          <div className={classes.column}>
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
              ) : <Rating request={request} />}
            </RequestContainer>
          </div>
          <div className={classes.column}>{renderDialogOrItinerary()}</div>
        </>
      ) : null}
    </>
  );
};

export default RequestShow;
