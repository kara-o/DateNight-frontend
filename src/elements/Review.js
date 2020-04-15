import React, { useState, useEffect } from 'react'
import { createReview } from '../user/services/api'
import { Button } from '.'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  starsContainer: {
    fontSize: '24px'
  },
  star: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  feedback: {
    resize: 'none',
    width: '100%',
    outline: 'none',
    margin: '10px',
    padding: '10px'
  }
});

const Review = ({ admin = false, request: initialRequest, userData }) => {
  const classes = useStyles()
  const [stars, setStars] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false
  })
  const [review, setReview] = useState({
    rating: 0,
    feedback: ''
  })
  const [request, setRequest] = useState(initialRequest)
  const filledStar = '★'
  const emptyStar = '☆'


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

  const setStarColor = id => {
    if (request.review) {
      return id <= request.review.rating ? filledStar : emptyStar
    }
    if (review) {
      return id <= review.rating ? filledStar : emptyStar
    }
    else {
      return emptyStar
    }
  }

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(id => {
      return <span key={id} className={classes.star} onClick={() => handleClickStar(id)}>{setStarColor(id)}</span>
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
      <h2>{request.review ? 'Your review:' : 'Review your night out!'}</h2>
      <div className={classes.starsContainer}>
        {renderStars()}
      </div>
      {renderFeedback()}
      {!request.review ? <Button onClick={handleSubmit}>Submit Review</Button> : null}
    </div>

  )
}

export default Review;