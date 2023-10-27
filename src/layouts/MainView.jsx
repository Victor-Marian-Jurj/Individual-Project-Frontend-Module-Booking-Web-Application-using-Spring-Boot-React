import Box from "@mui/material/Box";
import HotelsList from "../pages/hotel/HotelsList";

const MainView = () => {
  return (
    <Box
      component="main"
      sx={{
        margin: "3rem",
        mt: "5rem",
      }}
    >
      <HotelsList />
    </Box>
  );
};

export default MainView;
