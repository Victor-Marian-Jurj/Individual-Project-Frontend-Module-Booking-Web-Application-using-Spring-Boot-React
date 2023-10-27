import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewHotel = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    const getHotelById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hotels/${hotelId}`
        );
        setHotel(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getHotelById();
  }, [hotelId]);

  return <div>View hotel with title: {hotel.title} </div>;
};

export default ViewHotel;