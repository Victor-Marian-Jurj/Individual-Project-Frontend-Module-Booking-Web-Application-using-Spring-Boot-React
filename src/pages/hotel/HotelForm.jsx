import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useInput } from "../../hooks/useInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

// Function to parse and validate dates in DD-MM-YYYY format
const parseDate = (dateString) => {
  const parsedDate = new Date(dateString);
  return isNaN(parsedDate) ? new Date() : parsedDate;
};

const HotelForm = ({
  hotel,
  formTitle,
  onSaveHotel,
  buttonLabel,
  isReadonly,
  onCancelClick,
}) => {
  const [hotelName, handleHotelNameChange] = useInput(hotel.hotelName || "");
  const [hotelLocation, handleHotelLocationChange] = useInput(
    hotel.hotelLocation || ""
  );
  const [latitude, handleLatitudeChange] = useInput(hotel.latitude || "");
  const [longitude, handleLongitudeChange] = useInput(hotel.longitude || "");
  const [rating, handleRatingChange] = useInput(hotel.rating || "");
  const [wifiConnection, handleWifiConnectionChange] = useInput(
    hotel.wifiConnection || ""
  );
  const [breakfast, handleBreakfastChange] = useInput(hotel.breakfast || "");
  const [privateParking, handlePrivateParkingChange] = useInput(
    hotel.privateParking || ""
  );
  const [minibar, handleMinibarChange] = useInput(hotel.minibar || "");
  const [price, handlePriceChange] = useInput(hotel.price || "");
  const [room, handleRoom] = useInput(hotel.room || "");
  const [checkInInterval, setCheckInInterval] = useState(
    parseDate(hotel.checkInInterval || "")
  );
  const [checkOutInterval, setCheckOutInterval] = useState(
    parseDate(hotel.checkOutInterval || "")
  );
  const navigate = useNavigate();

  const [dateError, setDateError] = useState(false);
  const [priceError, setPriceError] = useState("");
  const [formError, setFormError] = useState(false);

  const handleCheckInDateChange = (date) => {
    if (date >= checkOutInterval || date < new Date().setHours(0, 0, 0, 0)) {
      setDateError(true);
    } else {
      setDateError(false);
      setCheckInInterval(date);
    }
  };

  const handleCheckOutDateChange = (date) => {
    if (date <= checkInInterval || date < new Date().setHours(0, 0, 0, 0)) {
      setDateError(true);
    } else {
      setDateError(false);
      setCheckOutInterval(date);
    }
  };

  const handlePriceValidation = (value) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length > 4) {
      setPriceError("Room price cannot exceed 4 digits.");
    } else if (numericValue.length < 3 && numericValue.length > 0) {
      setPriceError("Room price must be at least 3 digits.");
    } else if (numericValue.length === 0) {
      setPriceError("Room price is required.");
    } else {
      setPriceError("");
    }

    return numericValue;
  };

  const handleSaveClick = () => {
    const validatedPrice = handlePriceValidation(price);

    if (
      !room ||
      !validatedPrice ||
      !rating ||
      !breakfast ||
      !wifiConnection ||
      !privateParking ||
      !minibar ||
      dateError
    ) {
      setFormError(true);
    } else {
      setFormError(false);
      onSaveHotel(
        hotelName,
        hotelLocation,
        latitude,
        longitude,
        rating,
        breakfast,
        privateParking,
        minibar,
        room,
        validatedPrice,
        checkInInterval,
        checkOutInterval
      );
    }
  };

  const isFormValid = () =>
    room &&
    price &&
    !priceError &&
    rating &&
    breakfast !== "" &&
    wifiConnection !== "" &&
    privateParking !== "" &&
    minibar !== "" &&
    !dateError;

  const handleCancelClick = () => {
    navigate("/hotel.manager/hotels");
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>{formTitle}</h1>

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Name"
        value={hotelName}
        onChange={handleHotelNameChange}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Location"
        value={hotelLocation}
        onChange={handleHotelLocationChange}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Latitude"
        value={latitude}
        onChange={handleLatitudeChange}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Longitude"
        value={longitude}
        onChange={handleLongitudeChange}
      />

      <InputLabel>Rating</InputLabel>
      <Select
        variant="outlined"
        disabled={isReadonly}
        value={rating}
        onChange={handleRatingChange}
      >
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
        <MenuItem value="5">5</MenuItem>
      </Select>

      <InputLabel>Room type</InputLabel>
      <Select
        variant="outlined"
        disabled={isReadonly}
        value={room}
        onChange={handleRoom}
      >
        <MenuItem value="Single">Single</MenuItem>
        <MenuItem value="Double">Double</MenuItem>
      </Select>

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Room price"
        value={price}
        onChange={handlePriceChange}
        error={!!priceError}
        helperText={priceError}
        inputProps={{ maxLength: 5 }}
      />

      <DatePicker
        selected={checkInInterval}
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
        selected={checkOutInterval}
        onChange={handleCheckOutDateChange}
        placeholderText="-- -- --"
        minDate={checkInInterval}
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

      <InputLabel>Breakfast</InputLabel>
      <Select
        variant="outlined"
        disabled={isReadonly}
        value={breakfast}
        onChange={handleBreakfastChange}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </Select>

      <InputLabel>WiFi connection</InputLabel>
      <Select
        variant="outlined"
        disabled={isReadonly}
        value={wifiConnection}
        onChange={handleWifiConnectionChange}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </Select>

      <InputLabel>Private parking</InputLabel>
      <Select
        variant="outlined"
        disabled={isReadonly}
        value={privateParking}
        onChange={handlePrivateParkingChange}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </Select>

      <InputLabel>Minibar</InputLabel>
      <Select
        variant="outlined"
        disabled={isReadonly}
        value={minibar}
        onChange={handleMinibarChange}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </Select>

      {!!buttonLabel && (
        <Button
          variant="contained"
          onClick={handleSaveClick}
          disabled={!isFormValid() || isReadonly} // Disable button if form is invalid or in readonly mode
          sx={{
            maxWidth: "100px",
          }}
        >
          {buttonLabel}
        </Button>
      )}

      <Button
        variant="outlined"
        onClick={handleCancelClick}
        sx={{ width: "100px", marginTop: "15px" }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default HotelForm;
