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
import { useInput } from "../../hooks/useInput";
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
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [dateError, setDateError] = useState(false);
  const [roomPrice, setRoomPrice] = useState(reservation.roomPrice || 0);
  const [roomType, setRoomType] = useState(reservation.roomType || "");
  const [paymentMethod, setPaymentMethod] = useState(
    reservation.paymentMethod || ""
  );
  const [totalPayment, setTotalPayment] = useState(
    reservation.totalPayment || 0
  );

  useEffect(() => {
    if (reservation.checkInDate) {
      setCheckInDate(new Date(reservation.checkInDate));
    }
    if (reservation.checkOutDate) {
      setCheckOutDate(new Date(reservation.checkOutDate));
    }
  }, [reservation]);

  useEffect(() => {
    calculateTotalPayment();
  }, [checkInDate, checkOutDate, roomPrice]);

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
    setRoomPrice(parseFloat(value) || 0); // Ensure the value is a number
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
    phoneNumber &&
    !phoneNumberError &&
    emailAddress &&
    !emailError &&
    checkInDate &&
    checkOutDate &&
    !dateError;

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
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
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
      <FormControl variant="outlined" sx={{ width: "100%" }}>
        <InputLabel id="room-type-label">Room Type</InputLabel>
        <Select
          labelId="room-type-label"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          label="Room Type"
          input={<OutlinedInput label="Room Type" />}
          disabled={isReadonly}
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Double">Double</MenuItem>
        </Select>
      </FormControl>
      <>
        <TextField
          variant="outlined"
          label="Room Price"
          value={roomPrice}
          onChange={handleRoomPriceChange}
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
      </>

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
