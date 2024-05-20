import { useState } from "react";
import Box from "@mui/material/Box";
import AppHeader from "..//..//..//layouts/AppHeader";
import NavigationBar from "./UserNavigationBar";
import MainView from "./UserMainView";
import AppSnackbar from "..//..//..//components/AppSnackbar";

const drawerWidth = 300;

const UserLayout = () => {
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

export default UserLayout;
