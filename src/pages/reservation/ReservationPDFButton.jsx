import React from "react";
import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Typography } from "@mui/material";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: "10",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#3f51b5", // Background color for table header
    color: "white", // Text color for table header
  },
  tableHeaderEmail: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    width: "16.66%", // Increase the width for the email header
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#3f51b5", // Background color for table header
    color: "white", // Text color for table header
  },
  tableCell: {
    fontSize: 12,
    padding: 5,
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#ffffff", // Background color for table cell
  },
  tableCellEmail: {
    fontSize: 12,
    padding: 5,
    width: "16.66%", // Increase the width for the email cell
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#ffffff", // Background color for table cell
  },
  footer: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
  },
});

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

const formatDateTime = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const MyDocument = ({ data, generatedOn }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={styles.title}>Filtered Reservations from HotelsHub</Text>
      <View style={styles.section}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { width: "8.33%" }]}>
              First name
            </Text>
            <Text style={[styles.tableHeader, { width: "8.33%" }]}>
              Last name
            </Text>
            <Text style={[styles.tableHeader, { width: "10%" }]}>
              Hotel name
            </Text>
            <Text style={[styles.tableHeader, { width: "10%" }]}>
              Hotel location
            </Text>
            <Text style={[styles.tableHeader, { width: "12%" }]}>
              Phone number
            </Text>
            <Text style={styles.tableHeaderEmail}>Email address</Text>
            <Text style={[styles.tableHeader, { width: "12%" }]}>
              Check-in date
            </Text>
            <Text style={[styles.tableHeader, { width: "12%" }]}>
              Check-out date
            </Text>
            <Text style={[styles.tableHeader, { width: "8.33%" }]}>
              Room type
            </Text>
            <Text style={[styles.tableHeader, { width: "7%" }]}>
              Room price
            </Text>
            <Text style={[styles.tableHeader, { width: "10%" }]}>
              Payment method
            </Text>
            <Text style={[styles.tableHeader, { width: "7%" }]}>
              Total payment
            </Text>
          </View>
          {/* Table Body */}
          {data.map((reservation, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.tableCell, { width: "8.33%" }]}>
                {reservation.firstName}
              </Text>
              <Text style={[styles.tableCell, { width: "8.33%" }]}>
                {reservation.lastName}
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                {reservation.hotelName}
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                {reservation.hotelLocation}
              </Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>
                {reservation.phoneNumber}
              </Text>
              <Text style={styles.tableCellEmail}>
                {reservation.emailAddress}
              </Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>
                {formatDate(reservation.checkInDate)}
              </Text>
              <Text style={[styles.tableCell, { width: "12%" }]}>
                {formatDate(reservation.checkOutDate)}
              </Text>
              <Text style={[styles.tableCell, { width: "8.33%" }]}>
                {reservation.roomType}
              </Text>
              <Text style={[styles.tableCell, { width: "7%" }]}>
                {reservation.roomPrice}
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                {reservation.paymentMethod}
              </Text>
              <Text style={[styles.tableCell, { width: "7%" }]}>
                {reservation.totalPayment}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.footer}>Generated on: {generatedOn}</Text>
    </Page>
  </Document>
);

const ReservationPDFButton = ({ getFilteredReservations }) => {
  const handleGeneratePDF = () => {
    const generatedOn = formatDateTime(new Date());
    const pdfContent = (
      <MyDocument data={getFilteredReservations()} generatedOn={generatedOn} />
    );

    // Convert the react-pdf component to blob
    pdf(pdfContent)
      .toBlob()
      .then((blob) => {
        // Save the blob as a PDF file
        saveAs(blob, "filtered_reservations.pdf");
      });
  };

  return (
    <div>
      <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={handleGeneratePDF}
          sx={{
            fontSize: "13px", // Set the font size to smaller
            whiteSpace: "normal", // Allow text to wrap onto two lines
            height: "auto", // Adjust height to fit the content
          }}
        >
          Download PDF with
          <br />
          Filtered Reservations
        </Button>
      </Typography>
    </div>
  );
};

export default ReservationPDFButton;
