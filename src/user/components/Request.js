import React, { useState, useEffect } from "react";
import {
  QuestionModal,
  Form,
  MyInput,
  Filter,
  MyButton,
  SideDialog,
  Errors,
  Fieldset,
} from "../../elements";
import { MenuItem } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { fetchOptions, createRequest } from "../services/api";
import * as moment from "moment";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  textArea: {
    resize: "none",
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  requestTitle: {
    marginBottom: "5px",
  },
  requestContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  helpLink: {
    fontStyle: "italic",
    "&:hover": {
      color: "#533747",
      fontWeight: "bold",
      cursor: "pointer",
    },
    height: "18px",
  },
  column: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  noHelp: {
    gridColumn: "1/3",
  },
  withHelp: {
    gridColumn: "1/2",
  },
  filter: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  // fieldset: {
  //   marginBottom: "20px",
  // },
});

const DEFAULT_DATE_LENGTH_HOURS = 4;

const thisFriday = () => {
  const dayINeed = 5; // Friday
  const today = moment().isoWeekday();

  if (today < dayINeed) {
    return moment()
      .add(dayINeed - today, "days")
      .toDate();
  } else if (today > dayINeed) {
    return moment()
      .add(7 - today + dayINeed, "days")
      .toDate();
  } else {
    return moment().add(1, "week").toDate();
  }
};

const tomorrow = () => {
  return moment().add(1, "days").toDate();
};

const defaulStartTime = () => {
  return new Date(2000, 1, 1, 19, 0, 0);
};

