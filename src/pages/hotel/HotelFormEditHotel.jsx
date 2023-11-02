import { Box, TextField, Button } from "@mui/material";
import { useInput } from "../../hooks/useInput";

const HotelFormEditHotel = ({
  hotel,
  formTitle,
  onSaveHotel,
  buttonLabel,
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
          onClick={() =>
            onSaveHotel(
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

export default HotelFormEditHotel;
