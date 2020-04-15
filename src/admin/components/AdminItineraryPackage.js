import React, { useState, useEffect } from 'react';
import {
  Button,
  Errors,
  MyInput,
  Filter,
  Form,
  LoadingScreen
} from '../../elements';
import {
  createItineraryPackage,
  fetchItineraryPackage,
  updateItineraryPackage
} from '../services/api-admin';
import { fetchOptions } from '../../user/services/api';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    gridArea: 'main'
  },
  blurb: {
    margin: '10px',
    padding: '10px'
  }
});

const AdminItineraryPackage = props => {
  const { userData } = props;
  const [title, setTitle] = useState('');
  const [blurb, setBlurb] = useState('');
  const [neighborhoodSelection, setNeighborhoodSelection] = useState(null);
  const [priceRangeSelection, setPriceRangeSelection] = useState(null);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [errors, setErrors] = useState(null);
  const packageId = props.match.params.id;
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      fetchOptions('neighborhoods', userData).then(list => {
        list.sort((a, b) => a.name.localeCompare(b.name));
        setNeighborhoods(list);
        setNeighborhoodSelection(list[0].id);
      });
      fetchOptions('price_ranges', userData).then(list => {
        setPriceRanges(list);
        setPriceRangeSelection(list[0].id);
      });
      if (props.edit) {
        fetchItineraryPackage(userData, packageId).then(pkg => {
          setTitle(pkg.title);
          setBlurb(pkg.blurb);
          setNeighborhoodSelection(pkg.neighborhood_id);
          setPriceRangeSelection(pkg.price_range_id);
        });
      }
    }
  }, [userData]);

  const handleSubmit = () => {
    const data = {
      title,
      blurb,
      neighborhood_id: neighborhoodSelection,
      price_range_id: priceRangeSelection
    };

    let action = props.edit ? () => updateItineraryPackage(packageId, data, userData) : () => createItineraryPackage(data, userData)
    action().then(
      json => {
        if (!json.errors) {
          props.history.push(`/admin/itinerary_packages/${json.id}`);
        } else {
          setErrors({
            errorObj: json.errors.error_obj,
            fullMessages: json.errors.full_messages
          });
        }
      }
    )
  };

  const renderOptions = (array, attribute) => {
    return array.map(o => {
      return (
        <option key={o.id} value={o.id}>
          {o[`${attribute}`]}
        </option>
      );
    });
  };

  if (neighborhoodSelection === null || priceRangeSelection === null) {
    return <LoadingScreen />;
  }

  return (
    <div className={classes.container}>
      <Form>
        <h1>Create New Itinerary Package</h1>
        {errors ? <Errors errors={errors} /> : null}

        <MyInput
          placeholder='Package title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Filter
          value={neighborhoodSelection}
          onChange={e => setNeighborhoodSelection(e.target.value)}
        >
          {renderOptions(neighborhoods, 'name')}
        </Filter>

        <Filter
          value={priceRangeSelection}
          onChange={e => setPriceRangeSelection(e.target.value)}
        >
          {renderOptions(priceRanges, 'max_amount')}
        </Filter>

        <textarea
          className={classes.blurb}
          rows={5}
          placeholder='Write a blurb about this package...'
          value={blurb}
          onChange={e => setBlurb(e.target.value)}
        />

        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AdminItineraryPackage;
