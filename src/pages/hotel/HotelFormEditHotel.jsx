import { Box, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { useInput } from "../../hooks/useInput";

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
    </Box>
  );
};

export default HotelFormEditHotel;
