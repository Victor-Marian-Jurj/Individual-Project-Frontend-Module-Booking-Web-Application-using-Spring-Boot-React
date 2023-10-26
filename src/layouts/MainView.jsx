import Box from "@mui/material/Box";
import BooksList from "../pages/book/BooksList";

const MainView = () => {
  return (
    <Box
      component="main"
      sx={{
        margin: "3rem",
        mt: "5rem",
        width: "100%",
      }}
    >
      <BooksList />
    </Box>
  );
};

export default MainView;
