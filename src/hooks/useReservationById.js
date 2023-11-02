import { useEffect, useState } from "react";
import { getReservationById } from "../service/ReservationService";

export const useReservationById = (reservationId) => {
  const [reservation, setReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getReservation = async () => {
      try {
        setIsLoading(true);
        const reservation = await getReservationById(reservationId);
        setReservation(reservation);
        setIsError(false);
      } catch (e) {
        console.error(e);
        setIsError(e);
      } finally {
        setIsLoading(false);
      }
    };

    getReservation();
  }, [reservationId]);

  return { reservation, isLoading, isError };
};
