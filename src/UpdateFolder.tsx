/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
  AlertColor,
  Dialog,
} from "@mui/material";
import { UPDATE_FOLDER } from "./mutation";

const UpdateFolderModal = ({ open, handleClose, folder, refetch }: any) => {
  const [formData, setFormData] = useState({ ...folder });
  const [updateFolder] = useMutation(UPDATE_FOLDER, {
    onCompleted: () => {
      refetch();
      handleClose();
    },
    onError: (error) =>
      setSnackbar({ open: true, message: error.message, severity: "error" }),
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateFolder({
      variables: {
        input: {
          id: formData.id,
          name: formData.name,
          description: formData.description,
        },
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          margin: "auto",
          maxWidth: 500,
        }}
      >
        <h2>Update Folder</h2>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Emote Icon"
          name="emoteIcon"
          value={formData.emoteIcon}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update
        </Button>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity as AlertColor}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Dialog>
  );
};

export default UpdateFolderModal;
