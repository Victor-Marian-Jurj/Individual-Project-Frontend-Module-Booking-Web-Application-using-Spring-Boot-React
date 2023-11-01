import { useEffect, useState } from "react";
import { getHotelById } from "../service/HotelService";

export const useHotelsByIds = (hotelIds) => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const hotelPromises = hotelIds.map((hotelId) => getHotelById(hotelId));
        const hotelsData = await Promise.all(hotelPromises);
        setHotels(hotelsData);
        setIsError(false);
      } catch (e) {
        console.error(e);
        setIsError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [hotelIds]);

  return { hotels, isLoading, isError };
};
