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
import { useState } from "react";
import { format } from "date-fns";

// Function to parse and validate dates in DD-MM-YYYY format
const parseDate = (dateString) => {
  const parsedDate = new Date(dateString);
  return isNaN(parsedDate) ? new Date() : parsedDate;
};

const ReservationFormNoId = ({
  reservation,
  formTitle,
  onSaveReservation,
  buttonLabel,
  isReadonly,
  hotelId,
}) => {
  const [firstName, handleFirstName] = useInput(reservation.firstName);
  const [lastName, handleLastName] = useInput(reservation.lastName);
  const [phoneNumber, setPhoneNumber] = useState(reservation.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailAddress, setEmailAddress] = useState(reservation.emailAddress);
  const [emailError, setEmailError] = useState(false);
  const [checkInDate, setCheckInDate] = useState(
    parseDate(reservation.checkInDate)
  );
  const [checkOutDate, setCheckOutDate] = useState(
    parseDate(reservation.checkOutDate)
  );
  const [dateError, setDateError] = useState(false);
  const [roomPrice, handleRoomPrice] = useInput(reservation.roomPrice);
  const [roomType, setRoomType] = useState(reservation.roomType);
  const [paymentMethod, setPaymentMethod] = useState(reservation.paymentMethod);
  const [totalPayment, handleTotalPaymentChange] = useInput(
    reservation.totalPayment
  );

  const paymentOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
  ];

  const roomTypeOptions = [
    { value: "Single", label: "Single" },
    { value: "Double", label: "Double" },
  ];

  const handlePhoneNumber = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
    if (isPhoneNumberValid(value)) {
      setPhoneNumberError(false);
    }
  };

  const handlePhoneNumberBlur = () => {
    if (!isPhoneNumberValid(phoneNumber)) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
  };

  const handleEmailAddress = (event) => {
    const { value } = event.target;
    setEmailAddress(value);
    if (isEmailValid(value)) {
      setEmailError(false);
    }
  };

  const handleEmailAddressBlur = () => {
    if (!isEmailValid(emailAddress)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleCheckInDateChange = (date) => {
    if (date > checkOutDate || date < new Date()) {
      setDateError(true);
    } else {
      setDateError(false);
      setCheckInDate(date);
    }
  };

  const handleCheckOutDateChange = (date) => {
    if (date < checkInDate || date < new Date()) {
      setDateError(true);
    } else {
      setDateError(false);
      setCheckOutDate(date);
    }
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const isPhoneNumberValid = (phone) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
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
        onChange={handleFirstName}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Last Name"
        value={lastName}
        onChange={handleLastName}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumber}
        onBlur={handlePhoneNumberBlur}
        error={phoneNumberError}
        helperText={phoneNumberError && "Please enter a valid phone number"}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Email Address"
        value={emailAddress}
        onChange={handleEmailAddress}
        onBlur={handleEmailAddressBlur}
        error={emailError}
        helperText={emailError && "Please enter a valid email address"}
      />
      <>
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInDateChange}
          minDate={new Date()}
          disabled={isReadonly}
          popperPlacement="right-start"
          customInput={<TextField label="Check-in Date" variant="outlined" />}
          dateFormat="dd-MM-yyyy"
          className="datePickerContainer" // Add this line
        />
        <DatePicker
          selected={checkOutDate}
          onChange={handleCheckOutDateChange}
          minDate={checkInDate}
          disabled={isReadonly}
          popperPlacement="right-start"
          customInput={<TextField label="Check-out Date" variant="outlined" />}
          dateFormat="dd-MM-yyyy"
          className="datePickerContainer" // Add this line
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
        <InputLabel id="room-type-label">Room Type</InputLabel>
        <Select
          labelId="room-type-label"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          label="Room Type"
          input={<OutlinedInput label="Room Type" />}
          disabled={isReadonly}
        >
          {roomTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
          {paymentOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Room Price"
        value={roomPrice}
        onChange={handleRoomPrice}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Total Payment"
        value={totalPayment}
        onChange={handleTotalPaymentChange}
      />
      {!!buttonLabel && (
        <Button
          variant="contained"
          onClick={() =>
            onSaveReservation(
              hotelId,
              firstName,
              lastName,
              phoneNumber,
              emailAddress,
              checkInDate,
              checkOutDate,
              roomType,
              roomPrice,
              paymentMethod,
              totalPayment
            )
          }
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

export default ReservationFormNoId;
