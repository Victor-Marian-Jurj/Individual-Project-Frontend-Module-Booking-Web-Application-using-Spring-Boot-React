import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HotelsList from "./pages/hotel/HotelsList";
import CreateHotel from "./pages/hotel/CreateHotel";
import ViewHotel from "./pages/hotel/ViewHotel";
import EditHotel from "./pages/hotel/EditHotel";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/hotels", element: <HotelsList /> },
      { path: "/hotels/create", element: <CreateHotel /> },
      { path: "/hotels/:hotelId", element: <ViewHotel /> },
      { path: "/hotels/:hotelId/edit", element: <EditHotel /> },
      { path: "/admin", element: <div>Admin</div> },
      { path: "/account", element: <div>Account</div> },
    ],
  },
]);

//JSX
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
