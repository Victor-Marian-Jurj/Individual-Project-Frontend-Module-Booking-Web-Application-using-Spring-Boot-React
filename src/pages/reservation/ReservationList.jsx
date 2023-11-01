import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ReservationItem from "./ReservationItem";
import { getReservations } from "../../service/ReservationService";


const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);

  const handleGetReservations = async () => {
    try {
      const response = await getReservations(); // Call the service function to get reservations
      const reservationsData = response.reservation; // Access the 'reservation' property
  
      if (Array.isArray(reservationsData)) {
        // Sort the 'reservationsData' array in place without using 'slice'
        reservationsData.sort((a, b) => {
          const aWords = a.reservationName.split(" ");
          const bWords = b.reservationName.split(" ");
          const aSecondWord = aWords[1] || "";
          const bSecondWord = bWords[1] || "";
          return aSecondWord.localeCompare(bSecondWord);
        });
  
        setReservations([...reservationsData]); // Update the state with the sorted array
      } else {
        console.error("Data from getReservations is not an array:", reservationsData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    handleGetReservations();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        flexWrap: "wrap",
        gap: "3rem",
      }}
    >
      {reservations.length === 0 ? (
        <Box className="center-flex-container">
          <CircularProgress />
        </Box>
      ) : (
        reservations.map((reservation) => (
          <ReservationItem reservation={reservation} key={reservation.reservationId} onGetReservations={handleGetReservations} />
        ))
      )}
    </Stack>
  );
};


export default ReservationsList;