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

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
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
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    width: "14.28%", // Each cell should take up around 1/7th of the table width
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#3f51b5", // Background color for table header
    color: "white", // Text color for table header
  },
  tableCell: {
    fontSize: 12,
    padding: 5,
    width: "14.28%", // Each cell should take up around 1/7th of the table width
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#ffffff", // Background color for table cell
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Hotel Name</Text>
            <Text style={styles.tableHeader}>Location</Text>
            <Text style={styles.tableHeader}>Rating</Text>
            <Text style={styles.tableHeader}>Breakfast</Text>
            <Text style={styles.tableHeader}>WiFi</Text>
            <Text style={styles.tableHeader}>Parking</Text>
            <Text style={styles.tableHeader}>Minibar</Text>
          </View>
          {/* Table Body */}
          {data.map((hotel, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{hotel.hotelName}</Text>
              <Text style={styles.tableCell}>{hotel.hotelLocation}</Text>
              <Text style={styles.tableCell}>{hotel.rating}</Text>
              <Text style={styles.tableCell}>
                {hotel.breakfast ? "Yes" : "No"}
              </Text>
              <Text style={styles.tableCell}>
                {hotel.wifiConnection ? "Yes" : "No"}
              </Text>
              <Text style={styles.tableCell}>
                {hotel.privateParking ? "Yes" : "No"}
              </Text>
              <Text style={styles.tableCell}>
                {hotel.minibar ? "Yes" : "No"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const GeneratePDFButton = ({ savedData }) => {
  const handleGeneratePDF = () => {
    const pdfContent = <MyDocument data={savedData} />;

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
      <Button variant="contained" onClick={handleGeneratePDF}>
        Generate PDF
      </Button>
    </div>
  );
};

export default GeneratePDFButton;
