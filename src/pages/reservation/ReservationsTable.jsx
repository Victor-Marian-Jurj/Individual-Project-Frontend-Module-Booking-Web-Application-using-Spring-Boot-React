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
import ReservationPDFButton from "./ReservationPDFButton";
import { sendPDFToBackend } from "../../service/EmailService"; // Import sendPDFToBackend function
import EmailStatusDialog from "./EmailStatusDialog"; // Import EmailStatusDialog component
import generatePDF from "../reservation/ReservationsPDFBackend";

const AdminReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  // const reservations = useSelector((state) => state.reservationReducer.reservations);

  const [recipientEmail, setRecipientEmail] = useState(""); // State to store recipient email

  const [emailSent, setEmailSent] = useState(false); // State to manage email sent status
  const [invalidEmail, setInvalidEmail] = useState(false); // State to manage invalid email status

  // Regular expression pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]{5,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRecipientEmailChange = (event) => {
    setRecipientEmail(event.target.value);
  };

  const [validEmail, setValidEmail] = useState(false); // State to manage valid email status

  const generateAndSendEmail = async () => {
    const isValidEmail = emailRegex.test(recipientEmail);
    setValidEmail(isValidEmail);

    if (isValidEmail) {
      try {
        const pdfBlob = await generatePDF(filteredReservations);
        const response = await sendPDFToBackend(recipientEmail, pdfBlob);
        if (response) {
          setEmailSent(true);
          setInvalidEmail(false);
          setValidEmail(true);
        }
      } catch (error) {
        console.error("Error sending email with PDF:", error);
        setEmailSent(false);
        setInvalidEmail(true);
        setValidEmail(false);
      }
    } else {
      setInvalidEmail(true);
      setValidEmail(false);
    }
  };

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
    const fetchData = async () => {
      try {
        const response = await getReservations();
        if (response && response.reservations) {
          setReservations(response.reservations);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchData();
  }, []);

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
      reservation.roomType
        .toLowerCase()
        .includes(filter.roomType.toLowerCase()) &&
      (filter.roomPrice === "" ||
        reservation.roomPrice === parseInt(filter.roomPrice)) &&
      (filter.totalPayment === "" ||
        reservation.totalPayment === parseInt(filter.totalPayment)) &&
      (!filter.checkInDate || reservation.checkInDate >= filter.checkInDate) &&
      (!filter.checkOutDate || reservation.checkOutDate <= filter.checkOutDate)
    );
  });
  return (
    <div>
      <Typography variant="h5" sx={{ color: "#3f51b5" }}>
        Filter reservations
      </Typography>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          select
          label="Username"
          value={filter.username}
          onChange={(e) => handleFilterChange(e, "username")}
          sx={{ width: "155px" }}
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
          sx={{ width: "155px", marginLeft: "12px" }}
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
          sx={{ width: "155px", marginLeft: "12px" }}
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
          sx={{ width: "165px", marginLeft: "12px" }}
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
          sx={{ width: "155px", marginLeft: "12px" }}
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
          sx={{ width: "155px", marginLeft: "12px" }}
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
          sx={{ width: "155px", marginLeft: "12px" }}
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
          sx={{ width: "155px" }}
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
          sx={{ width: "155px", marginLeft: "12px" }}
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
          sx={{ width: "155px", marginLeft: "12px" }}
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
          sx={{ width: "165px", marginLeft: "12px" }}
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
          sx={{ width: "155px", marginLeft: "12px" }}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueTotalPayment.map((totalPayment) => (
            <MenuItem key={totalPayment} value={totalPayment}>
              {totalPayment}
            </MenuItem>
          ))}
        </TextField>
        <ReservationPDFButton
          getFilteredReservations={() => filteredReservations}
        />
      </div>
      <TextField
        label="Recipient Email"
        type="email"
        value={recipientEmail}
        onChange={handleRecipientEmailChange}
        error={invalidEmail}
        helperText={invalidEmail ? "Invalid email address" : null}
        sx={{ width: "250px", marginRight: "10px" }}
      />

      <Button variant="contained" onClick={generateAndSendEmail}>
        Send Email
      </Button>
      {/* Render EmailStatusDialog component */}
      <EmailStatusDialog
        isOpen={emailSent || invalidEmail || validEmail} // Open the dialog when emailSent, invalidEmail, or validEmail is true
        onClose={() => {
          // Reset email status states when closing the dialog
          setEmailSent(false);
          setInvalidEmail(false);
          setValidEmail(false);
        }}
        emailSent={emailSent}
        invalidEmail={invalidEmail}
        validEmail={validEmail} // Pass the validEmail prop here
      />

      <Divider
        sx={{
          backgroundColor: "#3f51b5",
          height: "2px",
          marginTop: "10px",
          marginBottom: "25px",
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              {/* <TableCell>Title</TableCell> */}
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Username
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                First name
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Last name
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Hotel name
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Hotel location
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Check-in date
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Check-out date
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Room number
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Room type
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
                Payment method
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Total payment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow
                key={reservation.reservationId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: 40, // Adjust the height as needed
                }}
              >
                {/* <TableCell component="th" scope="row">
        Registered reservation
      </TableCell> */}
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.username}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.firstName}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.lastName}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.hotelName}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.hotelLocation}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {
                    new Date(reservation.checkInDate)
                      .toISOString()
                      .split("T")[0]
                  }
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {
                    new Date(reservation.checkOutDate)
                      .toISOString()
                      .split("T")[0]
                  }
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 14 }}>
                  {reservation.roomNumber}
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
                <TableCell align="left">
                  <Link to={`/reservations/${reservation.reservationId}/edit`}>
                    <Button size="medium">Edit</Button>
                  </Link>
                  <Button
                    size="medium"
                    onClick={() => handleOpenDialog(reservation)}
                  >
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
