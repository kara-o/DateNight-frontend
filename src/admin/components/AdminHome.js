import React, { useState, useEffect } from "react";
import { fetchRequests } from "../services/api-admin";
import { ListContainer, ListItem, Stars, Button } from "../../elements";
import * as moment from "moment";
import { createUseStyles } from "react-jss";
import { createPalette } from "@material-ui/core/styles";

const useStyles = createUseStyles({
  mainContainer: {
    gridColumn: "1/3",
    gridRow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonsDiv: {
    marginTop: "20px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
  },
  button: {
    flex: 1,
    padding: "5px",
  },
  filter: {
    padding: "20px 0px 20px 0px",
  },
  redText: {
    color: "red",
  },
  italicFont: {
    fontStyle: "italic",
  },
});

const AdminHome = (props) => {
  const { allRequests } = props;
  // const [allRequests, setAllRequests] = useState([]);
  const [selectedButton, setSelectedButton] = useState("unfulfilled");
  const classes = useStyles();

  // useEffect(() => {
  //   let cancelled = false;
  //   if (userData) {
  //     fetchRequests(userData).then((json) => {
  //       if (cancelled) {
  //         return;
  //       }

  //       setAllRequests(json);
  //     });
  //   }
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [userData]);

  const filterUnfulfilled = (requests) => {
    return requests.filter((r) => !r.fulfilled && !r.cancelled);
  };

  const filterCancelled = (requests) => {
    return requests.filter(
      (r) => r.cancelled && r.fulfilled && !r.admin_addressed_cancel
    );
  };

  const filterNewReview = (requests) => {
    return requests.filter((r) => r.review && !r.review.admin_reviewed);
  };

  const filterCompleted = (requests) => {
    return requests.filter(
      (r) => r.fulfilled && !r.cancelled && new Date(r.start_time) < new Date()
    );
  };

  const renderRequests = () => {
    let requests, columns;
    if (selectedButton === "unfulfilled") {
      requests = filterUnfulfilled(allRequests);
      columns = "twoColumns";
    } else if (selectedButton === "cancelled") {
      requests = filterCancelled(allRequests);
      columns = "twoColumns";
    } else if (selectedButton === "new review") {
      requests = filterNewReview(allRequests);
      columns = "threeColumns";
    } else if (selectedButton === "completed") {
      requests = filterCompleted(allRequests);
      columns = "threeColumns";
    } else {
      requests = allRequests;
      columns = "threeColumns";
    }
    if (selectedButton === "1") {
      requests.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    } else {
      requests.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    }

    return requests.length ? (
      requests.map((r) => {
        let status;
        if (r.fulfilled) {
          if (new Date(r.start_time) < new Date() && !r.cancelled) {
            status = "COMPLETED";
          } else {
            status = "FULFILLED";
          }
        } else {
          status = "UNFULFILLED";
        }
        return (
          <ListItem
            styles={columns}
            key={r.id}
            id={r.id}
            destination={`/admin/requests/${r.id}`}
          >
            <p>{moment(r.start_time).calendar()}</p>
            <p>
              {status}
              {r.cancelled ? (
                <span className={classes.redText}> - CANCELLED</span>
              ) : null}
            </p>
            <p>{r.review ? <Stars review={r.review} /> : null}</p>
          </ListItem>
        );
      })
    ) : (
      <p className={classes.italicFont}>No new requests for this category!</p>
    );
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.buttonsDiv}>
        <Button
          styles={classes.button}
          onClick={() => setSelectedButton("unfulfilled")}
        >
          Unfulfilled{" "}
          <span className={classes.italicFont}>
            ({filterUnfulfilled(allRequests).length})
          </span>
        </Button>
        <Button
          styles={classes.button}
          onClick={() => setSelectedButton("cancelled")}
        >
          Cancelled{" "}
          <span className={classes.italicFont}>
            ({filterCancelled(allRequests).length})
          </span>
        </Button>
        <Button
          styles={classes.button}
          onClick={() => setSelectedButton("new review")}
        >
          Newly Reviewed{" "}
          <span className={classes.italicFont}>
            ({filterNewReview(allRequests).length})
          </span>
        </Button>
        <Button
          styles={classes.button}
          onClick={() => setSelectedButton("completed")}
        >
          Completed{" "}
          <span className={classes.italicFont}>
            ({filterCompleted(allRequests).length})
          </span>
        </Button>
        <Button
          styles={classes.button}
          onClick={() => setSelectedButton("all")}
        >
          All
        </Button>
      </div>
      <ListContainer>{renderRequests()}</ListContainer>
    </div>
  );
};

export default AdminHome;
