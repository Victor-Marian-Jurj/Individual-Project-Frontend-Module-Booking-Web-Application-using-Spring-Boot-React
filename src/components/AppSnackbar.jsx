import { Snackbar } from "@mui/material";

const AppSnackbar = ({ message, isOpen, closeSnackbar }) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};

export default AppSnackbar;