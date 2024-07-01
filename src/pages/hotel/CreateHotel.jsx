import { useNavigate } from "react-router-dom";
import { postHotel } from "../../service/HotelService";
import HotelForm from "./HotelForm";
import { openSnackbar } from "../../stores/snackbarSlice";
import { useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import { useState } from "react";

const CreateHotel = () => {
  const initialHotel = {
    Name: "",
    Location: "",
    Latitude: "",
    Longitude: "",
    Rating: "",
    Breakfast: "",
    PrivateParking: "",
    Minibar: "",
    Room: "",
    Price: "",
    CheckInInterval: "",
    CheckOutInterval: "",
  };
  const [hotel, setHotel] = useState(initialHotel);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    navigate("/hotel.manager/hotels");
  };

  const handleSaveClick = () => {
    navigate("/hotel.manager/hotels");
  };
  const handleAddHotel = async (
    hotelName,
    hotelLocation,
    latitude,
    longitude,
    rating,
    breakfast,
    privateParking,
    minibar,
    room,
    price,
    checkInInterval,
    checkOutInterval
  ) => {
    const hotel = {
      hotelName: hotelName,
      hotelLocation: hotelLocation,
      latitude: latitude,
      longitude: longitude,
      rating: rating,
      breakfast: breakfast,
      privateParking: privateParking,
      minibar: minibar,
      room: room,
      price: price,
      checkInInterval: checkInInterval,
      checkOutInterval: checkOutInterval,
    };

    try {
      await postHotel(hotel);
      dispatch(openSnackbar({ text: "Hotel added successfully" }));
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/hotel.manager/hotels");
    }
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
      <div>
        <HotelForm
          formTitle="Add hotel"
          hotel={hotel}
          buttonLabel="Add"
          onSaveHotel={handleAddHotel}
          // onClick={handleSaveHotel}
        />
        {/* <Button
          variant="outlined"
          onClick={handleCancelClick}
          sx={{ width: "100px", marginTop: "15px" }}
        >
          Cancel
        </Button> */}
      </div>
    </Box>
  );
};

export default CreateHotel;
