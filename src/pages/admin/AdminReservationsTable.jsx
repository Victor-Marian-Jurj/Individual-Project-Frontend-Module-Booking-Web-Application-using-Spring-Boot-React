import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getReservations } from "../../service/ReservationService";
import ConfirmDeleteReservationDialog from "../reservation/ConfirmDeleteReservationDialog";
import { deleteReservation } from "../../service/ReservationService";
import { openSnackbar } from "../../stores/snackbarSlice";

const AdminReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  // const reservations = useSelector((state) => state.reservationReducer.reservations);

  const [dialogStates, setDialogStates] = useState({});

  const handleGetReservations = async () => {
    try {
      const response = await getReservations();
      console.log(response);
      const reservationsData = response.reservations;

      if (Array.isArray(reservationsData)) {
        reservationsData.sort((a, b) => {
          const usernameA = a.username.toLowerCase();
          const usernameB = b.username.toLowerCase();
          return usernameA.localeCompare(usernameB);
        });

        setReservations([...reservationsData]);
      } else {
        console.error(
          "Data from getReservations is not an array:",
          reservationsData
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetReservations();
  }, []);

  const dispatch = useDispatch();

  const handleOpenDialog = (reservation) => {
    const updatedDialogStates = { ...dialogStates };
    updatedDialogStates[reservation.reservationId] = true; // Open the dialog for a specific reservation
    setDialogStates(updatedDialogStates);
  };

  const handleCloseDialog = (reservation) => {
    if (reservation) {
      const updatedDialogStates = { ...dialogStates };
      updatedDialogStates[reservation.reservationId] = false; // Close the dialog for a specific reservation
      setDialogStates(updatedDialogStates);
    }
  };

  const handleDeleteReservation = async (reservation) => {
    const reservationId = reservation.reservationId;

    try {
      await deleteReservation(reservationId);
      dispatch(openSnackbar({ text: "Reservation deleted successfully" }));
      handleGetReservations();
    } catch (err) {
      console.error(err);
      dispatch(
        openSnackbar({ text: "Error deleting reservation", severity: "error" })
      );
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Title</TableCell> */}
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Hotel Name</TableCell>
            <TableCell align="right">Hotel Location</TableCell>
            <TableCell align="right">Check-in Date</TableCell>
            <TableCell align="right">Check-out Date</TableCell>
            <TableCell align="right">Room Number</TableCell>
            <TableCell align="right">Room Type</TableCell>
            <TableCell align="right">Room Price</TableCell>
            <TableCell align="right">Payment Method</TableCell>
            <TableCell align="right">Total Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow
              key={reservation.reservationId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                Registered reservation
              </TableCell> */}
              <TableCell align="right">{reservation.username}</TableCell>
              <TableCell align="right">{reservation.firstName}</TableCell>
              <TableCell align="right">{reservation.lastName}</TableCell>
              <TableCell align="right">{reservation.hotelName}</TableCell>
              <TableCell align="right">{reservation.hotelLocation}</TableCell>
              <TableCell align="right">{reservation.checkInDate}</TableCell>
              <TableCell align="right">{reservation.checkOutDate}</TableCell>
              <TableCell align="right">{reservation.roomNumber}</TableCell>
              <TableCell align="right">{reservation.roomType}</TableCell>
              <TableCell align="right">{reservation.roomPrice}</TableCell>
              <TableCell align="right">{reservation.paymentMethod}</TableCell>
              <TableCell align="right">{reservation.totalPayment}</TableCell>
              <TableCell align="right">
                <Link to={`/reservations/${reservation.reservationId}/edit`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => handleOpenDialog(reservation)}>
                  Delete
                </Button>
                <ConfirmDeleteReservationDialog
                  reservation={reservation}
                  isOpen={dialogStates[reservation.reservationId] || false}
                  onDelete={() => handleDeleteReservation(reservation)}
                  onClose={() => handleCloseDialog(reservation)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminReservationsTable;
