import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import HotelItem from "./HotelItem";
import "../../styles/HotelsList.css";
import axios from "axios";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);

  const getHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/hotels");
      const data = response.data;
      const sortedHotels = data.hotel.slice();
      sortedHotels.sort((a, b) => {
        const aWords = a.hotelName.split(" ");
        const bWords = b.hotelName.split(" ");
        const aSecondWord = aWords[1] || "";
        const bSecondWord = bWords[1] || "";
        return aSecondWord.localeCompare(bSecondWord);
      });
      setHotels(sortedHotels);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getHotels();
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
