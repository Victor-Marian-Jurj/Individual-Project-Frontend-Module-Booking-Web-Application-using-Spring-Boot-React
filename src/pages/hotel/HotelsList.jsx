import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import HotelItem from "./HotelItem";
import "../../styles/HotelsList.css";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);

  //get hotels data on component mount
  useEffect(() => {
    fetch("http://localhost:8080/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data.hotels.filter((hotel) => hotel.wifiConnection)));
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
        <Box className="center-flex-container ">
          <CircularProgress />
        </Box>
      ) : (
        hotels.map((hotel) => <HotelItem hotel={hotel} key={hotel.id} />)
      )}
    </Stack>
  );
};

export default HotelsList;
