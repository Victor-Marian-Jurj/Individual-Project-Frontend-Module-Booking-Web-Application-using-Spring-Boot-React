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
    // Remove the fixed height
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 10,
    width: "20.28%",
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#3f51b5",
    color: "white",
  },
  tableCell: {
    fontSize: 12,
    padding: 10,
    width: "20.28%",
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#ffffff",
  },
  fifthColumnHeader: {
    // Styles for the header of the 5th column
    width: "25%", // Adjust the width of the 5th column header
  },
  fifthColumnCell: {
    // Styles for the cells of the 5th column
    width: "25%", // Adjust the width of the 5th column cells
  },
  sixtColumnHeader: {
    // Styles for the header of the 5th column
    width: "25%", // Adjust the width of the 5th column header
  },
  sixtColumnCell: {
    // Styles for the cells of the 5th column
    width: "25%", // Adjust the width of the 5th column cells
  },
  seventhColumnHeader: {
    // Styles for the header of the 5th column
    width: "25%", // Adjust the width of the 5th column header
  },
  seventhColumnCell: {
    // Styles for the cells of the 5th column
    width: "25%", // Adjust the width of the 5th column cells
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>User name</Text>
            <Text style={styles.tableHeader}>First name</Text>
            <Text style={styles.tableHeader}>Last name</Text>
            <Text style={styles.tableHeader}>Hotel name</Text>
            <Text style={[styles.tableHeader, styles.fifthColumnHeader]}>
              Hotel location
            </Text>
            <Text style={[styles.tableHeader, styles.sixtColumnHeader]}>
              Check-in date
            </Text>
            <Text style={[styles.tableHeader, styles.seventhColumnHeader]}>
              Check-out date
            </Text>
            <Text style={styles.tableHeader}>Room number</Text>
            <Text style={styles.tableHeader}>Room type</Text>
            <Text style={styles.tableHeader}>Room price</Text>
            <Text style={styles.tableHeader}>Payment method</Text>
            <Text style={styles.tableHeader}>Total payment</Text>
          </View>
          {/* Table Body */}
          {data.map((reservation, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{reservation.username}</Text>
              <Text style={styles.tableCell}>{reservation.firstName}</Text>
              <Text style={styles.tableCell}>{reservation.lastName}</Text>
              <Text style={styles.tableCell}>{reservation.hotelName}</Text>
              <Text style={[styles.tableCell, styles.fifthColumnCell]}>
                {reservation.hotelLocation}
              </Text>
              <Text style={[styles.tableCell, styles.sixtColumnCell]}>
                {new Date(reservation.checkInDate).toLocaleDateString()}
              </Text>{" "}
              {/* Format date consistently */}
              <Text style={[styles.tableCell, styles.seventhColumnCell]}>
                {new Date(reservation.checkOutDate).toLocaleDateString()}
              </Text>{" "}
              {/* Format date consistently */}
              <Text style={styles.tableCell}>{reservation.roomNumber}</Text>
              <Text style={styles.tableCell}>{reservation.roomType}</Text>
              <Text style={styles.tableCell}>{reservation.roomPrice}</Text>
              <Text style={styles.tableCell}>{reservation.paymentMethod}</Text>
              <Text style={styles.tableCell}>{reservation.totalPayment}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const ReservationPDFButton = ({ getFilteredReservations }) => {
  const handleGeneratePDF = () => {
    const pdfContent = <MyDocument data={getFilteredReservations()} />;

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
            marginLeft: "12px",
            fontSize: "13px", // Set the font size to smaller
            // lineHeight: "1", // Ensure text is on two lines
            whiteSpace: "normal", // Allow text to wrap onto two lines
            // fontWeight: "bold", // Make the text bold
            padding: "4px 15px", // Increase padding to make the button bigger
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
