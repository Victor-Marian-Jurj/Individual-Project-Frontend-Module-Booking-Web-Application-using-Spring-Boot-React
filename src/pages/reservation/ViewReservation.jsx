import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReservationById } from "../../hooks/useReservationById";
import { CircularProgress } from "@mui/material";
import ReservationForm from "./ReservationForm";

const ViewReservation = () => {
  const { reservationId } = useParams();
  const { reservation } = useReservationById(reservationId);

  return reservation ? (
    <ReservationForm formTitle="View reservation" reservation={reservation} isReadonly={true} />
  ) : (
    <CircularProgress />
  );
};

export default ViewReservation;