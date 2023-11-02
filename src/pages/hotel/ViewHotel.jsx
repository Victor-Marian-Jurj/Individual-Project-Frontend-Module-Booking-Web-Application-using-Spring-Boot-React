import { useParams } from "react-router-dom";
import { useHotelById } from "../../hooks/useHotelById";
import { CircularProgress } from "@mui/material";
import HotelForm from "./HotelForm";

const ViewHotel = () => {
  const { hotelId } = useParams();
  const { hotel } = useHotelById(hotelId);

  return hotel ? (
    <HotelForm formTitle="View hotel" hotel={hotel} isReadonly={true} />
  ) : (
    <CircularProgress />
  );
};

export default ViewHotel;