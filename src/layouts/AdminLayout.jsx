import { useState } from "react";
import Box from "@mui/material/Box";
import AppHeader from "./AppHeader";
import NavigationBar from "./NavigationBar";
import MainView from "./MainView";
import AppSnackbar from "../components/AppSnackbar";

const drawerWidth = 300;

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppSnackbar />
      <AppHeader width={drawerWidth} onDrawerToggle={handleDrawerToggle} />
      <NavigationBar
        width={drawerWidth}
        onDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      <MainView />
    </Box>
  );
};

export default AdminLayout;
