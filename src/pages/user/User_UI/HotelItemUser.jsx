import { Stack, Typography } from "@mui/material";
import CircleBackgroundIcon from "../../..//components/CircleBackgroundIcon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddBoxOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HotelItem({ hotel, onGetHotels }) {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState(`../../images/${hotel.hotelId}.jpg`);

  const dispatch = useDispatch();

  const handleImgError = () => {
    setSrc("../../images/no-image.jpg");
  };

  const navigate = useNavigate();

  const handleHotelReservation = () => {
    navigate(`/tourist/hotels/${hotel.hotelId}/reservation`);
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
          <Link to={`/tourist/hotels/${hotel.hotelId}`}>
            <CircleBackgroundIcon icon={VisibilityIcon} color="white" />
          </Link>

          <CircleBackgroundIcon
            icon={AddBoxOutlined}
            color="white"
            onClick={handleHotelReservation}
          />
        </Stack>
      </div>

      <Typography sx={{ fontWeight: "bold" }}>
        <Link to={"/tourist/hotels/" + hotel.hotelId}>
          {hotel.hotelName} - {hotel.hotelLocation}
        </Link>
      </Typography>
    </Stack>
  );
}
