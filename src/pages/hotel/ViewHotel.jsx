// import { useParams } from "react-router-dom";
import { useHotelById } from "../../hooks/useHotelById";
// import { CircularProgress } from "@mui/material";
import HotelForm from "./HotelForm";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ViewHotel = () => {
  const { hotelId } = useParams();
  const { hotel } = useHotelById(hotelId);
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/hotels");
  };

  return hotel ? (
    <div>
      <HotelForm formTitle="View hotel" hotel={hotel} isReadonly={true} />
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

export default ViewHotel;
