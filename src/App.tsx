import { useRef, useState } from "react";
import "./App.css";
import CreateFolder from "./CreateFolder";
import FoldersList from "./FolderList";
import { Button } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const refetchFolders = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ marginBottom: 2 }}
      >
        Create Folder
      </Button>
      <CreateFolder
        open={open}
        handleClose={handleClose}
        refetchFolders={refetchFolders}
      />
      <FoldersList refetchFolders={refetchFolders} />
    </>
  );
}

export default App;
