import React, { useState } from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    padding: '10px',
    fontSize: '24px'
  },
  star: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const Rating = ({ admin = false, request }) => {
  const classes = useStyles()
  const [stars, setStars] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false
  })
  const filledStar = '★'
  const emptyStar = '☆'

  const handleClick = id => {
    const idToNum = parseInt(id, 10)

    let updatedStars = {}

    if (stars[id] && stars[`${idToNum + 1}`]) {
      for (let i = 5; i > idToNum; i--) {
        updatedStars[`${i}`] = false
      }
    }
    else {
      for (let i = 1; i <= idToNum; i++) {
        updatedStars[`${i}`] = !stars[id]
      }
      for (let i = 5; i > idToNum; i--) {
        updatedStars[`${i}`] = false
      }
    }

    setStars({ ...stars, ...updatedStars })
  }

  return (
    <div className={classes.container}>
      <span className={classes.star} onClick={e => handleClick(e.target.id)} id='1'>{!stars['1'] ? emptyStar : filledStar}</span>
      <span className={classes.star} onClick={e => handleClick(e.target.id)} id='2'>{!stars['2'] ? emptyStar : filledStar}</span>
      <span className={classes.star} onClick={e => handleClick(e.target.id)} id='3'>{!stars['3'] ? emptyStar : filledStar}</span>
      <span className={classes.star} onClick={e => handleClick(e.target.id)} id='4'>{!stars['4'] ? emptyStar : filledStar}</span>
      <span className={classes.star} onClick={e => handleClick(e.target.id)} id='5'>{!stars['5'] ? emptyStar : filledStar}</span>
    </div>
  )
}

export default Rating;