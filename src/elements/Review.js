import React, { useState, useEffect } from 'react'
import { createReview } from '../user/services/api'
import { Button, Stars } from '.'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedback: {
    resize: 'none',
    width: '100%',
    outline: 'none',
    margin: '10px',
    padding: '10px'
  },
  starsContainer: {
    fontSize: '24px'
  }
});

const Review = ({ admin = false, request: initialRequest, userData }) => {
  const classes = useStyles()
  const [review, setReview] = useState({
    rating: 0,
    feedback: ''
  })
  const [request, setRequest] = useState(initialRequest)

  const handleClickStar = id => {
    if (request.review) {
      return;
    }
    setReview({
      ...review,
      rating: id
    })
  }

  const handleChangeFeedback = text => {
    setReview({
      ...review,
      feedback: text
    })
  }

  const handleSubmit = () => {
    createReview(userData, request.id, review).then(res => {
      setRequest({
        ...request,
        review
      })
      console.log(res.request.review)
    })
  }

  const renderFeedback = () => {
    if (request.review) {
      return request.review.feedback ? <p>{request.review.feedback}</p> : null
    }
    else {
      return (
        <textarea
          placeholder='Any additional feedback?'
          className={classes.feedback}
          rows={5}
          value={review.feedback}
          onChange={e => handleChangeFeedback(e.target.value)}
        />
      )
    }
  }

  return (
    <div className={classes.reviewContainer}>
      <h2>{admin ? (request.review ? 'Review:' : 'Not reviewed.') : (request.review ? 'Your review:' : 'Review your night out!')}</h2>
      <div className={classes.starsContainer}>
        <Stars styles={classes.starsContainer} review={request.review || request || null} onClick={handleClickStar} />
      </div>
      {renderFeedback()}
      {!request.review ? <Button onClick={handleSubmit}>Submit Review</Button> : null}
    </div>

  )
}

export default Review;