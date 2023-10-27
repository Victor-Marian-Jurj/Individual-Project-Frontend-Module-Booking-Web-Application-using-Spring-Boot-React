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

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";

const ResponsiveMenuDrawer = () => {
  const menuItems = [
    { text: "Dashboard", icon: DashboardIcon },
    { text: "Admin", icon: AdminPanelSettingsIcon },
  ];

  const accountMenuItems = [{ text: "My account", icon: AccountBoxIcon }];

  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <UserAvatar />
          </ListItemAvatar>
          <ListItemText
            primary="MarianS"
            secondary="stoicamarian@yahoo.com"
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        {menuItems.map(({ text, icon: ItemIcon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {accountMenuItems.map(({ text, icon: ItemIcon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
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
        <Button variant="contained" startIcon={<AddIcon />}>
          New Hotel
        </Button>
      </Box>
    </div>
  );
};

export default ResponsiveMenuDrawer;
