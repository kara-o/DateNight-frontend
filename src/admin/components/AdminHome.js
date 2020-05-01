import React, { useState, useEffect } from "react";
import { fetchRequests } from "../services/api-admin";
import { ListContainer, ListItem, Filter, Stars, Button } from "../../elements";
import * as moment from "moment";
import { createUseStyles } from "react-jss";

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
  const [cancelledRequests, setCancelledRequests] = useState({
    cancelled: [],
    show: false,
  });
  const [newlyReviewed, setNewlyReviewed] = useState({
    newlyReviewed: [],
    show: false,
  });
  const [filter, setFilter] = useState("Unfulfilled");
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      fetchRequests(userData).then((json) => {
        setAllRequests(json);
        setCancelledRequests({
          ...cancelledRequests,
          cancelled: json.filter((r) => r.cancelled && r.fulfilled),
        });
        setNewlyReviewed({
          ...newlyReviewed,
          newlyReviewed: json.filter(
            (r) => r.review && !r.review.admin_reviewed
          ),
        });
      });
    }
  }, []);

  const renderRequests = () => {
    let requests;
    if (cancelledRequests.show) {
      requests = cancelledRequests.cancelled;
    } else if (newlyReviewed.show) {
      requests = newlyReviewed.newlyReviewed;
    } else if (filter === "Unfulfilled") {
      requests = allRequests.filter((r) => !r.fulfilled);
    } else if (filter === "Completed") {
      requests = allRequests.filter(
        (r) =>
          r.fulfilled && !r.cancelled && new Date(r.start_time) < new Date()
      );
    } else {
      requests = allRequests;
    }
    requests.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    return requests.map((r) => {
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
          styles={
            filter === "Unfulfilled" ? "unfulfilledOnly" : "upcomingPastDates"
          }
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
    });
  };

  const handleChange = (e) => {
    const optionsArray = Array.from(e.target.options);
    optionsArray
      .filter((option) => option.selected)
      .forEach((option) => setFilter(option.value));
  };

  const renderFilter = () => {
    return (
      <Filter
        styles={classes.filter}
        title="Filter: "
        value={filter}
        onChange={handleChange}
      >
        <option value="Unfulfilled">Unfulfilled</option>
        <option value="New Reviews">New Reviews</option>
        <option value="Completed">Completed</option>
        <option value="All">All</option>
      </Filter>
    );
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.buttonsDiv}>
        <Button
          onClick={() => {
            setCancelledRequests({ ...cancelledRequests, show: false });
            setNewlyReviewed({ ...newlyReviewed, show: false });
          }}
        >
          Unfulfilled
        </Button>
        <Button
          onClick={() => {
            setCancelledRequests({ ...cancelledRequests, show: true });
            setNewlyReviewed({ ...newlyReviewed, show: false });
          }}
        >
          Cancelled{" "}
          <span className={classes.italicFont}>
            ({cancelledRequests.length ? cancelledRequests.length : 0})
          </span>
        </Button>
        <Button
          onClick={() => {
            setNewlyReviewed({ ...newlyReviewed, show: true });
            setCancelledRequests({ ...cancelledRequests, show: false });
          }}
        >
          Newly Reviewed{" "}
          <span className={classes.italicFont}>
            ({newlyReviewed.length ? newlyReviewed.length : 0})
          </span>
        </Button>
      </div>
      <ListContainer>{renderRequests()}</ListContainer>
    </div>
  );
};

export default AdminHome;
