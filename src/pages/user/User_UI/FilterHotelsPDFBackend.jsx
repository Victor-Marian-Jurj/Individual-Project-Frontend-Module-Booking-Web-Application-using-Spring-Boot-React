import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";

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

const generatePDF = async (filteredHotelsData) => {
  try {
    const MyDocument = () => (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Hotel name</Text>
                <Text style={styles.tableHeader}>Hotel location</Text>
                <Text style={styles.tableHeader}>Rating</Text>
                <Text style={styles.tableHeader}>Breakfast</Text>
                <Text style={styles.tableHeader}>Wifi connection</Text>
                <Text style={styles.tableHeader}>Private parking</Text>
                <Text style={styles.tableHeader}>Minibar</Text>
              </View>
              {/* Table Body */}
              {filteredHotelsData.map((hotel, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{hotel.hotelName}</Text>
                  <Text style={styles.tableCell}>{hotel.hotelLocation}</Text>
                  <Text style={styles.tableCell}>{hotel.rating}</Text>
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
        </Page>
      </Document>
    );

    // Generate the PDF content
    const pdfContent = <MyDocument />;

    // Convert the PDF content to blob
    const blob = await pdf(pdfContent).toBlob();

    return blob;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Error generating PDF: " + error.message);
  }
};

export default generatePDF;
