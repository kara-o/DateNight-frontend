import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  star: {
    "&:hover": (onClick) => ({
      cursor: onClick ? "pointer" : "default",
    }),
  },
});

const Stars = ({ review = null, onClick = null, styles = null }) => {
  const classes = useStyles();
  const filledStar = "★";
  const emptyStar = "☆";

  const setStarColor = (id) => {
    if (review) {
      return id <= review.rating ? filledStar : emptyStar;
    }
    return emptyStar;
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((id) => {
      return (
        <span
          key={id}
          className={classes.star}
          onClick={onClick ? () => onClick(id) : null}
        >
          {setStarColor(id)}
        </span>
      );
    });
  };

  return <div className={styles}>{renderStars()}</div>;
};

export default Stars;
