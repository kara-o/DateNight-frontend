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
  const { userData } = props;
  const [allRequests, setAllRequests] = useState([]);
  const [unfulfilledRequests, setUnfulfilledRequests] = useState([]);
  const [cancelledRequests, setCancelledRequests] = useState([]);
  const [newlyReviewed, setNewlyReviewed] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [selectedButton, setSelectedButton] = useState("1");
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      fetchRequests(userData).then((json) => {
        setAllRequests(json);
        setUnfulfilledRequests(
          json.filter((r) => !r.fulfilled && !r.cancelled)
        );
        setCancelledRequests(
          json.filter(
            (r) => r.cancelled && r.fulfilled && !r.admin_addressed_cancel
          )
        );
        setNewlyReviewed(
          json.filter((r) => r.review && !r.review.admin_reviewed)
        );
        setCompletedRequests(
          json.filter(
            (r) =>
              r.fulfilled && !r.cancelled && new Date(r.start_time) < new Date()
          )
        );
      });
    }
  }, []);

  const renderRequests = () => {
    let requests, columns;
    if (selectedButton === "1") {
      requests = unfulfilledRequests;
      columns = "twoColumns";
    } else if (selectedButton === "2") {
      requests = cancelledRequests;
      columns = "twoColumns";
    } else if (selectedButton === "3") {
      requests = newlyReviewed;
      columns = "threeColumns";
    } else if (selectedButton === "4") {
      requests = completedRequests;
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
        <Button styles={classes.button} onClick={() => setSelectedButton("1")}>
          Unfulfilled
        </Button>
        <Button styles={classes.button} onClick={() => setSelectedButton("2")}>
          Cancelled{" "}
          <span className={classes.italicFont}>
            ({cancelledRequests.length ? cancelledRequests.length : 0})
          </span>
        </Button>
        <Button styles={classes.button} onClick={() => setSelectedButton("3")}>
          Newly Reviewed{" "}
          <span className={classes.italicFont}>
            ({newlyReviewed.length ? newlyReviewed.length : 0})
          </span>
        </Button>
        <Button styles={classes.button} onClick={() => setSelectedButton("4")}>
          Completed{" "}
          <span className={classes.italicFont}>
            ({completedRequests.length ? completedRequests.length : 0})
          </span>
        </Button>
        <Button
          styles={classes.button}
          onClick={() => setSelectedButton("All")}
        >
          All
        </Button>
      </div>
      <ListContainer>{renderRequests()}</ListContainer>
    </div>
  );
};

export default AdminHome;
