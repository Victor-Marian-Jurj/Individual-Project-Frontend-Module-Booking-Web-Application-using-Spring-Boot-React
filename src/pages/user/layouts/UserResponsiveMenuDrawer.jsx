import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import UserAvatar from "..//..//user/layouts/UserAvatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HotelIcon from "@mui/icons-material/Hotel";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const ResponsiveMenuDrawer = () => {
  const menuItems = [
    { text: "Hotels", icon: HotelIcon, path: "/tourist/hotels" },
    {
      text: "Reservations",
      icon: CheckCircleIcon,
      path: "/tourist/reservations",
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
          <ListItemText primary="Tourist" />
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
    </div>
  );
};

export default ResponsiveMenuDrawer;
