import { useNavigate } from "react-router-dom";
import { postReservation } from "../../service/ReservationService";
import ReservationFormNoId from "./RezervationFormNoId";
import { openSnackbar } from "../../stores/snackbarSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress, Box } from "@mui/material";

const CreateReservation = () => {
  const initialReservation = {
    HotelId: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    EmailAddress: "",
    CheckinDate: "",
    CheckoutDate: "",
    RoomType: "",
    RoomPrice: "",
    PaymentMethod: "",
    TotalPayment: "",
  };

  const params = useParams();
  const [reservation, setReservation] = useState(initialReservation);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    navigate("/hotel.manager/hotels");
  };

  const handleAddReservation = async (
    hotelId,
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
  ) => {
    const reservation = {
      hotelId: hotelId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      roomType: roomType,
      roomPrice: roomPrice,
      paymentMethod: paymentMethod,
      totalPayment: totalPayment,
    };

    try {
      await postReservation(reservation);
      dispatch(openSnackbar({ text: "Reservation added successfully" }));
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/hotel.manager/hotels");
    }
  };

  return reservation ? (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        Add reservation for hotel with id: {params.hotelId}
        <ReservationFormNoId
          formTitle="Add Reservation"
          reservation={reservation}
          buttonLabel="Add"
          onSaveReservation={handleAddReservation}
          hotelId={params.hotelId} // Pass hotelId as a prop
        />
        <Button
          variant="outlined"
          onClick={handleCancelClick}
          sx={{ width: "100px", marginTop: "15px" }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  ) : (
    <CircularProgress />
  );
};

export default CreateReservation;
