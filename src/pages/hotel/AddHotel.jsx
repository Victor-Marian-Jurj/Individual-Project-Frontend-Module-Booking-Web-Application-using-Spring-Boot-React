import { useInput } from "../../hooks/useInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddHotel = ({ onAddHotel }) => {
  const [hotelLocation, handleHotelLocationChange] = useInput();
  const [hotelName, handleHotelNameChange] = useInput();
  const [rating, handleRatingChange] = useInput();
  const [breakfast, handleBreakfastChange] = useInput();
  const [wifiConnection, handleWifiConnectionChange] = useInput();
  const [privateParking, handlePrivateParkingChange] = useInput();
  const [minibar, handleMinibarChange] = useInput();

  const handleAddHotel = () => {
    const Hotel = {
      hotelLocation: hotelLocation,
      hotelName: hotelName,
      rating: rating,
      breakfast: breakfast,
      wifiConnection: wifiConnection,
      privateParking: privateParking,
      minibar: minibar,
    };

    onAddHotel(Hotel);
  };

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
      <h1>Add Hotel</h1>
      <TextField
        variant="outlined"
        label="Name"
        value={hotelName}
        onChange={handleHotelNameChange}
      />
      <TextField
        variant="outlined"
        label="Author"
        value={author}
        onChange={handleHotelLocationChange}
      />
      <TextField
        variant="outlined"
        label="Rating"
        value={rating}
        onChange={handleRatingChange}
      />
      <TextField
        variant="outlined"
        label="breakfast"
        value={breakfast}
        onChange={handleBreakfastChange}
      />
      <TextField
        variant="outlined"
        label="wificonnection"
        value={wifiConnection}
        onChange={handleWifiConnectionChange}
      />
      <TextField
        variant="outlined"
        label="private parking"
        value={privateParking}
        onChange={handlePrivateParkingChange}
      />
      <TextField
        variant="outlined"
        label="minibar"
        value={minibar}
        onChange={handleMinibarChange}
      />
      <Button
        variant="contained"
        onClick={handleAddHotel}
        sx={{
          maxWidth: "100px",
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddHotel;
