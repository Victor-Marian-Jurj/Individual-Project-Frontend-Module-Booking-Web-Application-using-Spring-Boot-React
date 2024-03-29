import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import HotelItem from "./HotelItem";
import "../../styles/HotelsList.css";
import { getHotels } from "../../service/HotelService";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HotelPDFButton from "./HotelPDFButton"; // Import GeneratePDFButton component

const HotelsList = () => {
  const [nameFilterOptions, setNameFilterOptions] = useState([""]);
  const [hotels, setHotels] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [ratingFilterOptions, setRatingFilterOptions] = useState([""]);
  const [wifiFilter, setWifiFilter] = useState("");
  const [breakfastFilter, setBreakfastFilter] = useState("");
  const [parkingFilter, setParkingFilter] = useState("");
  const [minibarFilter, setMinibarFilter] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]); // State variable to hold filtered hotel data

  const fetchHotelData = async () => {
    try {
      const response = await getHotels();
      const hotelsData = response.hotel;
      setHotels(hotelsData);

      // Update rating and name filter options after fetching hotel data
      updateRatingFilterOptions();
      updateNameFilterOptions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Update rating and name filter options whenever hotels data changes
    updateRatingFilterOptions();
    updateNameFilterOptions();
  }, [hotels]); // Run when hotels data changes

  useEffect(() => {
    if (locationFilter !== "") {
      updateRatingFilterOptions({ location: locationFilter });
      updateNameFilterOptions({ location: locationFilter }); // Update name filter options for the selected location
    } else {
      // If location is not selected, use all available ratings and names
      updateRatingFilterOptions();
      updateNameFilterOptions();
    }
  }, [locationFilter]); // Run when location filter changes

  // Add this function to update name filter options
  const updateNameFilterOptions = (options = {}) => {
    // Get distinct values based on the current filter settings and location
    const distinctNames = getDistinctValues("hotelName", options);
    setNameFilterOptions(["All", ...distinctNames]);
  };

  //

  useEffect(() => {
    if (locationFilter !== "") {
      updateRatingFilterOptions({ location: locationFilter });
      updateNameFilterOptions({ location: locationFilter });
    } else {
      // If location is not selected, use all available ratings and names
      updateRatingFilterOptions();
      updateNameFilterOptions();
    }
  }, [locationFilter]); // Run when location filter changes

  useEffect(() => {
    // Update rating filter options whenever hotels data changes
    updateRatingFilterOptions();
  }, [hotels]); // Run when hotels data changes

  useEffect(() => {
    fetchHotelData();
    updateRatingFilterOptions(); // Update rating filter options for all hotels
  }, []); // Run once on component mount

  const getDistinctValues = (key, options = {}) => {
    // Destructure the location option
    const { location } = options;

    // Filter hotels based on the location
    const filteredHotels = hotels.filter(
      (hotel) => !location || hotel.hotelLocation.includes(location)
    );

    // Get distinct values based on the filtered hotels
    const distinctValues = [
      ...new Set(filteredHotels.map((hotel) => hotel[key])),
    ];

    // Sort the distinct values
    return distinctValues.sort((a, b) => {
      if (typeof a === "string" || typeof b === "string") {
        return a.localeCompare(b);
      } else {
        return a - b;
      }
    });
  };

  const getFilteredHotels = () => {
    // Apply filters
    const filteredHotels = hotels.filter((hotel) => {
      return (
        (!locationFilter || hotel.hotelLocation.includes(locationFilter)) &&
        (!nameFilter || hotel.hotelName.includes(nameFilter)) &&
        (!ratingFilter ||
          (ratingFilter === "All"
            ? true
            : hotel.rating === parseInt(ratingFilter, 10))) &&
        (!breakfastFilter || hotel.breakfast.toString() === breakfastFilter) &&
        (!wifiFilter || hotel.wifiConnection.toString() === wifiFilter) &&
        (!parkingFilter || hotel.privateParking.toString() === parkingFilter) &&
        (!minibarFilter || hotel.minibar.toString() === minibarFilter)
      );
    });

    // Sort filtered hotels alphabetically by the first letter of the second name
    return filteredHotels.sort((a, b) => {
      // Extract second names
      const secondNameA = (a.hotelName.split(" ")[1] || "").toUpperCase();
      const secondNameB = (b.hotelName.split(" ")[1] || "").toUpperCase();

      // Compare the first letter of the second name
      return secondNameA.localeCompare(secondNameB);
    });
  };

  const handleLocationChange = (selectedLocation) => {
    setLocationFilter(selectedLocation);
  };

  const handleNameChange = (selectedName) => {
    // Reset the name filter to an empty string when "All" is selected
    setNameFilter(selectedName === "All" ? "" : selectedName);
  };

  const updateRatingFilterOptions = (options = {}) => {
    // Get distinct values based on the current filter settings and location
    const distinctRatings = getDistinctValues("rating", options);
    setRatingFilterOptions(["All", ...distinctRatings]);
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    hotels,
    locationFilter,
    nameFilter,
    ratingFilter,
    breakfastFilter,
    wifiFilter,
    parkingFilter,
    minibarFilter,
  ]);

  const applyFilters = () => {
    const filtered = hotels.filter((hotel) => {
      return (
        (!locationFilter || hotel.hotelLocation.includes(locationFilter)) &&
        (!nameFilter || hotel.hotelName.includes(nameFilter)) &&
        (!ratingFilter || hotel.rating.toString() === ratingFilter) &&
        (!breakfastFilter || hotel.breakfast.toString() === breakfastFilter) &&
        (!wifiFilter || hotel.wifiConnection.toString() === wifiFilter) &&
        (!parkingFilter || hotel.privateParking.toString() === parkingFilter) &&
        (!minibarFilter || hotel.minibar.toString() === minibarFilter)
      );
    });
    setFilteredHotels(filtered);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ color: "#3f51b5" }}>
        Filter hotels
      </Typography>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {/* Add filter components */}
        <TextField
          label="Hotel location"
          value={locationFilter}
          onChange={(e) => handleLocationChange(e.target.value)}
          select
          sx={{ width: "145px" }}
        >
          <MenuItem value="">All</MenuItem>
          {getDistinctValues("hotelLocation").map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Hotel name"
          value={nameFilter}
          onChange={(e) => handleNameChange(e.target.value)}
          select
          sx={{ width: "130px", marginLeft: "12px" }}
        >
          {nameFilterOptions.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Private parking"
          value={parkingFilter}
          onChange={(e) => setParkingFilter(e.target.value)}
          select
          sx={{ width: "155px", marginLeft: "12px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </TextField>
        <TextField
          label="Rating"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          select
          sx={{ width: "95px", marginLeft: "12px" }}
        >
          {ratingFilterOptions.map((rating) => (
            <MenuItem key={rating} value={rating}>
              {rating}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Breakfast"
          value={breakfastFilter}
          onChange={(e) => setBreakfastFilter(e.target.value)}
          select
          sx={{ width: "120px", marginLeft: "12px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </TextField>
        <TextField
          label="WiFi"
          value={wifiFilter}
          onChange={(e) => setWifiFilter(e.target.value)}
          select
          sx={{ width: "85px", marginLeft: "12px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </TextField>
        <TextField
          label="Minibar"
          value={minibarFilter}
          onChange={(e) => setMinibarFilter(e.target.value)}
          select
          sx={{ width: "105px", marginLeft: "12px" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </TextField>
        <HotelPDFButton getFilteredHotels={getFilteredHotels} />

        {/* Add similar select components for other filters */}
      </div>
      <Divider
        sx={{
          backgroundColor: "#3f51b5",
          height: "2px",
          marginBottom: "20px",
        }}
      />
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          gap: "4rem",
        }}
      >
        {hotels.length === 0 ? (
          <Box className="center-flex-container">
            <CircularProgress />
          </Box>
        ) : (
          getFilteredHotels().map((hotel) => (
            <HotelItem
              hotel={hotel}
              key={hotel.hotelId}
              onGetHotels={fetchHotelData}
            />
          ))
        )}
      </Stack>
    </div>
  );
};

export default HotelsList;
