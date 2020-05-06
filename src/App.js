import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {
  Login,
  SignUp,
  Request,
  RequestShow,
  UserHome,
} from "./user/components";
import {
  AdminHome,
  AdminItineraryPackage,
  AdminItineraryPackageShow,
  AdminItineraryPackages,
  AdminLogin,
  AdminRequestShow,
} from "./admin/components";
import { Navbar, Footer } from "./elements";
import { logoutUser } from "./user/services/api";
import {
  logoutAdmin,
  fetchRequests,
  fetchUpdatedRequest,
} from "./admin/services/api-admin";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  "@global": {
    "*": {
      boxSizing: "border-box",
      fontFamily: "Noto Sans, sans-serif",
    },
    body: {
      margin: "0px",
      overflowX: "hidden",
    },
    "#root": {
      maxWidth: "1500px",
      marginLeft: "auto",
      marginRight: "auto",
      minHeight: "100vh",
      display: "grid",
      gridTemplateRows: "50px auto 50px",
      gridTemplateAreas: `
      'navbar'
      'main'
      'footer'`,
      justifyItems: "center",
    },
    ".title-fantasy-font": {
      fontFamily: "Chalkduster, fantasy",
    },
  },
  mainContainer: {
    gridArea: "main",
    width: "100%",
    padding: "0 20px 0 20px",
    "@media all and (min-width: 900px)": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "10px",
    },
  },
});

const getUserData = () => {
  const userDataStr = localStorage.getItem("userData");
  if (!userDataStr) return null;
  return JSON.parse(userDataStr);
};

const App = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState(getUserData());
  const loggedIn = !!userData;
  const [allRequests, setAllRequests] = useState([]);
  const [invalidatedRequest, setInvalidatedRequest] = useState(null);

  const loginUser = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
  };

  const handleLogoutUser = () => {
    logoutUser(userData);
    localStorage.removeItem("userData");
    setUserData(null);
  };

  const handleLogoutAdmin = () => {
    logoutAdmin(userData);
    localStorage.removeItem("userData");
    setUserData(null);
  };

  useEffect(() => {
    let cancelled = false;
    if (userData) {
      fetchRequests(userData).then((json) => {
        if (cancelled) {
          return;
        }

        setAllRequests(json);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [userData]);

  useEffect(() => {
    let cancelled = false;
    if (invalidatedRequest) {
      fetchUpdatedRequest(userData, invalidatedRequest).then((res) => {
        if (cancelled) {
          return;
        }

        const updatedRequests = allRequests.map((obj) => {
          return obj.id === res.request.id ? res.request : obj;
        });
        setAllRequests(updatedRequests);
      });
    }
  }, [invalidatedRequest]);

  const handleInvalidatedRequest = (id) => {
    setInvalidatedRequest(id);
  };

  return (
    <>
      {loggedIn ? (
        <Navbar
          logoutAdmin={handleLogoutAdmin}
          logoutUser={handleLogoutUser}
          userData={userData}
        />
      ) : null}
      <div className={classes.mainContainer}>
        <Switch>
          <Route
            path="/login"
            render={(props) =>
              !loggedIn ? (
                <Login {...props} handleLogin={loginUser} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/signup"
            render={(props) =>
              !loggedIn ? <SignUp {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/requests/:id/edit"
            render={(props) =>
              loggedIn && !userData.admin ? (
                <Request edit={true} {...props} userData={userData} />
              ) : null
            }
          />
          <Route
            path="/requests/new"
            render={(props) =>
              loggedIn && !userData.admin ? (
                <Request {...props} userData={userData} />
              ) : null
            }
          />
          <Route
            path="/requests/:id"
            render={(props) =>
              loggedIn && !userData.admin ? (
                <RequestShow {...props} userData={userData} />
              ) : null
            }
          />
          <Route
            path="/admin/login"
            render={(props) => (
              <AdminLogin {...props} handleLogin={loginUser} />
            )}
          />
          <Route
            path="/admin/itinerary_packages/new"
            render={(props) => (
              <AdminItineraryPackage {...props} userData={userData} />
            )}
          />
          <Route
            path="/admin/itinerary_packages/:id/edit"
            render={(props) => (
              <AdminItineraryPackage
                {...props}
                edit={true}
                userData={userData}
              />
            )}
          />
          <Route
            path="/admin/itinerary_packages/:id"
            render={(props) => (
              <AdminItineraryPackageShow {...props} userData={userData} />
            )}
          />
          <Route
            path="/admin/itinerary_packages"
            render={(props) => (
              <AdminItineraryPackages {...props} userData={userData} />
            )}
          />
          <Route
            path="/admin/requests/:id"
            render={(props) => (
              <AdminRequestShow
                {...props}
                userData={userData}
                handleInvalidatedRequest={handleInvalidatedRequest}
              />
            )}
          />
          <Route
            path="/admin"
            render={(props) =>
              loggedIn && userData.admin ? (
                <AdminHome
                  {...props}
                  allRequests={allRequests}
                  userData={userData}
                />
              ) : (
                <Redirect to="/admin/login" />
              )
            }
          />
          <Route
            path="/"
            render={(props) =>
              loggedIn && !userData.admin ? (
                <UserHome {...props} userData={userData} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
