import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

const EmailStatusDialog = ({
  isOpen,
  onClose,
  emailSent,
  invalidEmail,
  validEmail,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Email Status</DialogTitle>
      <DialogContent>
        {emailSent ? (
          <Typography sx={{ color: "green", fontWeight: "bold" }}>
            Email has been sent!
          </Typography>
        ) : (
          invalidEmail && (
            <Typography sx={{ color: "red", fontWeight: "bold" }}>
              Invalid email address!
            </Typography>
          )
        )}

        {validEmail && (
          <Typography sx={{ color: "green", fontWeight: "bold" }}>
            Valid email address!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailStatusDialog;
