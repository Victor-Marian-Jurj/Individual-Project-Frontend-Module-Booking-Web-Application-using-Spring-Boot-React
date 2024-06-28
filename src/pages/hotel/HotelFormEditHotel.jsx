import {
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import { useInput } from "../../hooks/useInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

// Function to parse and validate dates in DD-MM-YYYY format
const parseDate = (dateString) => {
  const parsedDate = new Date(dateString);
  return isNaN(parsedDate) ? new Date() : parsedDate;
};

const HotelFormEditHotel = ({
  hotel,
  buttonLabel,
  onSaveHotel,
  onCancelClick,
  isReadonly,
}) => {
  const [rating, handleRatingChange] = useInput(hotel.rating);
  const [breakfast, handleBreakfastChange] = useInput(hotel.breakfast);
  const [wifiConnection, handleWifiConnectionChange] = useInput(
    hotel.wifiConnection
  );
  const [privateParking, handlePrivateParkingChange] = useInput(
    hotel.privateParking
  );
  const [minibar, handleMinibarChange] = useInput(hotel.minibar);

  const [checkInInterval, setCheckInDate] = useState(
    parseDate(hotel.checkInInterval)
  );
  const [checkOutInterval, setCheckOutDate] = useState(
    parseDate(hotel.checkOutInterval)
  );
  const [room, handleRoom] = useInput(hotel.room);

  const [dateError, setDateError] = useState(false);
  const [price, setPrice] = useState(hotel.price);
  const [priceError, setPriceError] = useState("");
  const [formError, setFormError] = useState(false); // Adjusted state

  const handleCheckInDateChange = (date) => {
    if (date >= checkOutInterval || date < new Date().setHours(0, 0, 0, 0)) {
      setDateError(true);
    } else {
      setDateError(false);
      setCheckInDate(date);
    }
  };

  const handleCheckOutDateChange = (date) => {
    if (date <= checkInInterval || date < new Date().setHours(0, 0, 0, 0)) {
      setDateError(true);
    } else {
      setDateError(false);
      setCheckOutDate(date);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
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

    setPrice(numericValue);
  };

  const handleSaveClick = () => {
    if (
      !room ||
      !price ||
      !rating ||
      !breakfast ||
      !wifiConnection ||
      !privateParking ||
      !minibar ||
      dateError
    ) {
      setFormError(true); // Set formError to true only when there's a form-level error
    } else {
      setFormError(false);
      onSaveHotel(
        room,
        price,
        checkInInterval,
        checkOutInterval,
        rating,
        breakfast,
        wifiConnection,
        privateParking,
        minibar
      );
    }
  };

  const isFormValid = () =>
    price &&
    !priceError &&
    rating &&
    room &&
    breakfast !== undefined &&
    wifiConnection !== undefined &&
    privateParking !== undefined &&
    minibar !== undefined &&
    !dateError;

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
        <div>
          <div style={{ marginBottom: "15px" }}>
            <Button
              variant="contained"
              onClick={handleSaveClick}
              disabled={!isFormValid()}
              sx={{
                maxWidth: "100px",
                width: "140px",
              }}
            >
              {buttonLabel}
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={onCancelClick}
              sx={{ display: "block", width: "100px" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {formError && !isFormValid() && (
        <p
          style={{
            color: "#D32F2F",
            margin: "0px 0px 0",
            fontSize: "0.68rem",
            fontFamily: "sans-serif",
          }}
        >
          Please fill in all required fields.
        </p>
      )}
    </Box>
  );
};

export default HotelFormEditHotel;
