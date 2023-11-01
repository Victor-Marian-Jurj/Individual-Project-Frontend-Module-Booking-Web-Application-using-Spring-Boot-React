import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReservationFormUpdate from "./ReservationFormUpdate";
import { useReservationById } from "../../hooks/useReservationById";
import { patchReservation } from "../../service/ReservationService";

const EditReservation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { reservation } = useReservationById(params.reservationId);

  const handleCancelClick = () => {

    navigate("/reservations");
  };

  const handleSaveReservation = async (userId, hotelId, roomId, checkInDate, checkOutDate, paymentMethod, totalPayment) => {
    const reservation = {userId ,hotelId ,roomId, checkInDate, checkOutDate, paymentMethod, totalPayment };

    //TODO: implement PATCH in backend
    try {
      await patchReservation(params.reservationId, reservation);
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/hotels/reservation");
    }
  };

  return reservation ? (
    <div>
      Edit reservation with id: {params.reservationId}

      <ReservationFormUpdate
        formTitle="Edit reservation"
        reservation={reservation}
        buttonLabel="Edit"
        onSaveReservation={handleSaveReservation}
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

export default EditReservation;