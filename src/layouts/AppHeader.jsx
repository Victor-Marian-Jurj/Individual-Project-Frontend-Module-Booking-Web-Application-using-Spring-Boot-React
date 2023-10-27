import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const AppHeader = ({ width, onDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          sm: `calc(100% - ${width}px)`,
        },
        ml: {
          sm: `${width}px`,
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{
            mr: 2,
            display: {
              sm: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          Hotels
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
