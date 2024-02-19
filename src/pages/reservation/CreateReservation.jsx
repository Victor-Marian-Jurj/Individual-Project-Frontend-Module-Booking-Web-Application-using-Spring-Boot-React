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
    navigate("/hotels");
  };

  const handleAddReservation = async (
    userId,
    hotelId,
    roomId,
    checkInDate,
    checkOutDate,
    paymentMethod,
    totalPayment
  ) => {
    const reservation = {
      userId: userId,
      hotelId: hotelId,
      roomId: roomId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      paymentMethod: paymentMethod,
      totalPayment: totalPayment,
    };

    try {
      await postReservation(reservation);
      dispatch(openSnackbar({ text: "Reservation added successfully" }));
      navigate("/hotels");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return reservation ? (
    <div>
      Add reservation for hotel with id: {params.hotelId}
      <ReservationForm
        formTitle="Add Reservation"
        reservation={reservation}
        buttonLabel="Add"
        onSaveReservation={handleAddReservation}
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

export default CreateReservation;
