import React, { useEffect, useState } from 'react';
import { fetchRequest, cancelRequest } from '../services/api';
import * as moment from 'moment';
import {
  QuestionModal,
  SideDialog,
  ItineraryItem,
  RequestContainer,
  ListContainer
} from '../../elements';

const RequestShow = props => {
  const { userData } = props;
  const requestId = props.match.params.id;
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (userData) {
      fetchRequest(userData, requestId).then(res => {
        setRequest(res.request);
      });
    }
  }, [userData]);

  const sortItinItemsByDate = items => {
    return items.sort((item1, item2) => {
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
  };

  const renderItinerary = () => {
    const sortedItems = sortItinItemsByDate(request.itinerary_items);
    return sortedItems.map(item => {
      return (
        <li key={item.id}>
          <ItineraryItem item={item} index={sortedItems.indexOf(item)} />
        </li>
      );
    });
  };

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
        return (
          <ListContainer title='Itinerary'>{renderItinerary()}</ListContainer>
        );
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
          <RequestContainer
            title={`${friendlyRelativeDate()}!`}
            request={request}
          >
            {new Date(request.start_time) >= new Date() ? (
              <QuestionModal
                questionText='Are you sure you want to cancel this request?'
                buttonText='Cancel Request'
                declineText='No way!'
                acceptText='Yes, please cancel.'
                navigateAwayAction={handleCancel}
              />
            ) : null}
          </RequestContainer>
          {renderDialogOrItinerary()}
        </>
      ) : null}
    </>
  );
};

export default RequestShow;
