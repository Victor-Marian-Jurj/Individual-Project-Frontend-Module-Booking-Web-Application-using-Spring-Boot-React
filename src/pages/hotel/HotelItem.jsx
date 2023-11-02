import { Stack, Typography } from "@mui/material";
import CircleBackgroundIcon from "../../components/CircleBackgroundIcon";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmDeleteHotelDialog from "./ConfirmDeleteHotelDialog";
import { deleteHotel } from "../../service/HotelService";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../stores/snackbarSlice";
import { AddBoxOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HotelItem({ hotel, onGetHotels }) {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState(`../../images/${hotel.hotelId}.jpg`);

  const dispatch = useDispatch();

  const handleImgError = () => {
    setSrc("../../images/no-image.jpg");
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDeleteHotel = async () => {
    const hotelId = hotel.hotelId;

    try {
      await deleteHotel(hotelId);
      dispatch(openSnackbar({ text: "Hotel deleted successfully" }));
      onGetHotels();
    } catch (err) {
      console.error(err);
      dispatch(
        openSnackbar({ text: "Error deleting hotel", severity: "error" })
      );
    } finally {
      handleCloseDialog();
    }
  };

  const navigate = useNavigate();

  const handleHotelReservation = () => {
    navigate(`/hotels/${hotel.hotelId}/reservation`);
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={0.5}
      className="hotel-cover-width"
    >
      <div className="hotel-cover-container">
        <img
          className="hotel-cover hotel-cover-width hotel-cover-height"
          src={src}
          onError={handleImgError}
          loading="lazy"
          alt="Hotel cover"
        />
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          className="middle"
        >
          <Link to={`/hotels/${hotel.hotelId}`}>
            <CircleBackgroundIcon icon={VisibilityIcon} color="white" />
          </Link>
          <Link to={`/hotels/${hotel.hotelId}/edit`}>
            <CircleBackgroundIcon icon={EditIcon} color="white" />
          </Link>
          <CircleBackgroundIcon
            icon={DeleteSharpIcon}
            color="white"
            onClick={handleOpenDialog}
          />
          <ConfirmDeleteHotelDialog
            hotel={hotel}
            isOpen={isOpen}
            onDelete={handleDeleteHotel}
            onClose={handleCloseDialog}
          />
          <CircleBackgroundIcon
            icon={AddBoxOutlined}
            color="white"
            onClick={handleHotelReservation}
          />
        </Stack>
      </div>

      <Typography sx={{ fontWeight: "bold" }}>
        <Link to={"/hotels/" + hotel.hotelId}>
          {hotel.hotelName} - {hotel.hotelLocation}
        </Link>
      </Typography>

      <ConfirmDeleteHotelDialog
        hotel={hotel}
        isOpen={isOpen}
        onDelete={handleDeleteHotel}
        onClose={handleCloseDialog}
      />
    </Stack>
  );
}
