import React from 'react';
import { Map, Button } from '.';
import * as moment from 'moment';
import { createUseStyles } from 'react-jss';
import { useWindowSize } from '../hooks'

const useStyles = createUseStyles({
  title: {
    margin: '0px',
    textAlign: 'center'
  },
  container: {
    border: '1px solid lightgrey',
    margin: '0px 20px 20px 20px',
    padding: '20px 20px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: '20px 0px 0px 0px'
  },
  size1: {
    width: '400px',
    height: '700px'
  },
  size2: {
    width: '500px',
    height: '700px'
  },
  size3: {
    width: '500px',
    height: '700px'
  },
  size4: {
    width: '650px',
    height: '850px'
  },
  details: {
    width: '100%'
  }
});

const ItineraryItem = props => {
  const { item, admin, handleRemove, index } = props;
  const classes = useStyles();
  const size = useWindowSize()

  const getClassName = () => {
    if (size.width < 600) {
      return 'size1'
    }
    else if (size.width > 600 && size.width < 800) {
      return 'size2'
    }
    else if (size.width >= 800 && size.width < 1000) {
      return 'size3'
    }
    else {
      return 'size4'
    }
  }

  const getNumberWithOrdinal = n => {
    //https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/13627586
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className={classes.container + ' ' + classes[`${getClassName()}`]}>
      <h3 className={classes.title}>{getNumberWithOrdinal(index + 1)} Stop</h3>
      <div className={classes.details}>
        <p>{moment(item.arrival_time).format('h:mm a')}</p>
        <p>{item.place}</p>
        <p>{item.address}</p>
        <p>{item.blurb}</p>
        {admin && item.make_res_link ? (
          <p>
            <a href={item.make_res_link} target='_blank'>
              Restaurant Link
            </a>
          </p>
        ) : null}
        <p>
          <a href={item.map_url} target='_blank'>
            Google Map
          </a>
        </p>
      </div>

      <Map url={item.map_iframe_url} />
      {admin ? (
        <Button styles={classes.button} onClick={() => handleRemove(item)}>
          Remove from Itinerary
        </Button>
      ) : null}
    </div>
  );
};

export default ItineraryItem;
