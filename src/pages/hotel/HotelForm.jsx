import { Box, TextField, Button } from "@mui/material";
import { useInput } from "../../hooks/useInput";

const HotelForm = ({ hotel, formTitle, onSaveHotel, buttonLabel, isReadonly }) => {
  const [hotelLocation, handleHotelLocationChange] = useInput();
  const [hotelName, handleHotelNameChange] = useInput();
  const [rating, handleRatingChange] = useInput();
  // const [wifiConnection, handleWifiConnectionChange] = useInput();
  const [breakfast, handleBreakfastChange] = useInput();
  const [privateParking, handlePrivateParkingChange] = useInput();
  const [minibar, handleMinibarChange] = useInput();

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
        label="Breakfast"
        value={breakfast}
        onChange={handleBreakfastChange}
      />
      {/* <TextField
        variant="outlined"
        label="wificonnection"
        value={wifiConnection}
        onChange={handleWifiConnectionChange}
      /> */}
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
          onClick={() => onSaveHotel(hotelName, hotelLocation, rating, breakfast, privateParking, minibar)}
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