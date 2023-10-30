import { useEffect, useState } from "react";
import { getHotelById } from "../service/HotelService";

export const useHotelById = (hotelId) => {
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getHotel = async () => {
      try {
        setIsLoading(true);
        const hotel = await getHotelById(hotelId);
        setHotel(hotel);
        setIsError(false);
      } catch (e) {
        console.error(e);
        setIsError(e);
      } finally {
        setIsLoading(false);
      }
    };

    getHotel();
  }, [hotelId]);

  return { hotel, isLoading, isError };
};
