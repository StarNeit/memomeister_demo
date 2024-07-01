/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ArchiveModal = ({
  open,
  handleClose,
  handleConfirm,
  isArchived,
}: any) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isArchived ? "Unarchive Folder" : "Archive Folder"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isArchived
            ? "Do you want to unarchive this folder?"
            : "Do you want to archive this folder?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArchiveModal;
