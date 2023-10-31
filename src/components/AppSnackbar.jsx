import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../stores/snackbarSlice";

const AppSnackbar = () => {
  const isOpen = useSelector((state) => state.snackbarReducer.isOpen);
  const message = useSelector((state) => state.snackbarReducer.message);
  const severity = useSelector((state) => state.snackbarReducer.severity);
  const dispatch = useDispatch();

  const handleCloseSnackbar = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
severity={severity} // error, warning, info, success
        onClose={handleCloseSnackbar}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;