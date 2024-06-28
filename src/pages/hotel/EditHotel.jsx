import { CircularProgress, Typography, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HotelFormEditHotel from "./HotelFormEditHotel";
import { useHotelById } from "../../hooks/useHotelById";
import { patchHotel } from "../../service/HotelService";
import { openSnackbar } from "../../stores/snackbarSlice";
import { useDispatch } from "react-redux";

const EditHotel = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { hotel } = useHotelById(params.hotelId);
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    navigate("/hotel.manager/hotels");
  };

  const handleSaveHotel = async (
    room,
    price,
    checkInInterval,
    checkOutInterval,
    rating,
    breakfast,
    wifiConnection,
    privateParking,
    minibar
  ) => {
    const hotel = {
      room,
      price,
      checkInInterval,
      checkOutInterval,
      rating,
      breakfast,
      wifiConnection,
      privateParking,
      minibar,
    };

    //TODO: implement PATCH in backend
    try {
      await patchHotel(params.hotelId, hotel);
      dispatch(openSnackbar({ text: "Hotel modified successfully" }));
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/hotel.manager/hotels");
    }
  };

  return hotel ? (
    <div>
      <Typography variant="h5" gutterBottom>
        Edit hotel with id: {params.hotelId}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <HotelFormEditHotel
        formTitle="Edit hotel"
        hotel={hotel}
        buttonLabel="Edit"
        onSaveHotel={handleSaveHotel}
        onCancelClick={handleCancelClick}
      />
    </div>
  ) : (
    <CircularProgress />
  );
};

export default EditHotel;
