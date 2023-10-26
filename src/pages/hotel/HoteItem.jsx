import { Link, Stack, Typography } from "@mui/material";
import CircleBackgroundIcon from "../../components/CircleBackgroundIcon";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

export default function HotelItem({ hotel: hotel }) {
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
          src={`../../images/${hotel.id}.jpg`}
          loading="lazy"
          alt="Hotel cover"
        />
        <Stack
          direction="row"
          alignItems="center"
          spacing={4}
          className="middle"
        >
          <CircleBackgroundIcon icon={VisibilityIcon} color="white" />
          <CircleBackgroundIcon icon={EditIcon} color="white" />
          <CircleBackgroundIcon icon={DeleteSharpIcon} color="white" />
        </Stack>
      </div>

      <Typography sx={{ fontWeight: "bold" }}>
        <Link color="black" href="#" underline="none">
          {hotel.hotelName} - {hotel.hotelLocation}
        </Link>
      </Typography>
    </Stack>
  );
}
