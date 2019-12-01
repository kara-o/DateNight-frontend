import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export default function SelectList({ array }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleListItemClick = (e, id) => {
    setSelectedId(id);
  };

  const renderListItems = array => {
    return array.map(item => {
      return (
        <ListItem
          key={item.id}
          button
          selected={selectedId === item.id}
          onClick={e => handleListItemClick(e, item.id)}
        >
          {item.id}
        </ListItem>
      );
    });
  };

  return (
    <div className={classes.root}>
      <List component='nav'>{renderListItems()}</List>
    </div>
  );
}
