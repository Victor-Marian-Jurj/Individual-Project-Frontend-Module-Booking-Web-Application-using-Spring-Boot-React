// import { Stack, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import ConfirmDeleteReservationDialog from "./ConfirmDeleteReservationDialog";
// import { deleteReservation } from "../../service/ReservationService";
// import { useDispatch } from "react-redux";
// import { openSnackbar } from "../../stores/snackbarSlice";

// export default function ReservationItem({ reservation, onGetReservations }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [src, setSrc] = useState(`/admin`);

//   const dispatch = useDispatch();

//   const handleOpenDialog = () => {
//     setIsOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsOpen(false);
//   };

//   const handleDeleteReservation = async () => {
//     const reservationId = reservation.reservationId;

//     try {
//       await deleteReservation(reservationId);
//       dispatch(openSnackbar({ text: "Reservation deleted successfully" }));
//       onGetReservations();
//     } catch (err) {
//       console.error(err);
//       dispatch(
//         openSnackbar({ text: "Error deleting reservation", severity: "error" })
//       );
//     } finally {
//       handleCloseDialog();
//     }
//   };

//   return (
// <div>
//        <ConfirmDeleteReservationDialog
//             reservation={reservation}
//             isOpen={isOpen}
//             onDelete={handleDeleteReservation}
//             onClose={handleCloseDialog}
//           />
    

//       <Typography sx={{ fontWeight: "bold" }}>
//         <Link to={"/admin"}>
//         </Link>
//       </Typography>
//       </div>
//   );
// }
