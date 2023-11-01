import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import HotelItem from "./HotelItem";
import "../../styles/HotelsList.css";
import { getHotels } from "../../service/HotelService";


const HotelsList = () => {
  const [hotels, setHotels] = useState([]);

  const handleGetHotels = async () => {
    try {
      const response = await getHotels(); // Call the service function to get hotels
      const hotelsData = response.hotel; // Access the 'hotel' property
  
      if (Array.isArray(hotelsData)) {
        // Sort the 'hotelsData' array in place without using 'slice'
        hotelsData.sort((a, b) => {
          const aWords = a.hotelName.split(" ");
          const bWords = b.hotelName.split(" ");
          const aSecondWord = aWords[1] || "";
          const bSecondWord = bWords[1] || "";
          return aSecondWord.localeCompare(bSecondWord);
        });
  
        setHotels([...hotelsData]); // Update the state with the sorted array
      } else {
        console.error("Data from getHotels is not an array:", hotelsData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    handleGetHotels();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        flexWrap: "wrap",
        gap: "3rem",
      }}
    >
      {hotels.length === 0 ? (
        <Box className="center-flex-container">
          <CircularProgress />
        </Box>
      ) : (
        hotels.map((hotel) => (
          <HotelItem hotel={hotel} key={hotel.hotelId} onGetHotels={handleGetHotels} />
        ))
      )}
    </Stack>
  );
};


export default HotelsList;