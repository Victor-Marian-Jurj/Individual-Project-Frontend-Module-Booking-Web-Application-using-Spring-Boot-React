import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HotelForm from "./HotelFormUser";
import MapComponent from "..//..//..//components/GoogleMap";
import { useHotelById } from "..//..//../hooks/useHotelById";

const ViewHotelUser = () => {
  const { hotelId } = useParams();
  const { hotel, loading } = useHotelById(hotelId);
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/tourist/hotels");
  };

  return (
    <div style={{ display: "flex" }}>
      {loading ? (
        <CircularProgress />
      ) : hotel ? (
        <>
          <div style={{ flex: 1, marginRight: "16px", marginBottom: "16px" }}>
            <HotelForm formTitle="View hotel" hotel={hotel} isReadonly={true} />
            <Button
              variant="outlined"
              onClick={handleCancelClick}
              sx={{ mt: "16px" }}
            >
              Cancel
            </Button>
          </div>
          <div style={{ flex: 1, marginLeft: "100px", marginTop: "100px" }}>
            <MapComponent
              latitude={hotel.latitude}
              longitude={hotel.longitude}
              containerElement={
                <div style={{ height: "540px", width: "400px" }} />
              }
              mapElement={<div style={{ height: "100%" }} />}
            />
          </div>
        </>
      ) : (
        <p>Hotel not found.</p>
      )}
    </div>
  );
};

export default ViewHotelUser;
