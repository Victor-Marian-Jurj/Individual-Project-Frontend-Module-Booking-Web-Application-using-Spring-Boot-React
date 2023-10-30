import { useNavigate } from "react-router-dom";
import { postHotel } from "../../service/HotelService";
import HotelForm from "./HotelForm";

const CreateHotel = () => {
  const initialHotel = {
    Name: "",
    Location: "",
    Rating: "",
    Breakfast: "",
    PrivateParking: "",
    Minibar: "",
    
  };

  const navigate = useNavigate();


  const handleAddHotel = async (hotelName, hotelLocation, rating, breakfast, privateParking, minibar) => {
    const hotel = {
      hotelName: hotelName,
      hotelLocation: hotelLocation,
      rating: Number(rating),
      breakfast: breakfast,
      privateParking: privateParking,
      minibar: minibar,
    };

    try {
      await postHotel(hotel);
      navigate("/hotels");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <HotelForm
      formTitle="Add hotel"
      hotel={initialHotel}
      buttonLabel="Add"
      onSaveHotel={handleAddHotel}
    />
  );
};

export default CreateHotel;
