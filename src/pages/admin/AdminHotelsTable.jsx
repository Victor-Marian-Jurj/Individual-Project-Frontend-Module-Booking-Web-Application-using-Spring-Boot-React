import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useHotelsByIds } from "../../hooks/useHotelsByIds";

const AdminHotelsTable = () => {
  const { hotels } = useHotelsByIds();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Breakfast</TableCell>
            <TableCell align="right">WiFi Connection</TableCell>
            <TableCell align="right">Private parking</TableCell>
            <TableCell align="right">Minibar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow
              key={hotel.hotelId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {hotel.title}
              </TableCell>
              <TableCell align="right">{hotel.hotelName}</TableCell>
              <TableCell align="right">{hotel.hotelLocation}</TableCell>
              <TableCell align="right">{hotel.rating}</TableCell>
              <TableCell align="right">{hotel.breakfast}</TableCell>
              <TableCell align="right">{hotel.wifiConnection}</TableCell>
              <TableCell align="right">{hotel.privateParking}</TableCell>
              <TableCell align="right">{hotel.minibar}</TableCell>
              <TableCell align="right">
                <Link to={`/hotels/${hotel.hotelId}`}>
                  <Button>Edit</Button>
                </Link>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminHotelsTable;
