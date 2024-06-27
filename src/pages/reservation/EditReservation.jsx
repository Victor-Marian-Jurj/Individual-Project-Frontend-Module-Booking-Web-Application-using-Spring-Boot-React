import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { useReservationById } from "../../hooks/useReservationById";
import { patchReservation } from "../../service/ReservationService";
import { openSnackbar } from "../../stores/snackbarSlice";
import { useDispatch } from "react-redux";

const EditReservation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { reservation } = useReservationById(params.reservationId);
  console.log(reservation);
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    navigate("/hotel.manager/reservations");
  };

  const handleSaveReservation = async (
    reservationId,
    hotelId,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    checkInDate,
    checkOutDate,
    roomType,
    roomPrice,
    paymentMethod,
    totalPayment
  ) => {
    const reservation = {
      reservationId,
      hotelId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      checkInDate,
      checkOutDate,
      roomType,
      roomPrice,
      paymentMethod,
      totalPayment,
    };

    //TODO: implement PATCH in backend
    try {
      await patchReservation(params.reservationId, reservation);
      dispatch(openSnackbar({ text: "Reservation modified successfully" }));
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/hotel.manager/reservations");
    }
  };

  return reservation ? (
    <div>
      Edit reservation with id: {params.reservationId}
      <ReservationForm
        formTitle="Edit reservation"
        reservation={reservation}
        buttonLabel="Edit"
        onSaveReservation={handleSaveReservation}
      />
      <Button
        variant="outlined"
        onClick={handleCancelClick}
        sx={{ mt: "16px", width: "100px" }}
      >
        Cancel
      </Button>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default EditReservation;
