import React, { useState, useEffect } from "react";
import { createReview } from "../user/services/api";
import { updateAdminReview } from "../admin/services/api-admin";
import { Button, Stars, Fieldset, MyPaper } from ".";
import { createUseStyles } from "react-jss";
import * as moment from "moment";

const useStyles = createUseStyles({
  reviewContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  feedbackTextArea: {
    resize: "none",
    width: "100%",
    outline: "none",
    margin: "10px",
    padding: "10px",
  },
  starsContainer: {
    fontSize: "24px",
  },
  smallPrint: {
    fontSize: "10px",
    margin: "0px",
  },
  smallPrintDiv: {
    marginTop: "5px",
  },
  boldText: {
    fontWeight: "bold",
  },
  feedbackFieldSet: {
    textAlign: "center",
    margin: "20px auto 0px auto",
    width: "100%",
  },
  italic: {
    fontStyle: "italic",
  },
  button: {
    marginTop: "20px",
  },
  paper: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const Review = ({
  admin = false,
  request: initialRequest,
  userData,
  handleInvalidatedRequest = null,
}) => {
  const classes = useStyles();
  const [review, setReview] = useState({
    rating: 0,
    feedback: "",
  });
  const [request, setRequest] = useState(initialRequest);

  const handleClickStar = (id) => {
    if (request.review) {
      return;
    }
    if (review.rating && review.rating === id) {
      setReview({
        ...review,
        rating: 0,
      });
    } else {
      setReview({
        ...review,
        rating: id,
      });
    }
  };

  const handleChangeFeedback = (text) => {
    setReview({
      ...review,
      feedback: text,
    });
  };

  const handleSubmit = () => {
    createReview(userData, request.id, review).then((res) => {
      setRequest({
        ...request,
        review,
      });
      console.log(res.request.review);
    });
  };

  const renderFeedback = () => {
    if (request.review) {
      return request.review.feedback ? (
        <Fieldset styles={classes.feedbackFieldSet} legend="Feedback">
          <p>{request.review.feedback}</p>
        </Fieldset>
      ) : null;
    } else {
      return (
        <textarea
          placeholder="Any additional feedback?"
          className={classes.feedbackTextArea}
          rows={5}
          value={review.feedback}
          onChange={(e) => handleChangeFeedback(e.target.value)}
        />
      );
    }
  };

  return (
    <div className={classes.reviewContainer}>
      {admin && !request.review ? (
        <h2 className="title-fantasy-font">Not yet reviewed.</h2>
      ) : (
        <>
          <h2 className="title-fantasy-font">
            {admin ? "Review" : "Your Review"}
          </h2>
          <MyPaper styles={classes.paper}>
            <div className={classes.starsContainer}>
              <Stars
                styles={classes.starsContainer}
                review={request.review ? request.review : review}
                onClick={handleClickStar}
              />
            </div>

            {renderFeedback()}
            {request.review ? (
              <div className={classes.smallPrintDiv}>
                <p className={classes.smallPrint}>
                  - Reviewed on{" "}
                  {moment(request.review.created_at).format(
                    "MMMM Do YYYY, [at] h:mm:ss a"
                  )}
                </p>
                {request.review.admin_reviewed ? (
                  <p className={classes.smallPrint}>
                    - Admin acknowledged on{" "}
                    {moment(request.review.admin_reviewed).format(
                      "MMMM Do YYYY, [at] h:mm:ss a"
                    )}
                  </p>
                ) : admin ? (
                  <label className={classes.smallPrint}>
                    Acknowledge{" "}
                    <input
                      className={classes.smallPrint}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateAdminReview(
                            userData,
                            request.id,
                            request.review.id,
                            new Date()
                          ).then((json) => {
                            if (!json.errors) {
                              setRequest({ ...request, review: json });
                              handleInvalidatedRequest(json.request.id);
                            } else {
                              console.log(
                                "There was an error updating the review"
                              );
                            }
                          });
                        }
                      }}
                      type="checkbox"
                    />
                  </label>
                ) : (
                  <p className={classes.smallPrint + " " + classes.italic}>
                    Admin has not yet seen your review
                  </p>
                )}
              </div>
            ) : null}
          </MyPaper>
          {!admin && !request.review ? (
            <Button styles={classes.button} onClick={handleSubmit}>
              Submit Review
            </Button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Review;