const Request = (props) => {
  const { userData } = props;
  const [formData, setFormData] = useState({
    start_date: thisFriday(),
    start_time: defaulStartTime(),
    party_size: "",
    notes: "",
  });
  const [neighborhoodSelection, setNeighborhoodSelection] = useState("");
  const [priceRangeSelection, setPriceRangeSelection] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [contacts, setContacts] = useState([userData.user.phone]);
  const [errors, setErrors] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const classes = useStyles();

  //TODO add loading
  useEffect(() => {
    if (userData) {
      fetchOptions("neighborhoods", userData).then((list) => {
        list.sort((a, b) => a.name.localeCompare(b.name));
        setNeighborhoods(list);
      });
      fetchOptions("price_ranges", userData).then((list) => {
        setPriceRanges(list);
      });
    }
  }, [userData]);

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getPostData = () => {
    const startDate = new Date(
      formData.start_date.getFullYear(),
      formData.start_date.getMonth(),
      formData.start_date.getDate(),
      formData.start_time.getHours(),
      formData.start_time.getMinutes()
    );
    const endDate = moment(startDate)
      .add(DEFAULT_DATE_LENGTH_HOURS, "hours")
      .toDate();
    const data = {
      ...formData,
      start_time: startDate.toString(),
      end_time: endDate.toString(),
      neighborhood_id: neighborhoodSelection,
      price_range_id: priceRangeSelection,
      contacts_attributes: contacts.map((contact) => ({
        phone: contact,
      })),
    };
    delete data.start_date;
    delete data.end_date;
    return data;
  };

  const handleClose = () => {
    props.history.push("/");
  };

  const handleSubmit = () => {
    const data = getPostData();

    return createRequest(data, userData).then((json) => {
      if (!json.errors) {
        console.log("sucessfully created request!", json);
      } else {
        console.log("errors creating request!");
        setErrors({
          errorObj: json.errors.error_obj,
          fullMessages: json.errors.full_messages,
        });
      }
    });
  };

  const updateContactAt = (contact, i) => {
    const contactsCopy = contacts.slice();
    if (contact.length) {
      if (contacts.length === i) {
        contactsCopy.push(contact);
      } else {
        contactsCopy[i] = contact;
      }
    } else if (i < contacts.length) {
      contactsCopy.splice(i, 1);
    }
    setContacts(contactsCopy);
  };

  const renderOptions = (array, attribute) => {
    return array.map((o) => {
      return (
        <MenuItem key={o.id} value={o.id}>
          {o[`${attribute}`]}
        </MenuItem>
      );
    });
  };

  if (neighborhoodSelection === null || priceRangeSelection === null) {
    //TODO update???
    return <p></p>;
  }

  const renderHelpPage = () => {
    return (
      <SideDialog>
        <h3>
          Give us some guidance, then let us create the perfect night for you.
        </h3>
        <div className={classes.helpText}>
          <p>
            Choose the day and time for your date. Depending on your budget and
            special instructions, we will schedule up to a total duration of 4
            hours.
          </p>
          <p>Which area of Seattle do you want to go to?</p>
          <p>
            How big is your party? Let us know, we don't assume that everyone is
            a couple of 2 and we can make reservations for up to 4 people!
          </p>
          <p>
            Let us know your approximate budget per person. We cannot guarantee
            we will be exact, but we always try our best!
          </p>
          <p>
            Provide us up to four contact numbers where we will send text alerts
            containing your itinerary!
          </p>
          <p>
            Leave us any special requests in the notes sections, such as dietary
            restrictions/time constraints, etc. We want to make this night
            perfect for you!
          </p>
        </div>
        <h3>Press submit when you're done!</h3>
        <MyButton onClick={() => setShowHelp(false)}>Got it!</MyButton>
      </SideDialog>
    );
  };

  return (
    <>
      <div
        className={
          (showHelp ? classes.withHelp : classes.noHelp) + " " + classes.column
        }
      >
        <div className={classes.requestContainer}>
          <h1 className={classes.requestTitle + " " + "title-fantasy-font"}>
            What kind of night do you want?
          </h1>

          <p className={classes.helpLink} onClick={() => setShowHelp(true)}>
            {!showHelp ? "*Tell me more!" : null}
          </p>

          <Form>
            {errors ? <Errors errors={errors} /> : null}
            <Fieldset legend="Date and Time">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Date"
                  minDate={tomorrow()}
                  value={formData.start_date}
                  onChange={(date) => handleChange(date, "start_date")}
                />
                <KeyboardTimePicker
                  disableToolbar
                  variant="inline"
                  minutesStep={30}
                  margin="normal"
                  label="Time"
                  value={formData.start_time}
                  onChange={(time) => handleChange(time, "start_time")}
                />
              </MuiPickersUtilsProvider>
            </Fieldset>
            <Fieldset legend="Specifics">
              <Filter
                value={formData.party_size}
                onChange={(e) => handleChange(e.target.value, "party_size")}
                styles={classes.filter}
              >
                <MenuItem value="" disabled>
                  Party Size
                </MenuItem>
                <MenuItem value="1">1 person</MenuItem>
                <MenuItem value="2">2 people</MenuItem>
                <MenuItem value="3">3 people</MenuItem>
                <MenuItem value="4">4 people</MenuItem>
              </Filter>
              <Filter
                value={neighborhoodSelection}
                onChange={(e) => setNeighborhoodSelection(e.target.value)}
                styles={classes.filter}
              >
                <MenuItem value="" disabled>
                  Neighborhood
                </MenuItem>
                {renderOptions(neighborhoods, "name")}
              </Filter>
              <Filter
                value={priceRangeSelection}
                onChange={(e) => setPriceRangeSelection(e.target.value)}
                styles={classes.filter}
              >
                <MenuItem value="" disabled>
                  Price Range
                </MenuItem>
                {renderOptions(priceRanges, "max_amount")}
              </Filter>
            </Fieldset>
            <Fieldset legend="Contacts (up to 4)">
              {contacts
                .concat([""])
                .slice(0, 4) // limit to 4
                .map((contact, i) => (
                  <MyInput
                    key={i}
                    width={"100px"}
                    placeholder={`Phone ${i + 1}`}
                    value={contact}
                    type="tel"
                    onChange={(e) => updateContactAt(e.target.value, i)}
                  />
                ))}
            </Fieldset>
            <Fieldset legend="Notes">
              <textarea
                placeholder="Any additional notes for us?"
                className={classes.textArea}
                rows={5}
                value={formData.notes}
                onChange={(e) => handleChange(e.target.value, "notes")}
              />
            </Fieldset>
          </Form>

          <QuestionModal
            acceptText="Can't Wait!"
            navigateAwayAction={handleClose}
            buttonText="Submit Request"
            onClick={handleSubmit}
          >
            Success! We will get busy setting up your perfect night out! You
            will get your first text on the day of your date at 10 am!
          </QuestionModal>
        </div>
      </div>
      {showHelp ? (
        <div className={classes.column}>{renderHelpPage()}</div>
      ) : null}
    </>
  );
};

export default Request;
