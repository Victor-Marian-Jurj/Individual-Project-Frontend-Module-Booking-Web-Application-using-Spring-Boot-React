import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const ReservationForm = ({
  reservation,
  formTitle,
  onSaveReservation,
  buttonLabel,
  isReadonly,
}) => {
  const [firstName, setFirstName] = useState(reservation.firstName || "");
  const [lastName, setLastName] = useState(reservation.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(reservation.phoneNumber || "");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailAddress, setEmailAddress] = useState(
    reservation.emailAddress || ""
  );
  const [emailError, setEmailError] = useState(false);
  const [checkInDate, setCheckInDate] = useState(
    reservation.checkInDate ? new Date(reservation.checkInDate) : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    reservation.checkOutDate ? new Date(reservation.checkOutDate) : null
  );
  const [dateError, setDateError] = useState(false);
  const [roomPrice, setRoomPrice] = useState(
    parseFloat(reservation.roomPrice) || 0
  );
  const [roomPriceError, setRoomPriceError] = useState(false);
  const [roomType, setRoomType] = useState(reservation.roomType || "");
  const [paymentMethod, setPaymentMethod] = useState(
    reservation.paymentMethod || ""
  );
  const [totalPayment, setTotalPayment] = useState(
    parseFloat(reservation.totalPayment) || 0
  );

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  useEffect(() => {
    calculateTotalPayment();
  }, [checkInDate, checkOutDate, roomPrice]);

  const handleFirstNameChange = (event) => {
    const { value } = event.target;
    setFirstName(value);
    if (!isValidName(value)) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
  };

  const handleLastNameChange = (event) => {
    const { value } = event.target;
    setLastName(value);
    if (!isValidName(value)) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const handleEmailAddressChange = (event) => {
    const { value } = event.target;
    setEmailAddress(value);
    validateEmailAddress(value);
  };

  const validatePhoneNumber = (value) => {
    const isValid = /^\d{10}$/.test(value);
    setPhoneNumberError(!isValid);
  };

  const validateEmailAddress = (value) => {
    const isValid =
      /^[a-zA-Z]*[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setEmailError(!isValid);
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    if (date > checkOutDate || date < new Date()) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    if (date < checkInDate || date < new Date()) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const calculateNumberOfNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(checkInDate);
    const secondDate = new Date(checkOutDate);

    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
  };

  const calculateTotalPayment = () => {
    const numberOfNights = calculateNumberOfNights();
    if (numberOfNights >= 0 && !isNaN(roomPrice)) {
      const calculatedTotalPayment = roomPrice * numberOfNights;
      setTotalPayment(calculatedTotalPayment);
    } else {
      setTotalPayment(0);
    }
  };

  const handleRoomPriceChange = (event) => {
    const { value } = event.target;
    if (/^\d{1,4}$/.test(value)) {
      setRoomPrice(parseFloat(value)); // Ensure the value is a number
      setRoomPriceError(false);
    } else {
      setRoomPriceError(true);
    }
  };

  const handleSaveReservation = () => {
    onSaveReservation(
      reservation.reservationId,
      reservation.hotelId,
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      checkInDate ? format(checkInDate, "yyyy-MM-dd") : "",
      checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : "",
      roomType,
      roomPrice,
      paymentMethod,
      totalPayment
    );
  };

  // Check if all required fields are valid
  const isFormValid =
    firstName &&
    lastName &&
    !firstNameError &&
    !lastNameError &&
    phoneNumber &&
    !phoneNumberError &&
    emailAddress &&
    !emailError &&
    checkInDate &&
    checkOutDate &&
    !dateError &&
    !roomPriceError;

  const isValidName = (name) => {
    const regex = /^[a-zA-Z]{0,20}$/; // Regex to allow only letters and limit to 20 characters
    return regex.test(name);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "left",
        justifyContent: "center",
      }}
    >
      <h1>{formTitle}</h1>
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
        error={firstNameError}
        helperText={
          firstNameError &&
          "Please enter up to 20 letters only. No numbers inside"
        }
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
        error={lastNameError}
        helperText={
          lastNameError &&
          "Please enter up to 20 letters only. No numbers inside"
        }
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        error={phoneNumberError}
        helperText={phoneNumberError && "Please enter a valid phone number"}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Email Address"
        value={emailAddress}
        onChange={handleEmailAddressChange}
        error={emailError}
        helperText={emailError && "Please enter a valid email address"}
      />
      <TextField
        variant="outlined"
        label="Room Price"
        value={roomPrice}
        onChange={handleRoomPriceChange}
        error={roomPriceError}
        helperText={
          roomPriceError && "Please enter a valid room price (up to 4 digits)"
        }
        disabled={isReadonly}
      />
      <DatePicker
        selected={checkInDate}
        onChange={handleCheckInDateChange}
        placeholderText="-- -- --"
        minDate={new Date()}
        disabled={isReadonly}
        popperPlacement="right-start"
        customInput={<TextField label="Check-in Date" variant="outlined" />}
        dateFormat="dd-MM-yyyy"
        className="datePickerContainer"
      />
      <DatePicker
        selected={checkOutDate}
        onChange={handleCheckOutDateChange}
        placeholderText="-- -- --"
        minDate={checkInDate}
        disabled={isReadonly}
        popperPlacement="right-start"
        customInput={<TextField label="Check-out Date" variant="outlined" />}
        dateFormat="dd-MM-yyyy"
        className="datePickerContainer"
      />
      <p
        style={{
          color: "#D32F2F",
          margin: "0px 0px 0",
          fontSize: "0.68rem",
          fontFamily: "sans-serif",
        }}
      >
        {dateError && "Please select valid check-in and check-out dates."}
      </p>
      <FormControl variant="outlined" sx={{ width: "100%" }}>
        <InputLabel id="payment-method-label">Payment Method</InputLabel>
        <Select
          labelId="payment-method-label"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          label="Payment Method"
          input={<OutlinedInput label="Payment Method" />}
          disabled={isReadonly}
        >
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Card">Card</MenuItem>
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        disabled
        label="Total Payment"
        value={totalPayment}
      />
      {!!buttonLabel && (
        <Button
          variant="contained"
          onClick={handleSaveReservation}
          disabled={!isFormValid || isReadonly} // Disable button if form is invalid or in readonly mode
          sx={{
            maxWidth: "100px",
          }}
        >
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
};

export default ReservationForm;
