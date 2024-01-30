import { useNavigate } from "react-router-dom";
import { postHotel } from "../../service/HotelService";
import HotelForm from "./HotelForm";
import { openSnackbar } from "../../stores/snackbarSlice";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

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
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    navigate("/hotels");
  };

  const handleAddHotel = async (
    hotelName,
    hotelLocation,
    latitude,
    longitude,
    rating,
    breakfast,
    privateParking,
    minibar
  ) => {
    const hotel = {
      hotelName: hotelName,
      hotelLocation: hotelLocation,
      latitude: Number(latitude),
      longitude: Number(longitude),
      rating: Number(rating),
      breakfast: breakfast,
      privateParking: privateParking,
      minibar: minibar,
    };

    try {
      await postHotel(hotel);
      dispatch(openSnackbar({ text: "Hotel added successfully" }));
      navigate("/hotels");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div>
      <HotelForm
        formTitle="Add hotel"
        hotel={initialHotel}
        buttonLabel="Add"
        onSaveHotel={handleAddHotel}
      />
      <Button
        variant="outlined"
        onClick={handleCancelClick}
        sx={{ mt: "16px" }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default CreateHotel;
