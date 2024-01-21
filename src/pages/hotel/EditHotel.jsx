import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HotelFormEditHotel from "./HotelFormEditHotel";
import { useHotelById } from "../../hooks/useHotelById";
import { patchHotel } from "../../service/HotelService";

const EditHotel = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { hotel } = useHotelById(params.hotelId);

  const handleCancelClick = () => {
    navigate("/hotels");
  };

  const handleSaveHotel = async (
    rating,
    breakfast,
    wifiConnection,
    privateParking,
    minibar
  ) => {
    const hotel = {
      rating,
      breakfast,
      wifiConnection,
      privateParking,
      minibar,
    };

    //TODO: implement PATCH in backend
    try {
      await patchHotel(params.hotelId, hotel);
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/hotels");
    }
  };

  return hotel ? (
    <div>
      Edit hotel with id: {params.hotelId}
      <HotelFormEditHotel
        formTitle="Edit hotel"
        hotel={hotel}
        buttonLabel="Edit"
        onSaveHotel={handleSaveHotel}
      />
      <Button
        variant="outlined"
        onClick={handleCancelClick}
        sx={{ mt: "16px" }}
      >
        Cancel
      </Button>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default EditHotel;
