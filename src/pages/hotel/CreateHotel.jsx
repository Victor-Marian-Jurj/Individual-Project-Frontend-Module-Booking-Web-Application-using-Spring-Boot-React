import { Snackbar } from "@mui/material";
import { useInput } from "../../hooks/useInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateHotel = () => {
  const [hotelLocation, handleHotelLocationChange] = useInput();
  const [hotelName, handleHotelNameChange] = useInput();
  const [rating, handleRatingChange] = useInput();
  const [breakfast, handleBreakfastChange] = useInput();
  const [privateParking, handlePrivateParkingChange] = useInput();
  const [minibar, handleMinibarChange] = useInput();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAddHotel = async () => {

    const hotel = {
      hotelLocation: hotelLocation,
      hotelName: hotelName,
      rating: Number(rating),
      breakfast: breakfast,
      privateParking: privateParking,
      minibar: minibar,
    };

    try {
      await axios.post(
        "http://localhost:8080/hotels",
        hotel
      );

      navigate("/hotels");
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
    }
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
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Hotel saved successfully!"
      />
      <h1>Add Hotel</h1>
      <TextField
        variant="outlined"
        label="Name"
        value={hotelName}
        onChange={handleHotelNameChange}
      />
      <TextField
        variant="outlined"
        label="Location"
        value={hotelLocation}
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
      {/* <TextField
        variant="outlined"
        label="wificonnection"
        value={wifiConnection}
        onChange={handleWifiConnectionChange}
      /> */}
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

export default CreateHotel;
