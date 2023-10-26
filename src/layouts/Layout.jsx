import { useState } from "react";
import Box from "@mui/material/Box";
import AppHeader from "./AppHeader";
import NavigationBar from "./NavigationBar";
import MainView from "./MainView";

const drawerWidth = 300;

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <Box sx={{ display: "flex" }}>
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

export default Layout;
