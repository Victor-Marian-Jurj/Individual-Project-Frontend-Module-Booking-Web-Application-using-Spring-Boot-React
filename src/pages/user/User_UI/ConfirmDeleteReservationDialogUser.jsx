import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";

//isOpen, handleClose, onDelete => props
const ConfirmDeleteReservationDialogUser = ({
  reservation,
  isOpen,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Delete?</DialogTitle>
      <DialogContent>
        <Typography>{`Are you sure you want to delete this reservation:`}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>
          {reservation.reservationId}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteReservationDialogUser;
