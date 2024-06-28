import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Divider,
  Typography, // Import Typography for the title
} from "@mui/material";
import { useReservationById } from "../../../hooks/useReservationById"; // Ensure the correct path
import ConfirmDeleteReservationDialogUser from "./ConfirmDeleteReservationDialogUser";
import { deleteReservation } from "../../../service/ReservationService";
import { openSnackbar } from "../../../stores/snackbarSlice";
import { useDispatch } from "react-redux";

const UserReservationSearch = () => {
  const [reservationId, setReservationId] = useState("");
  const [idToSearch, setIdToSearch] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { reservation, isLoading, isError } = useReservationById(idToSearch);

  const [dialogStates, setDialogStates] = useState({});

  const handleSearch = () => {
    if (reservationId) {
      setIdToSearch(reservationId);
      setHasSearched(true);
    }
  };

  const dispatch = useDispatch();

  const handleOpenDialog = (reservation) => {
    const updatedDialogStates = { ...dialogStates };
    updatedDialogStates[reservation.reservationId] = true;
    setDialogStates(updatedDialogStates);
  };

  const handleCloseDialog = (reservation) => {
    if (reservation) {
      const updatedDialogStates = { ...dialogStates };
      updatedDialogStates[reservation.reservationId] = false;
      setDialogStates(updatedDialogStates);
    }
  };

  const handleDeleteReservation = async (reservation) => {
    const reservationId = reservation.reservationId;

    try {
      await deleteReservation(reservationId);
      dispatch(openSnackbar({ text: "Reservation deleted successfully" }));
      // Add a delay before reloading the page to allow the user to see the confirmation message
      setTimeout(() => {
        setHasSearched(false);
        setReservationId("");
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      dispatch(
        openSnackbar({ text: "Error deleting reservation", severity: "error" })
      );
    } finally {
      handleCloseDialog();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Type in your reservation ID to find your reservation
      </Typography>
      <Divider
        sx={{
          backgroundColor: "#3f51b5",
          height: "2px",
          marginTop: "10px",
          marginBottom: "25px",
        }}
      />
      <TextField
        label="Reservation ID"
        value={reservationId}
        onChange={(e) => setReservationId(e.target.value)}
        sx={{ marginRight: "20px", width: "300px" }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ marginTop: "7px", width: "90px", height: "40px" }}
      >
        Search
      </Button>

      {isLoading && <p>Loading...</p>}
      {isError && hasSearched && (
        <p style={{ color: "red" }}>
          Error, please type in a valid reservation ID.
        </p>
      )}
      {reservation && (
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="reservation table">
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  First Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Last Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Phone Number
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Email Address
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Hotel Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Hotel Location
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Check-In Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Check-Out Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Room Type
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Room Price
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Payment Method
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Total Payment
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontSize: 14, padding: "13px" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.firstName}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.lastName}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.phoneNumber}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.emailAddress}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.hotelName}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.hotelLocation}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {formatDate(reservation.checkInDate)}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {formatDate(reservation.checkOutDate)}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.roomType}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.roomPrice}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.paymentMethod}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.totalPayment}
                </TableCell>
                {/* End Example */}
                <TableCell align="left">
                  <Button
                    size="medium"
                    onClick={() => handleOpenDialog(reservation)}
                  >
                    Delete
                  </Button>
                  <ConfirmDeleteReservationDialogUser
                    reservation={reservation}
                    isOpen={dialogStates[reservation.reservationId] || false}
                    onDelete={() => handleDeleteReservation(reservation)}
                    onClose={() => handleCloseDialog(reservation)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserReservationSearch;
