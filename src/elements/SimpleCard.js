import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from './Button';

const SimpleCard = ({ pkgItem, handleDelete }) => {
  return (
    <Card elevation={10} key={pkgItem.id} className='card'>
      <CardContent>
        <Typography className='card-title' color='textSecondary' gutterBottom>
          {pkgItem.place}
        </Typography>
        <Typography>{pkgItem.duration} minutes</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleDelete(pkgItem.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default SimpleCard;
