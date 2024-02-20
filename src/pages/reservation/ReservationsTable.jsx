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
import ConfirmDeleteReservationDialog from "./ConfirmDeleteReservationDialog";
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
    hotelName: "",
    hotelLocation: "",
    checkInDate: "",
    checkOutDate: "",
    roomNumber: "",
    roomType: "",
    roomPrice: "",
    paymentMethod: "",
    totalPayment: "",
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
  const uniqueTotalPayment = [
    ...new Set(reservations.map((reservation) => reservation.totalPayment)),
  ];
  const uniqueRoomType = [
    ...new Set(reservations.map((reservation) => reservation.roomType)),
  ];
  const uniqueCheckInDate = [
    ...new Set(reservations.map((reservation) => reservation.checkInDate)),
  ];
  const uniqueCheckOutDate = [
    ...new Set(reservations.map((reservation) => reservation.checkOutDate)),
  ];
  const uniqueHotelName = [
    ...new Set(reservations.map((reservation) => reservation.hotelName)),
  ];
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
      reservation.hotelName
        .toLowerCase()
        .includes(filter.hotelName.toLowerCase()) &&
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
        reservation.roomPrice === parseInt(filter.roomPrice)) &&
      (filter.roomType === "" ||
        reservation.roomType === parseInt(filter.roomType)) &&
      (filter.totalPayment === "" ||
        reservation.totalPayment === parseInt(filter.totalPayment)) &&
      (!filter.checkInDate || reservation.checkInDate >= filter.checkInDate) &&
      (!filter.checkOutDate || reservation.checkOutDate <= filter.checkOutDate)
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
            <MenuItem value="">All</MenuItem>
            {uniqueUsernames.map((username) => (
              <MenuItem key={username} value={username}>
                {username}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="First name"
            value={filter.firstName}
            onChange={(e) => handleFilterChange(e, "firstName")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueFirstNames.map((firstName) => (
              <MenuItem key={firstName} value={firstName}>
                {firstName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Last name"
            value={filter.lastName}
            onChange={(e) => handleFilterChange(e, "lastName")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueLastNames.map((lastName) => (
              <MenuItem key={lastName} value={lastName}>
                {lastName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Hotel name"
            value={filter.hotelName}
            onChange={(e) => handleFilterChange(e, "hotelName")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueHotelName.map((hotelName) => (
              <MenuItem key={hotelName} value={hotelName}>
                {hotelName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Hotel location"
            value={filter.hotelLocation}
            onChange={(e) => handleFilterChange(e, "hotelLocation")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueHotelLocations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Check-in date"
            value={filter.checkInDate}
            onChange={(e) => handleFilterChange(e, "checkInDate")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCheckInDate.map((checkInDate) => (
              <MenuItem key={checkInDate} value={checkInDate}>
                {checkInDate}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Check-out date"
            value={filter.checkOutDate}
            onChange={(e) => handleFilterChange(e, "checkOutDate")}
            sx={{ width: "150px", marginLeft: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCheckOutDate.map((checkOutDate) => (
              <MenuItem key={checkOutDate} value={checkOutDate}>
                {checkOutDate}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Room number"
            value={filter.roomNumber}
            onChange={(e) => handleFilterChange(e, "roomNumber")}
            sx={{ width: "150px", marginLeft: "10px", marginTop: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueRoomNumbers.map((roomNumber) => (
              <MenuItem key={roomNumber} value={roomNumber}>
                {roomNumber}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Room type"
            value={filter.roomType}
            onChange={(e) => handleFilterChange(e, "roomType")}
            sx={{ width: "150px", marginLeft: "10px", marginTop: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueRoomType.map((roomType) => (
              <MenuItem key={roomType} value={roomType}>
                {roomType}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Room price"
            value={filter.roomPrice}
            onChange={(e) => handleFilterChange(e, "roomPrice")}
            sx={{ width: "150px", marginLeft: "10px", marginTop: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueRoomPrices.map((roomPrice) => (
              <MenuItem key={roomPrice} value={roomPrice}>
                {roomPrice}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Payment method"
            value={filter.paymentMethod}
            onChange={(e) => handleFilterChange(e, "paymentMethod")}
            sx={{ width: "150px", marginLeft: "10px", marginTop: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniquePaymentMethods.map((paymentMethod) => (
              <MenuItem key={paymentMethod} value={paymentMethod}>
                {paymentMethod}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Total payment"
            value={filter.totalPayment}
            onChange={(e) => handleFilterChange(e, "totalPayment")}
            sx={{ width: "150px", marginLeft: "10px", marginTop: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueTotalPayment.map((totalPayment) => (
              <MenuItem key={totalPayment} value={totalPayment}>
                {totalPayment}
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
                First name
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Last name
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Hotel name
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Hotel location
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Check-in date
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Check-out date
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Room number
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Room type
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Room Price
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Payment method
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Total payment
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
