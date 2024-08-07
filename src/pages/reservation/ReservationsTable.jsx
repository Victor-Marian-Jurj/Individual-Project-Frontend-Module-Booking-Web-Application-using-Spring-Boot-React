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
import { sendPDFToBackend } from "../../service/EmailServiceReservations"; // Import sendPDFToBackend function
import EmailStatusDialog from "../../components/EmailStatusDialog"; // Import EmailStatusDialog component
import generatePDF from "./FilterReservationsPDFBackend";
import generateAllReservationsPDF from "./AllReservationsPDFBackend";
import { styled } from "@mui/system"; // Import styled from @mui/system or @mui/material/styles

const Container = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px", // Adjust the gap between items
  alignItems: "center", // Align items vertically
  marginBottom: "20px", // Add bottom margin for separation
});

const AdminReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  // const reservations = useSelector((state) => state.reservationReducer.reservations);

  const [recipientEmail, setRecipientEmail] = useState(""); // State to store recipient email
  const [recipientEmailAllReservations, setRecipientEmailAllReservations] =
    useState(""); // State to store recipient email

  const [emailSent, setEmailSent] = useState(false); // State to manage email sent status
  const [invalidEmail, setInvalidEmail] = useState(false); // State to manage invalid email status
  // const [invalidEmailAllReservations, setInvalidEmailAllReservations] = useState(false); // State to manage invalid email status
  // const [emailSentAllReservations, setEmailSentAllReservations] = useState(false); // State to manage email sent status
  const [scheduledEmail, setScheduledEmail] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState("");
  const [minutes] = useState(Array.from({ length: 60 }, (_, i) => i));
  const [emailMessage, setEmailMessage] = useState(""); // State for email message
  const [recurringMessage, setRecurringMessage] = useState(""); // State for recurring message
  // Regular expression pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]{5,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRecipientEmailChange = (event) => {
    setRecipientEmail(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
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

  ////////////
  const handleRecipientEmailChangeAllReservations = (event) => {
    setRecipientEmailAllReservations(event.target.value);
  };

  const [validEmailAllReservations, setValidEmailAllReservations] =
    useState(false); // State to manage valid email status

  const generateAndSendEmailAllReservations = async () => {
    const isValidEmail = emailRegex.test(recipientEmailAllReservations);
    setValidEmail(isValidEmail);

    if (isValidEmail) {
      try {
        const pdfBlob = await generateAllReservationsPDF(reservations);
        const response = await sendPDFToBackend(
          recipientEmailAllReservations,
          pdfBlob
        );
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

  const sendEmailAtSpecifiedMinute = (minute) => {
    if (scheduledEmail) {
      clearInterval(scheduledEmail);
    }

    const intervalId = setInterval(async () => {
      try {
        // Generate PDF with all reservations
        const pdfBlob = await generateAllReservationsPDF(reservations);

        // Send PDF to the specified recipient email address
        const response = await sendPDFToBackend(
          recipientEmailAllReservations,
          pdfBlob
        );

        if (response) {
          console.log("Email with all reservations sent successfully.");
        }
      } catch (error) {
        console.error("Error sending email with all reservations:", error);
      }
    }, minute * 60000); // Convert minutes to milliseconds

    setScheduledEmail(intervalId);
  };
  // const handleSendRecurringEmails = () => {
  //   if (selectedMinute && recipientEmailAllReservations) {
  //     sendEmailAtSpecifiedMinute(selectedMinute);
  //   } else {
  //     console.error("Recipient email address or minute interval is empty.");
  //   }
  // };

  const handleSendRecurringEmails = async () => {
    const isValidEmail = emailRegex.test(recipientEmailAllReservations);
    setValidEmail(isValidEmail);

    if (!isValidEmail) {
      setEmailMessage("Invalid Email Address!");
      return; // Exit the function if the email is invalid
    } else {
      setEmailMessage("Recurring activated!");
    }

    if (selectedMinute && recipientEmailAllReservations) {
      sendEmailAtSpecifiedMinute(selectedMinute);
      setRecurringMessage("Recurring email activated");
    } else {
      console.error("Recipient email address or minute interval is empty.");
    }
  };

  ////////

  const [dialogStates, setDialogStates] = useState({});
  const [filter, setFilter] = useState({
    hotelName: "",
    hotelLocation: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
    roomPrice: "",
    paymentMethod: "",
    totalPayment: "",
  });

  const handleGetReservations = async () => {
    try {
      const response = await getReservations();
      console.log("Fetched Reservations: ", response);
      const reservationsData = response.reservations;

      if (Array.isArray(reservationsData)) {
        reservationsData.sort((a, b) =>
          a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())
        );
        setReservations([...reservationsData]);
        console.log("Updated Reservations State: ", reservationsData);
      } else {
        console.error(
          "Data from getReservations is not an array:",
          reservationsData
        );
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
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
  // const uniqueUsernames = [
  //   ...new Set(reservations.map((reservation) => reservation.username)),
  // ];
  const uniqueRoomPrices = [
    ...new Set(reservations.map((reservation) => reservation.roomPrice)),
  ];
  const uniqueEmailAddress = [
    ...new Set(reservations.map((reservation) => reservation.emailAddress)),
  ];
  const uniquePhoneNumber = [
    ...new Set(reservations.map((reservation) => reservation.phoneNumber)),
  ];

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const filteredReservations = reservations.filter((reservation) => {
    return (
      reservation.firstName
        .toLowerCase()
        .includes(filter.firstName.toLowerCase()) &&
      reservation.lastName
        .toLowerCase()
        .includes(filter.lastName.toLowerCase()) &&
      reservation.hotelName
        .toLowerCase()
        .includes(filter.hotelName.toLowerCase()) &&
      reservation.phoneNumber
        .toLowerCase()
        .includes(filter.phoneNumber.toLowerCase()) &&
      reservation.emailAddress
        .toLowerCase()
        .includes(filter.emailAddress.toLowerCase()) &&
      reservation.hotelLocation
        .toLowerCase()
        .includes(filter.hotelLocation.toLowerCase()) &&
      (filter.paymentMethod === "" ||
        reservation.paymentMethod
          .toLowerCase()
          .includes(filter.paymentMethod.toLowerCase())) &&
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
      <Container sx={{ backgroundColor: "white", color: "black" }}>
        <TextField
          select
          label="First name"
          value={filter.firstName}
          onChange={(e) => handleFilterChange(e, "firstName")}
          sx={{ width: "155px" }}
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
          sx={{ width: "155px" }}
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
          label="Phone number"
          value={filter.phoneNumber}
          onChange={(e) => handleFilterChange(e, "phoneNumber")}
          sx={{ width: "165px" }}
        >
          <MenuItem value="">All</MenuItem>
          {uniquePhoneNumber.map((phoneNumber) => (
            <MenuItem key={phoneNumber} value={phoneNumber}>
              {phoneNumber}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Email address"
          value={filter.emailAddress}
          onChange={(e) => handleFilterChange(e, "emailAddress")}
          sx={{ width: "165px" }}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueEmailAddress.map((emailAddress) => (
            <MenuItem key={emailAddress} value={emailAddress}>
              {emailAddress}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Hotel name"
          value={filter.hotelName}
          onChange={(e) => handleFilterChange(e, "hotelName")}
          sx={{ width: "165px" }}
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
          sx={{ width: "155px" }}
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
          sx={{ width: "155px" }}
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
          sx={{ width: "155px" }}
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
          label="Room type"
          value={filter.roomType}
          onChange={(e) => handleFilterChange(e, "roomType")}
          sx={{ width: "155px" }}
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
          sx={{ width: "155px" }}
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
          sx={{ width: "165px" }}
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
          sx={{ width: "155px" }}
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

        <TextField
          label="Recipient Email"
          type="email"
          value={recipientEmail}
          onChange={handleRecipientEmailChange}
          error={invalidEmail}
          helperText={invalidEmail ? "Invalid email address" : null}
          sx={{ width: "200px" }}
        />
        <Button
          variant="contained"
          onClick={generateAndSendEmail}
          sx={{
            fontSize: "13px", // Set the font size to smaller
            // lineHeight: "1", // Ensure text is on two lines
            whiteSpace: "normal", // Allow text to wrap onto two lines
            // fontWeight: "bold", // Make the text bold
            height: "auto", // Adjust height to fit the content
          }}
        >
          Send Email with
          <br />
          Filtered Reservations
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
        <TextField
          label="Recipient Email"
          type="email"
          value={recipientEmailAllReservations}
          onChange={handleRecipientEmailChangeAllReservations}
          error={invalidEmail}
          helperText={invalidEmail ? "Invalid email address" : null}
          sx={{ width: "200px" }}
        />

        {/* Dropdown menu to select the period in minutes */}
        <TextField
          select
          label="Recurrency period"
          value={selectedMinute}
          onChange={handleMinuteChange}
          sx={{ width: "150px" }}
        >
          <MenuItem value="">Select Minute</MenuItem>
          {minutes.map((minute) => (
            <MenuItem key={minute} value={minute}>
              {minute} minutes
            </MenuItem>
          ))}
        </TextField>

        {/* Button to send recurring emails */}

        <Button
          variant="contained"
          onClick={handleSendRecurringEmails}
          sx={{
            fontSize: "13px",
            whiteSpace: "normal",
            height: "auto",
          }}
        >
          Activate Recurring Emails
          <br />
          with All Reservations
        </Button>
        {emailMessage && !validEmail && (
          <Typography
            sx={{
              color: "red", // Red color for invalid email message
              fontSize: "12px",
            }}
          >
            {emailMessage}
          </Typography>
        )}
        {emailMessage && validEmail && (
          <Typography
            sx={{
              color: "green", // Green color for valid email message
              fontSize: "12px",
            }}
          >
            {emailMessage}
          </Typography>
        )}
      </Container>
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
              {/* <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Username
              </TableCell> */}
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
                Phone number
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", fontSize: 14, padding: "13px" }}
              >
                Email address
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
                  height: 40,
                }}
              >
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
                <TableCell>{formatDate(reservation.checkInDate)}</TableCell>
                <TableCell>{formatDate(reservation.checkOutDate)}</TableCell>

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
                  <Link
                    to={`/hotel.manager/reservations/${reservation.reservationId}/edit`}
                  >
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
