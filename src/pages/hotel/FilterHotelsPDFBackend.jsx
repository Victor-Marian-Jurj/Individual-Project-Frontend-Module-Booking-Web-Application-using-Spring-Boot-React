import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 10,
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
    width: "20%", // Adjust width according to your preference
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#3f51b5",
    color: "white",
  },
  tableCell: {
    fontSize: 12,
    padding: 5,
    width: "20%", // Adjust width according to your preference
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#ffffff",
  },
  generatedOn: {
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

const generatePDF = async (filteredHotelsData) => {
  try {
    const MyDocument = ({ data, generatedOn }) => (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <Text style={styles.title}>Filtered Reservations from HotelsHub</Text>
          <View style={styles.section}>
            <View style={styles.table}>
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
            <Text style={styles.generatedOn}>Generated on: {generatedOn}</Text>
          </View>
        </Page>
      </Document>
    );

    const generatedOn = formatDateTime(new Date());
    const pdfContent = (
      <MyDocument data={filteredHotelsData} generatedOn={generatedOn} />
    );

    const blob = await pdf(pdfContent).toBlob();

    return blob;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Error generating PDF: " + error.message);
  }
};

export default generatePDF;
