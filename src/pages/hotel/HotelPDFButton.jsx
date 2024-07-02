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
    width: "20%", // Each cell should take up around 1/7th of the table width
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#3f51b5", // Background color for table header
    color: "white", // Text color for table header
  },
  tableCell: {
    fontSize: 12,
    padding: 5,
    width: "20%", // Each cell should take up around 1/7th of the table width
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
      <Text style={styles.title}>Filtered Hotels from HotelsHub</Text>
      <View style={styles.section}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Hotel name</Text>
            <Text style={styles.tableHeader}>Hotel location</Text>
            <Text style={styles.tableHeader}>Rating</Text>
            <Text style={styles.tableHeader}>Room type</Text>
            <Text style={styles.tableHeader}>Room price</Text>
            <Text style={styles.tableHeader}>Available check-in</Text>
            <Text style={styles.tableHeader}>Available check-out</Text>
            <Text style={styles.tableHeader}>Breakfast</Text>
            <Text style={styles.tableHeader}>Wifi connection</Text>
            <Text style={styles.tableHeader}>Private parking</Text>
            <Text style={styles.tableHeader}>Minibar</Text>
          </View>
          {/* Table Body */}
          {data.map((hotel, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{hotel.hotelName}</Text>
              <Text style={styles.tableCell}>{hotel.hotelLocation}</Text>
              <Text style={styles.tableCell}>{hotel.rating}</Text>
              <Text style={styles.tableCell}>{hotel.room}</Text>
              <Text style={styles.tableCell}>{hotel.price}</Text>
              <Text style={styles.tableCell}>
                {formatDate(hotel.checkInInterval)}
              </Text>
              <Text style={styles.tableCell}>
                {formatDate(hotel.checkOutInterval)}
              </Text>
              <Text style={styles.tableCell}>
                {hotel.breakfast ? "True" : "False"}
              </Text>
              <Text style={styles.tableCell}>
                {hotel.wifiConnection ? "True" : "False"}
              </Text>
              <Text style={styles.tableCell}>
                {hotel.privateParking ? "True" : "False"}
              </Text>
              <Text style={styles.tableCell}>
                {hotel.minibar ? "True" : "False"}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.footer}>Generated on: {generatedOn}</Text>
    </Page>
  </Document>
);

const HotelPDFButton = ({ getFilteredHotels }) => {
  const handleGeneratePDF = () => {
    const generatedOn = formatDateTime(new Date());
    const pdfContent = (
      <MyDocument data={getFilteredHotels()} generatedOn={generatedOn} />
    );

    // Convert the react-pdf component to blob
    pdf(pdfContent)
      .toBlob()
      .then((blob) => {
        // Save the blob as a PDF file
        saveAs(blob, "filtered_hotels.pdf");
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
          Filtered Hotels
        </Button>
      </Typography>
    </div>
  );
};

export default HotelPDFButton;
