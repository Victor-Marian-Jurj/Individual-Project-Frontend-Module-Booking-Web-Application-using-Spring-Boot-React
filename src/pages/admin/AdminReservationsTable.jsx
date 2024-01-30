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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";

const AdminReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  // const reservations = useSelector((state) => state.reservationReducer.reservations);

  const [dialogStates, setDialogStates] = useState({});
  const [filter, setFilter] = useState({
    username: "",
    firstName: "",
    lastName: "",
    hotelLocation: "",
    roomNumber: "",
    roomPrice: "",
    paymentMethod: "",
  });

  const handleGetReservations = async () => {
    try {
      const response = await getReservations();
      console.log(response);
      const reservationsData = response.reservations;

      if (Array.isArray(reservationsData)) {
        reservationsData.sort((a, b) =>
          a.username.toLowerCase().localeCompare(b.username.toLowerCase())
        );
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

  const handleFilterChange = (event, field) => {
    setFilter({ ...filter, [field]: event.target.value });
  };

  const uniqueHotelLocations = [
    ...new Set(reservations.map((reservation) => reservation.hotelLocation)),
  ];
  const uniqueLastNames = [
    ...new Set(reservations.map((reservation) => reservation.lastName)),
  ];
  const uniquePaymentMethods = [
    ...new Set(reservations.map((reservation) => reservation.paymentMethod)),
  ];
  const uniqueFirstNames = [
    ...new Set(reservations.map((reservation) => reservation.firstName)),
  ];
  const uniqueUsernames = [
    ...new Set(reservations.map((reservation) => reservation.username)),
  ];
  const uniqueRoomNumbers = [
    ...new Set(reservations.map((reservation) => reservation.roomNumber)),
  ];
  const uniqueRoomPrices = [
    ...new Set(reservations.map((reservation) => reservation.roomPrice)),
  ];

  const filteredReservations = reservations.filter((reservation) => {
    return (
      reservation.username
        .toLowerCase()
        .includes(filter.username.toLowerCase()) &&
      reservation.firstName
        .toLowerCase()
        .includes(filter.firstName.toLowerCase()) &&
      reservation.lastName
        .toLowerCase()
        .includes(filter.lastName.toLowerCase()) &&
      reservation.hotelLocation
        .toLowerCase()
        .includes(filter.hotelLocation.toLowerCase()) &&
      (filter.paymentMethod === "" ||
        reservation.paymentMethod
          .toLowerCase()
          .includes(filter.paymentMethod.toLowerCase())) &&
      (filter.roomNumber === "" ||
        reservation.roomNumber === parseInt(filter.roomNumber, 10)) &&
      (filter.roomPrice === "" ||
        reservation.roomPrice === parseFloat(filter.roomPrice))
    );
  });

  return (
    <div>
      <Typography variant="h5" sx={{ color: "#3f51b5", marginBottom: "10px" }}>
        Filter reservations
        <div>
          <TextField
            select
            label="Username"
            value={filter.username}
            onChange={(e) => handleFilterChange(e, "username")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All Usernames</MenuItem>
            {uniqueUsernames.map((username) => (
              <MenuItem key={username} value={username}>
                {username}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="First Name"
            value={filter.firstName}
            onChange={(e) => handleFilterChange(e, "firstName")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All First Names</MenuItem>
            {uniqueFirstNames.map((firstName) => (
              <MenuItem key={firstName} value={firstName}>
                {firstName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Last Name"
            value={filter.lastName}
            onChange={(e) => handleFilterChange(e, "lastName")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All Last Names</MenuItem>
            {uniqueLastNames.map((lastName) => (
              <MenuItem key={lastName} value={lastName}>
                {lastName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Hotel Location"
            value={filter.hotelLocation}
            onChange={(e) => handleFilterChange(e, "hotelLocation")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All Locations</MenuItem>
            {uniqueHotelLocations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Room Number"
            value={filter.roomNumber}
            onChange={(e) => handleFilterChange(e, "roomNumber")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All Room Numbers</MenuItem>
            {uniqueRoomNumbers.map((roomNumber) => (
              <MenuItem key={roomNumber} value={roomNumber}>
                {roomNumber}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Room Price"
            value={filter.roomPrice}
            onChange={(e) => handleFilterChange(e, "roomPrice")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All Room Prices</MenuItem>
            {uniqueRoomPrices.map((roomPrice) => (
              <MenuItem key={roomPrice} value={roomPrice}>
                {roomPrice}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Payment Method"
            value={filter.paymentMethod}
            onChange={(e) => handleFilterChange(e, "paymentMethod")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All Payment Methods</MenuItem>
            {uniquePaymentMethods.map((paymentMethod) => (
              <MenuItem key={paymentMethod} value={paymentMethod}>
                {paymentMethod}
              </MenuItem>
            ))}
          </TextField>

          {/* Add more TextField components for other fields as needed */}
        </div>
      </Typography>
      <Divider
        sx={{ backgroundColor: "#3f51b5", height: "2px", marginBottom: "20px" }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              {/* <TableCell>Title</TableCell> */}
              <TableCell align="right" sx={{ color: "white" }}>
                Username
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                First Name
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Last Name
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Hotel Name
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Hotel Location
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Check-in Date
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Check-out Date
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Room Number
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Room Type
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Room Price
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Payment Method
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Total Payment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation) => (
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
                <TableCell align="right">
                  {
                    new Date(reservation.checkInDate)
                      .toISOString()
                      .split("T")[0]
                  }
                </TableCell>
                <TableCell align="right">
                  {
                    new Date(reservation.checkOutDate)
                      .toISOString()
                      .split("T")[0]
                  }
                </TableCell>
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
    </div>
  );
};

export default AdminReservationsTable;
