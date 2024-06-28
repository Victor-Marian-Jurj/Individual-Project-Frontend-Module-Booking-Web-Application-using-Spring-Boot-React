import { Box, TextField, Button } from "@mui/material";
import { useInput } from "..//..//../hooks/useInput";
import { useSelector } from "react-redux";

const HotelForm = ({
  hotel,
  formTitle,
  onSaveHotel,
  buttonLabel,
  isReadonly,
}) => {
  const [hotelName, handleHotelNameChange] = useInput(hotel.hotelName);
  const [hotelLocation, handleHotelLocationChange] = useInput(
    hotel.hotelLocation
  );
  const [latitude] = useInput(hotel.latitude);

  const [longitude] = useInput(hotel.longitude);

  const [rating, handleRatingChange] = useInput(hotel.rating);
  const [wifiConnection, handleWifiConnectionChange] = useInput(
    hotel.wifiConnection
  );
  const [breakfast, handleBreakfastChange] = useInput(hotel.breakfast);
  const [privateParking, handlePrivateParkingChange] = useInput(
    hotel.privateParking
  );
  const [minibar, handleMinibarChange] = useInput(hotel.minibar);
  const [price, handlePriceChange] = useInput(hotel.price);
  const [room, handleRoomChange] = useInput(hotel.room);
  const [checkInInterval, handleCheckInIntervalChange] = useInput(
    hotel.checkInInterval
  );
  const [checkOutInterval, handleCheckOutIntervalChange] = useInput(
    hotel.checkOutInterval
  );

  const hotels = useSelector((state) => state.hotelReducer.hotels);
  console.log(hotels);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItem: "center",
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
        label="Rating"
        value={rating}
        onChange={handleRatingChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Room type"
        value={room}
        onChange={handleRoomChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Room price"
        value={price}
        onChange={handlePriceChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Available check-in"
        value={checkInInterval}
        onChange={handleCheckInIntervalChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Available check-out"
        value={checkOutInterval}
        onChange={handleCheckOutIntervalChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Breakfast"
        value={breakfast}
        onChange={handleBreakfastChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Wifi connection"
        value={wifiConnection}
        onChange={handleWifiConnectionChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Private parking"
        value={privateParking}
        onChange={handlePrivateParkingChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Minibar"
        value={minibar}
        onChange={handleMinibarChange}
      />
      {!!buttonLabel && (
        <Button
          variant="contained"
          onClick={() =>
            onSaveHotel(
              hotelName,
              hotelLocation,
              price,
              room,
              checkInInterval,
              checkOutInterval,
              latitude,
              longitude,
              rating,
              breakfast,
              wifiConnection,
              privateParking,
              minibar
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

export default HotelForm;
