/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_FOLDER } from "./mutation";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";

const CreateFolder = ({ open, handleClose, refetchFolders }: any) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState("");
  const [emoteIcon, setEmoteIcon] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [createFolder] = useMutation(CREATE_FOLDER, {
    onCompleted: () => {
      refetchFolders.current();
      handleClose();
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setSnackbarOpen(true);
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = () => {
    createFolder({
      variables: {
        input: {
          name,
          description,
          labels: labels.split(",").map((label) => label.trim()),
          emoteIcon,
          parentId: "",
        },
      },
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new folder, please fill out the form below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Labels (comma separated)"
            type="text"
            fullWidth
            variant="outlined"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Emote Icon"
            type="text"
            fullWidth
            variant="outlined"
            value={emoteIcon}
            onChange={(e) => setEmoteIcon(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateFolder;
