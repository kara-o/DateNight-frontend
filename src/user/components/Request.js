import React, { useState, useEffect } from "react";
import {
  QuestionModal,
  Form,
  MyInput,
  Filter,
  Button,
  SideDialog,
  Errors,
  Fieldset,
  MyPaper,
} from "../../elements";
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
      color: "turquoise",
      cursor: "pointer",
    },
    height: "18px",
  },
  column: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
  },
  noHelp: {
    gridColumn: "1/3",
  },
  withHelp: {
    gridColumn: "1/2",
  },
  filter: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  form: {
    padding: "0px",
  },
  fieldset: {
    marginBottom: "20px",
  },
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
    party_size: "2",
    notes: "",
  });
  const [neighborhoodSelection, setNeighborhoodSelection] = useState(null);
  const [priceRangeSelection, setPriceRangeSelection] = useState(null);
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
        setNeighborhoodSelection(list[0].id);
      });
      fetchOptions("price_ranges", userData).then((list) => {
        setPriceRanges(list);
        setPriceRangeSelection(list[0].id);
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
        <option key={o.id} value={o.id}>
          {o[`${attribute}`]}
        </option>
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
        <Button onClick={() => setShowHelp(false)}>Got it!</Button>
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
          <h2 className={classes.requestTitle + " " + "title-fantasy-font"}>
            What kind of night do you want?
          </h2>

          <p className={classes.helpLink} onClick={() => setShowHelp(true)}>
            {!showHelp ? "*Tell me more!" : null}
          </p>

          <MyPaper>
            <Form styles={classes.form}>
              {errors ? <Errors errors={errors} /> : null}
              <Fieldset styles={classes.fieldset} legend="Date and Time">
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
              <Fieldset styles={classes.fieldset} legend="Specifics">
                <Filter
                  title="Party Size: "
                  value={formData.party_size}
                  onChange={(e) => handleChange(e.target.value, "party_size")}
                  styles={classes.filter}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Filter>
                <Filter
                  styles={classes.fieldset}
                  title="Neighborhood: "
                  value={neighborhoodSelection}
                  onChange={(e) => setNeighborhoodSelection(e.target.value)}
                >
                  {renderOptions(neighborhoods, "name")}
                </Filter>
                <Filter
                  styles={classes.fieldset}
                  title="Price Range: "
                  value={priceRangeSelection}
                  onChange={(e) => setPriceRangeSelection(e.target.value)}
                  styles={classes.filter}
                >
                  {renderOptions(priceRanges, "max_amount")}
                </Filter>
              </Fieldset>
              <Fieldset styles={classes.fieldset} legend="Contacts (up to 4)">
                {contacts
                  .concat([""])
                  .slice(0, 4) // limit to 4
                  .map((contact, i) => (
                    <MyInput
                      key={i}
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
          </MyPaper>
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
