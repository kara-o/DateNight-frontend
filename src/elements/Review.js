import React, { useState, useEffect } from 'react'
import { createReview } from '../user/services/api'
import { Button, Stars, Fieldset } from '.'
import { createUseStyles } from 'react-jss';
import * as moment from 'moment';

const useStyles = createUseStyles({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedbackTextArea: {
    resize: 'none',
    width: '100%',
    outline: 'none',
    margin: '10px',
    padding: '10px'
  },
  starsContainer: {
    fontSize: '24px'
  },
  smallPrint: {
    fontSize: '10px',
    marginTop: '0px',
    marginBottom: '20px'
  },
  boldText: {
    fontWeight: 'bold'
  },
  feedbackFieldSet: {
    textAlign: 'center',
    marginTop: '20px'
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
      return request.review.feedback ? <Fieldset styles={classes.feedbackFieldSet} legend='Feedback'><p>{request.review.feedback}</p></Fieldset> : null
    }
    else {
      return (
        <textarea
          placeholder='Any additional feedback?'
          className={classes.feedbackTextArea}
          rows={5}
          value={review.feedback}
          onChange={e => handleChangeFeedback(e.target.value)}
        />
      )
    }
  }

  return (
    <div className={classes.reviewContainer}>
      <h2>{admin ? (request.review ? 'Review' : 'Not reviewed.') : 'Your Review'}</h2>
      <div className={classes.starsContainer}>
        <Stars styles={classes.starsContainer} review={request.review ? request.review : review} onClick={handleClickStar} />
      </div>
      {renderFeedback()}
      {!admin && !request.review ? <Button onClick={handleSubmit}>Submit Review</Button> : null}
      {admin && request.review ?
        <div>
          <p className={classes.smallPrint}>Reviewed on: {moment(request.review.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div> : null}
    </div>

  )
}

export default Review;