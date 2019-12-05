import React, { useState, useEffect } from 'react';
import { fetchItineraryPackages } from './api-admin';
import { Link } from 'react-router-dom';
import {
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Button
} from '@material-ui/core/';

const AdminItineraryPackages = props => {
  const { userData } = props;
  const [allPackages, setAllPackages] = useState([]);
  const [filter, setFilter] = useState('');

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
        <li key={pkg.id} className='request-row'>
          <Link to={`/admin/itinerary_packages/${pkg.id}`}>
            <ul className='admin-row-list'>
              <li>
                {pkg.title +
                  ' - ' +
                  pkg.price_range.split(' ')[0] +
                  ' - ' +
                  pkg.neighborhood}
              </li>
            </ul>
          </Link>
        </li>
      );
    });
  };

  const renderMenuItems = () => {
    if (allPackages) {
      const neighborhoods = allPackages.map(p => p.neighborhood);
      const uniques = neighborhoods.filter((v, i, a) => a.indexOf(v) === i);
      return uniques.map(n => {
        return <MenuItem value={n}>{n}</MenuItem>;
      });
    }
  };

  const renderFilter = () => {
    return (
      <div className='filter'>
        <InputLabel id='select-label'>Filter By Neighborhood</InputLabel>
        <Select labelId='select-label' value={filter} onChange={handleChange}>
          {renderMenuItems()}
        </Select>
      </div>
    );
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  return (
    <>
      {allPackages.length > 0 ? (
        <>
          <Paper elevation={10} className='paper list-div'>
            <h1>Itinerary Packages</h1>
            <Link to='/admin/itinerary_packages/new'>
              <Button className='new-pkg-btn'>Make a New Package</Button>
            </Link>
            {renderFilter()}
            <ul className='request-list'>{renderPackages()}</ul>
          </Paper>
        </>
      ) : null}
    </>
  );
};

export default AdminItineraryPackages;
