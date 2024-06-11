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
  const [reservationId, handleReservationIdChange] = useInput(
    reservation.reservationId
  );
  const [hotelId, handleHotelIdChange] = useInput(reservation.hotelId);
  // const [roomId, handleRoomIdChange] = useInput(reservation.roomId);

  const [firstName, handleFirstName] = useInput(reservation.firstName);
  const [lastName, handleLastName] = useInput(reservation.lastName);
  const [phoneNumber, handlePhoneNumber] = useInput(reservation.phoneNumber);
  const [emailAddress, handleEmailAddress] = useInput(reservation.emailAddress);
  const [roomPrice, handleRoomPrice] = useInput(reservation.roomPrice);
  const [roomType, handleRoomType] = useInput(reservation.roomType);

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
      {/* <TextField
        variant="outlined"
        disabled={isReadonly}
        label="UserId"
        value={userId}
        onChange={handleUserIdChange}
      />
     
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="RoomId"
        value={roomId}
        onChange={handleRoomIdChange}
      /> */}
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="ReservationId"
        value={reservationId}
        onChange={handleReservationIdChange}
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
        label="First Name"
        value={firstName}
        onChange={handleFirstName}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Last Name"
        value={lastName}
        onChange={handleLastName}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumber}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Email Address"
        value={emailAddress}
        onChange={handleEmailAddress}
      />

      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Check-in Date"
        value={checkInDate}
        onChange={handleCheckInDateChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Check-out Date"
        value={checkOutDate}
        onChange={handleCheckOutDateChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Room Type"
        value={roomType}
        onChange={handleRoomType}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Room Price"
        value={roomPrice}
        onChange={handleRoomPrice}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Payment Method"
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      />
      <TextField
        variant="outlined"
        disabled={isReadonly}
        label="Total Payment"
        value={totalPayment}
        onChange={handleTotalPaymentChange}
      />
      {!!buttonLabel && (
        <Button
          variant="contained"
          onClick={() =>
            onSaveReservation(
              reservationId,
              hotelId,
              // roomId,
              firstName,
              lastName,
              phoneNumber,
              emailAddress,
              checkInDate,
              checkOutDate,
              roomType,
              roomPrice,
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
