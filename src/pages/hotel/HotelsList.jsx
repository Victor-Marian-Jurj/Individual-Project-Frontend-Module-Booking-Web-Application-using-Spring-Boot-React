import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import HotelItem from "./HotelItem";
import "../../styles/HotelsList.css";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);

  // Get hotels data on component mount
  useEffect(() => {
    fetch("http://localhost:8080/hotels")
      .then((res) => res.json())
      .then((data) => {
        const sortedHotels = data.hotel.slice();
        sortedHotels.sort((a, b) => {
          const aSecondWord = a.hotelName.split(" ")[1];
          const bSecondWord = b.hotelName.split(" ")[1];
          return aSecondWord.localeCompare(bSecondWord);
        });
        setHotels(sortedHotels);
      });
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
          <HotelItem hotel={hotel} key={hotel.hotelName} />
        ))
      )}
    </Stack>
  );
};

export default HotelsList;
