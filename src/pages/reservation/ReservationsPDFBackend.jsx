import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";

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
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 10,
    width: "20%",
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#3f51b5",
    color: "white",
  },
  tableCell: {
    fontSize: 12,
    padding: 10,
    width: "20%",
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#ffffff",
  },
});

const generatePDF = async (filteredReservationsData) => {
  try {
    const MyDocument = () => (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>User name</Text>
                <Text style={styles.tableHeader}>First name</Text>
                <Text style={styles.tableHeader}>Last name</Text>
                <Text style={styles.tableHeader}>Hotel name</Text>
                <Text style={styles.tableHeader}>Hotel location</Text>
                <Text style={styles.tableHeader}>Check-in date</Text>
                <Text style={styles.tableHeader}>Check-out date</Text>
                <Text style={styles.tableHeader}>Room number</Text>
                <Text style={styles.tableHeader}>Room type</Text>
                <Text style={styles.tableHeader}>Room price</Text>
                <Text style={styles.tableHeader}>Payment method</Text>
                <Text style={styles.tableHeader}>Total payment</Text>
              </View>
              {filteredReservationsData.map((reservation, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{reservation.username}</Text>
                  <Text style={styles.tableCell}>{reservation.firstName}</Text>
                  <Text style={styles.tableCell}>{reservation.lastName}</Text>
                  <Text style={styles.tableCell}>{reservation.hotelName}</Text>
                  <Text style={styles.tableCell}>
                    {reservation.hotelLocation}
                  </Text>
                  <Text style={styles.tableCell}>
                    {new Date(reservation.checkInDate).toLocaleDateString()}
                  </Text>
                  <Text style={styles.tableCell}>
                    {new Date(reservation.checkOutDate).toLocaleDateString()}
                  </Text>
                  <Text style={styles.tableCell}>{reservation.roomNumber}</Text>
                  <Text style={styles.tableCell}>{reservation.roomType}</Text>
                  <Text style={styles.tableCell}>{reservation.roomPrice}</Text>
                  <Text style={styles.tableCell}>
                    {reservation.paymentMethod}
                  </Text>
                  <Text style={styles.tableCell}>
                    {reservation.totalPayment}
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
