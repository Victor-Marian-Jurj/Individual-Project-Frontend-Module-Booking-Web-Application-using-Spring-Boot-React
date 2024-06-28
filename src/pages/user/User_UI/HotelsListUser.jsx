import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import HotelItem from "./HotelItemUser";
import "../../../styles/HotelsList.css";
import { getHotels } from "../../..//service/HotelService";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HotelPDFButton from "..//..//..//pages/hotel/HotelPDFButton"; // Import GeneratePDFButton component
import EmailStatusDialog from "../../../components/EmailStatusDialog"; // Import EmailStatusDialog component
import generatePDF from "..//..//..//pages/hotel/FilterHotelsPDFBackend";
import { sendPDFToBackend } from "../../../service/EmailServiceHotels"; // Import sendPDFToBackend function
import Button from "@mui/material/Button";
import { format, addDays } from "date-fns"; // Import date-fns format and addDays functions

const HotelsListUser = () => {
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

  //
  const [roomFilter, setRoomFilter] = useState("");
  const [roomFilterOptions, setRoomFilterOptions] = useState([""]);
  const [checkInIntervalFilter, setCheckInIntervalFilter] = useState("");
  const [checkInIntervalFilterOptions, setCheckInIntervalFilterOptions] =
    useState([""]);
  const [checkOutIntervalFilter, setCheckOutIntervalFilter] = useState("");
  const [checkOutIntervalFilterOptions, setCheckOutIntervalFilterOptions] =
    useState([""]);

  //

  const [recipientEmail, setRecipientEmail] = useState(""); // State to store recipient email

  const [emailSent, setEmailSent] = useState(false); // State to manage email sent status
  const [invalidEmail, setInvalidEmail] = useState(false); // State to manage invalid email status

  // Regular expression pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]{5,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRecipientEmailChange = (event) => {
    setRecipientEmail(event.target.value);
  };

  const [validEmail, setValidEmail] = useState(false); // State to manage valid email status

  const generateAndSendEmail = async () => {
    const isValidEmail = emailRegex.test(recipientEmail);
    setValidEmail(isValidEmail);

    if (isValidEmail) {
      try {
        const pdfBlob = await generatePDF(filteredHotels);
        const response = await sendPDFToBackend(recipientEmail, pdfBlob);
        if (response) {
          setEmailSent(true);
          setInvalidEmail(false);
          setValidEmail(true);
        }
      } catch (error) {
        console.error("Error sending email with PDF:", error);
        setEmailSent(false);
        setInvalidEmail(true);
        setValidEmail(false);
      }
    } else {
      setInvalidEmail(true);
      setValidEmail(false);
    }
  };
  //

  const fetchHotelData = async () => {
    try {
      const response = await getHotels();
      const hotelsData = response.hotel;
      setHotels(hotelsData);

      // Update rating and name filter options after fetching hotel data
      updateRatingFilterOptions();
      updateNameFilterOptions();
      updateRoomFilterOptions();
      updateCheckInIntervalFilterOptions();
      updateCheckOutIntervalFilterOptions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Update rating and name filter options whenever hotels data changes
    updateRatingFilterOptions();
    updateNameFilterOptions();
    updateRoomFilterOptions();
    updateCheckInIntervalFilterOptions();
    updateCheckOutIntervalFilterOptions();
  }, [hotels]); // Run when hotels data changes

  useEffect(() => {
    if (locationFilter !== "") {
      updateRatingFilterOptions({ location: locationFilter });
      updateNameFilterOptions({ location: locationFilter });
      updateRoomFilterOptions({ location: locationFilter });
      updateCheckInIntervalFilterOptions({ location: locationFilter });
      updateCheckOutIntervalFilterOptions({ location: locationFilter }); // Update name filter options for the selected location
    } else {
      // If location is not selected, use all available ratings and names
      updateRatingFilterOptions();
      updateNameFilterOptions();
      updateRoomFilterOptions();
      updateCheckInIntervalFilterOptions();
      updateCheckOutIntervalFilterOptions();
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
      updateRoomFilterOptions({ location: locationFilter });
      updateCheckInIntervalFilterOptions({ location: locationFilter });
      updateCheckOutIntervalFilterOptions({ location: locationFilter });
    } else {
      // If location is not selected, use all available ratings and names
      updateRatingFilterOptions();
      updateNameFilterOptions();
      updateRoomFilterOptions();
      updateCheckInIntervalFilterOptions();
      updateCheckOutIntervalFilterOptions();
    }
  }, [locationFilter]); // Run when location filter changes

  useEffect(() => {
    // Update rating filter options whenever hotels data changes
    updateRatingFilterOptions();
  }, [hotels]); // Run when hotels data changes

  useEffect(() => {
    fetchHotelData();
    updateRatingFilterOptions();
    updateRoomFilterOptions();
    updateCheckInIntervalFilterOptions();
    updateCheckOutIntervalFilterOptions();
    // Update rating filter options for all hotels
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
        (!minibarFilter || hotel.minibar.toString() === minibarFilter) &&
        (!roomFilter || hotel.room === roomFilter) &&
        (!checkInIntervalFilter ||
          (checkInIntervalFilter.toString() === "All"
            ? true
            : hotel.checkInInterval === checkInIntervalFilter)) &&
        (!checkOutIntervalFilter ||
          (checkOutIntervalFilter.toString() === "All"
            ? true
            : hotel.checkOutInterval === checkOutIntervalFilter))
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

  const updateRoomFilterOptions = (options = {}) => {
    // Get distinct values based on the current filter settings and location
    const distinctRooms = getDistinctValues("room", options);
    setRoomFilterOptions(["All", ...distinctRooms]);
  };
  const updateCheckInIntervalFilterOptions = (options = {}) => {
    // Get distinct values based on the current filter settings and location
    const distinctCheckInIntervals = getDistinctValues(
      "checkInInterval",
      options
    );
    setCheckInIntervalFilterOptions(["All", ...distinctCheckInIntervals]);
  };
  const updateCheckOutIntervalFilterOptions = (options = {}) => {
    // Get distinct values based on the current filter settings and location
    const distinctCheckOutIntervals = getDistinctValues(
      "checkOutInterval",
      options
    );
    setCheckOutIntervalFilterOptions(["All", ...distinctCheckOutIntervals]);
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
    roomFilter,
    checkInIntervalFilter,
    checkOutIntervalFilter,
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
        (!minibarFilter || hotel.minibar.toString() === minibarFilter) &&
        (!roomFilter || hotel.room.includes(roomFilter)) &&
        (!checkInIntervalFilter ||
          (checkInIntervalFilter.toString() === "All"
            ? true
            : hotel.checkInInterval === checkInIntervalFilter)) &&
        (!checkOutIntervalFilter ||
          (checkOutIntervalFilter.toString() === "All"
            ? true
            : hotel.checkOutInterval === checkOutIntervalFilter))
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

        <TextField
          label="Room type"
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          select
          sx={{ width: "120px", marginLeft: "12px" }}
        >
          {roomFilterOptions.map((room) => (
            <MenuItem key={room} value={room}>
              {room}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Check-in"
          value={checkInIntervalFilter}
          onChange={(e) => setCheckInIntervalFilter(e.target.value)}
          type="date"
          sx={{ width: "110px", marginRight: "12px" }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: format(new Date(), "yyyy-MM-dd"),
          }}
        />
        <TextField
          label="Check-out"
          value={checkOutIntervalFilter}
          onChange={(e) => setCheckOutIntervalFilter(e.target.value)}
          type="date"
          sx={{ width: "115px", marginRight: "12px" }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: addDays(new Date(checkInIntervalFilter || new Date()), 1),
          }}
        />

        <HotelPDFButton getFilteredHotels={getFilteredHotels} />

        <TextField
          label="Recipient Email"
          type="email"
          value={recipientEmail}
          onChange={handleRecipientEmailChange}
          error={invalidEmail}
          helperText={invalidEmail ? "Invalid email address" : null}
          sx={{ width: "200px", marginRight: "13px", marginLeft: "13px" }}
        />
        <Button
          variant="contained"
          onClick={generateAndSendEmail}
          sx={{
            marginRight: "20px",
            fontSize: "13px", // Set the font size to smaller
            // lineHeight: "1", // Ensure text is on two lines
            whiteSpace: "normal", // Allow text to wrap onto two lines
            // fontWeight: "bold", // Make the text bold
            padding: "4px 13px", // Increase padding to make the button bigger
            height: "auto", // Adjust height to fit the content
          }}
        >
          Send Email with
          <br />
          Filtered Hotels
        </Button>
        {/* Render EmailStatusDialog component */}
        <EmailStatusDialog
          isOpen={emailSent || invalidEmail || validEmail} // Open the dialog when emailSent, invalidEmail, or validEmail is true
          onClose={() => {
            // Reset email status states when closing the dialog
            setEmailSent(false);
            setInvalidEmail(false);
            setValidEmail(false);
          }}
          emailSent={emailSent}
          invalidEmail={invalidEmail}
          validEmail={validEmail} // Pass the validEmail prop here
        />

        {/* Add similar select components for other filters */}
      </div>
      <Divider
        sx={{
          backgroundColor: "#3f51b5",
          height: "2px",
          marginTop: "10px",
          marginBottom: "25px",
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

export default HotelsListUser;
