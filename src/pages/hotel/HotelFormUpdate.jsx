import { Box, TextField, Button } from "@mui/material";
import { useInput } from "../../hooks/useInput";

const HotelFormUpdate = ({ hotel, formTitle, onSaveHotel, buttonLabel, isReadonly }) => {
  const [rating, handleRatingChange] = useInput();
  const [breakfast, handleBreakfastChange] = useInput();
  const [wifiConnection, handleWifiConnectionChange] = useInput();
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
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="WiFi connection"
        value={true}
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
          onClick={() => onSaveHotel(rating, breakfast, wifiConnection, privateParking, minibar)}
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

export default HotelFormUpdate;