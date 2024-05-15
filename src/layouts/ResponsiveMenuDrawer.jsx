import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import UserAvatar from "../components/UserAvatar";

// import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import HotelIcon from "@mui/icons-material/Hotel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const ResponsiveMenuDrawer = () => {
  const menuItems = [
    { text: "Hotels", icon: HotelIcon, path: "/hotel.manager/hotels" },
    {
      text: "Reservations",
      icon: CheckCircleIcon,
      path: "/hotel.manager/reservations",
    },
  ];

  const accountMenuItems = [
    // { text: "My account", icon: AccountBoxIcon, to: "/account" },
  ];

  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <UserAvatar />
          </ListItemAvatar>
          <ListItemText primary="MarianS" secondary="stoicamarian@yahoo.com" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {menuItems.map(({ text, icon: ItemIcon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <Link to={path}>
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {accountMenuItems.map(({ text, icon: ItemIcon, to }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <Link to={to}>
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "16px",
        }}
      >
        <Link to="/hotel.manager/hotels/create">
          <Button variant="contained" startIcon={<AddIcon />}>
            New Hotel
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default ResponsiveMenuDrawer;
