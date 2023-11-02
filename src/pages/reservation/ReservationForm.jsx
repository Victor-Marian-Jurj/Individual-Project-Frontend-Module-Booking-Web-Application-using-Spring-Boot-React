import { Box, TextField, Button } from "@mui/material";
import { useInput } from "../../hooks/useInput";
import { useSelector } from "react-redux";

const ReservationForm = ({
  reservation,
  formTitle,
  onSaveReservation,
  buttonLabel,
  isReadonly,
}) => {
  const [userId, handleUserIdChange] = useInput(reservation.userId);
  const [hotelId, handleHotelIdChange] = useInput(reservation.hotelId);
  const [roomId, handleRoomIdChange] = useInput(reservation.roomId);
  const [checkInDate, handleCheckInDateChange] = useInput(
    reservation.checkInDate
  );
  const [checkOutDate, handleCheckOutDateChange] = useInput(
    reservation.checkOutDate
  );
  const [paymentMethod, handlePaymentMethodChange] = useInput(
    reservation.paymentMethod
  );
  const [totalPayment, handleTotalPaymentChange] = useInput(
    reservation.totalPayment
  );

  const reservations = useSelector(
    (state) => state.reservationReducer.reservations
  );
  console.log(reservations);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItem: "center",
        justifyContent: "center",
      }}
    >
      <h1>{formTitle}</h1>
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="UserId"
        value={userId}
        onChange={handleUserIdChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="HotelId"
        value={hotelId}
        onChange={handleHotelIdChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="RoomId"
        value={roomId}
        onChange={handleRoomIdChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="CheckinDate"
        value={checkInDate}
        onChange={handleCheckInDateChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="CheckoutDate"
        value={checkOutDate}
        onChange={handleCheckOutDateChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="PaymentMethod"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="TotalPayment"
        value={totalPayment}
        onChange={handleTotalPaymentChange}
      />
      {!!buttonLabel && (
        <Button
          variant="contained"
          onClick={() =>
            onSaveReservation(
              userId,
              hotelId,
              roomId,
              checkInDate,
              checkOutDate,
              paymentMethod,
              totalPayment
            )
          }
          sx={{
            maxWidth: "100px",
          }}
        >
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
};

export default ReservationForm;
