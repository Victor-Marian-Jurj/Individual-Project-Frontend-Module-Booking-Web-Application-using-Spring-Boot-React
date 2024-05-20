import { Avatar, Badge } from "@mui/material";
import "..//..//..//styles/UserAvatar.css";

const UserAvatar = () => {
  return (
    <Badge
      className="styled-badge"
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
      color="success"
      sx={{ marginRight: "8px" }}
    >
      <Avatar alt="T" src="/static/images/avatar/1.jpg" />
    </Badge>
  );
};

export default UserAvatar;
