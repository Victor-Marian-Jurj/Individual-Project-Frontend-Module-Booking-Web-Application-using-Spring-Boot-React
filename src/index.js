import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HotelsList from "./pages/hotel/HotelsList";
import CreateHotel from "./pages/hotel/CreateHotel";
import CreateReservation from "./pages/reservation/CreateReservation";
import ViewHotel from "./pages/hotel/ViewHotel";
import EditHotel from "./pages/hotel/EditHotel";
import ReservationsTable from "./pages/reservation/ReservationsTable";
import { Provider } from "react-redux";
import store from "./stores/store";
import EditReservation from "./pages/reservation/EditReservation";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/hotel.manager/hotels", element: <HotelsList /> },
      { path: "/hotel.manager/hotels/create", element: <CreateHotel /> },
      {
        path: "/hotel.manager/hotels/:hotelId/reservation",
        element: <CreateReservation />,
      },
      { path: "/hotel.manager/hotels/:hotelId", element: <ViewHotel /> },
      { path: "/hotel.manager/hotels/:hotelId/edit", element: <EditHotel /> },
      {
        path: "/reservations/:reservationId/edit",
        element: <EditReservation />,
      },
      { path: "/hotel.manager/reservations", element: <ReservationsTable /> },
      // { path: "/account", element: <div>Account</div> },
    ],
  },
]);

//JSX
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
