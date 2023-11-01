import { useNavigate } from "react-router-dom";
import { postReservation } from "../../service/ReservationService";
import ReservationForm from "./ReservationForm";
import { openSnackbar } from "../../stores/snackbarSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";

const CreateReservation = () => {
  const initialReservation = {
    UserId: "",
    HotelId: "",
    RoomId: "",
    CheckinDate: "",
    CheckoutDate: "",
    PaymentMethod: "",
    TotalPayment: "",
  };

  const params = useParams();
  const [reservation, setReservation] = useState(initialReservation);
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleCancelClick = () => {

}

  const handleAddReservation = async (userId, hotelId, roomId, checkInDate, checkOutDate, paymentMethod, totalPayment) => {
    const reservation = {
      userId: Number(userId),
      hotelId: Number(hotelId),
      roomId: Number(roomId),
      checkInDate: Date(checkInDate),
      checkOutDate: Date(checkOutDate),
      paymentMethod: paymentMethod,
      totalPayment: Number(totalPayment),
    };

    try {
      await postReservation(reservation);
      dispatch(openSnackbar({ text: "Reservation added successfully" }));
      navigate("/hotels/reservation");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return reservation ? (
    <div>
      Add reservation for hotel with id: {params.hotelId}
      <ReservationForm
        formTitle="Edit Reservation"
        reservation={reservation}
        buttonLabel="Edit"
        onSaveReservation={handleAddReservation}
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

export default CreateReservation;
