import React, { useState, useEffect } from 'react';
import { fetchItineraryPackages } from '../services/api-admin';
import { MyLink, ListContainer, ListItem, Filter } from '../../elements';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  packages: {
    gridColumn: '1/3',
    gridRow: 'auto'
  }
});

const AdminItineraryPackages = props => {
  const { userData } = props;
  const [allPackages, setAllPackages] = useState([]);
  const [filter, setFilter] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      fetchItineraryPackages(userData).then(json => setAllPackages(json));
    }
  }, [userData]);

  const renderPackages = () => {
    let pkgs;
    if (filter) {
      pkgs = allPackages.filter(pkg => pkg.neighborhood === filter);
    } else {
      pkgs = allPackages;
    }
    return pkgs.map(pkg => {
      return (
        <ListItem
          key={pkg.id}
          id={pkg.id}
          destination={`/admin/itinerary_packages/${pkg.id}`}
        >
          <p>{pkg.title}</p>
          <p>{pkg.price_range.split(' ')[0]}</p>
          <p>{pkg.neighborhood}</p>
          <p>{renderTotalDuration(pkg.itinerary_package_items)}</p>
        </ListItem>
      );
    });
  };

  const renderTotalDuration = venues => {
    let totalDuration = venues.reduce((sum, currentVenue) => {
      return sum + currentVenue.duration;
    }, 0);

    if (totalDuration >= 60) {
      const hours = Math.floor(totalDuration / 60);
      const minutes = totalDuration - hours * 60;
      return `${hours} hr ${minutes} min`;
    } else {
      return `${totalDuration} min)`;
    }
  };

  const renderMenuItems = () => {
    if (allPackages) {
      const neighborhoods = allPackages.map(p => p.neighborhood);
      const uniques = neighborhoods.filter((v, i, a) => a.indexOf(v) === i);
      return uniques.map(n => {
        return <option value={n}>{n}</option>;
      });
    }
  };

  const renderFilter = () => {
    return (
      <Filter
        title='Choose Neighborhood: '
        value={filter}
        onChange={handleChange}
      >
        {renderMenuItems()}
      </Filter>
    );
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  return (
    <>
      {allPackages.length > 0 ? (
        <>
          <ListContainer title='Itinerary Packages' styles={classes.packages}>
            <MyLink destination='/admin/itinerary_packages/new'>
              Make a New Package
            </MyLink>
            {renderFilter()}
            {renderPackages()}
          </ListContainer>
        </>
      ) : null}
    </>
  );
};

export default AdminItineraryPackages;
