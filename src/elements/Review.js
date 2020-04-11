import React, { useState, useEffect } from 'react'
import { createReview } from '../user/services/api'
import { Button } from '.'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  starsContainer: {
    fontSize: '24px'
  },
  star: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const Review = ({ admin = false, request, userData }) => {
  const classes = useStyles()
  const [stars, setStars] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false
  })
  const [feedback, setFeedback] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const filledStar = '★'
  const emptyStar = '☆'

  useEffect(() => {
    if (request.review) {
      setSubmitted(true)
      const rating = request.review.rating
      let updatedStars = {}
      for (let i = 1; i <= rating; i++) {
        updatedStars[`${i}`] = true
      }
      setStars({
        ...stars, ...updatedStars
      })
    }
  }, [request])

  const handleClick = id => {
    if (request.review) {
      return;
    }
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

  const tallyScores = () => {
    let tally = 0
    for (let i = 1; i <= 5; i++) {
      if (stars[`${i}`]) {
        tally += 1
      }
    }
    return tally
  }

  const handleSubmit = () => {
    const rating = tallyScores()
    createReview(userData, request.id, rating, feedback).then(res => {
      setSubmitted(true)
      console.log(res.request.review)
    })
  }

  return (
    <div className={classes.mainContainer}>
      <h2>{request.review ? 'Your rating:' : 'Rate that date!'}</h2>
      <div className={classes.starsContainer}>
        <span className={classes.star} onClick={e => handleClick(e.target.id)} id='1'>{!stars['1'] ? emptyStar : filledStar}</span>
        <span className={classes.star} onClick={e => handleClick(e.target.id)} id='2'>{!stars['2'] ? emptyStar : filledStar}</span>
        <span className={classes.star} onClick={e => handleClick(e.target.id)} id='3'>{!stars['3'] ? emptyStar : filledStar}</span>
        <span className={classes.star} onClick={e => handleClick(e.target.id)} id='4'>{!stars['4'] ? emptyStar : filledStar}</span>
        <span className={classes.star} onClick={e => handleClick(e.target.id)} id='5'>{!stars['5'] ? emptyStar : filledStar}</span>
      </div>
      {!submitted && !request.review ? <Button onClick={handleSubmit}>Submit Review</Button> : null}
    </div>
  )
}

export default Review;