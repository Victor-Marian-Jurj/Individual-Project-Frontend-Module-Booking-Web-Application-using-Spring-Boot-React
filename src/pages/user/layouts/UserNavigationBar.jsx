import Drawer from "@mui/material/Drawer";
import ResponsiveMenuDrawer from "./UserResponsiveMenuDrawer";
import Box from "@mui/material/Box";

const NavigationBar = ({ width, isMobile, onDrawerToggle }) => {
  return (
    <Box
      component="nav"
      sx={{
        width: {
          sm: width,
        },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={isMobile}
        onClose={onDrawerToggle}
        modalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        <ResponsiveMenuDrawer />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
        open
      >
        <ResponsiveMenuDrawer />
      </Drawer>
    </Box>
  );
};

export default NavigationBar;
