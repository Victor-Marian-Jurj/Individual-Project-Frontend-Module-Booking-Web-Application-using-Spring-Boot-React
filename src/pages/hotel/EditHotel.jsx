import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditHotel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    //code
    navigate("/hotels");
  };

  return (
    <div>
      Edit hotel with id: {params.hotelId}
      <Button variant="outlined" onClick={handleCancelClick}>
        Cancel
      </Button>
    </div>
  );
};

export default EditHotel;