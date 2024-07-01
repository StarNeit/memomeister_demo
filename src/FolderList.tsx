/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import UpdateFolderModal from "./UpdateFolder";
import { GET_FOLDERS } from "./queries";
import { ARCHIVE_FOLDER, MOVE_FOLDER_TO_ACTIVE_ZONE } from "./mutation";
import ArchiveModal from "./ArchiveModal";

const FolderList = ({ refetchFolders }: any) => {
  const { loading, error, data, refetch } = useQuery(GET_FOLDERS, {
    variables: { sortOrder: "CREATED_AT", sortDirection: "DESC" },
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [archiveFolder] = useMutation(ARCHIVE_FOLDER, {
    onCompleted: () => {
      refetch();
      setArchiveModalOpen(false);
    },
    onError: (error) =>
      setSnackbar({ open: true, message: error.message, severity: "error" }),
  });
  const [moveFolderToActiveZone] = useMutation(MOVE_FOLDER_TO_ACTIVE_ZONE, {
    onCompleted: () => {
      refetch();
      setArchiveModalOpen(false);
    },
    onError: (error) =>
      setSnackbar({ open: true, message: error.message, severity: "error" }),
  });

  useEffect(() => {
    refetchFolders.current = refetch;
  }, [refetchFolders, refetch]);

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleUpdateClick = (folder: React.SetStateAction<null>) => {
    setSelectedFolder(folder);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedFolder(null);
    setModalOpen(false);
  };

  const handleArchiveClick = (folder: any) => {
    setSelectedFolder(folder);
    setArchiveModalOpen(true);
  };

  const handleArchiveConfirm = () => {
    if (selectedFolder.isArchived) {
      moveFolderToActiveZone({
        variables: { id: selectedFolder.id, targetFolderId: null },
      });
    } else {
      archiveFolder({ variables: { id: selectedFolder.id } });
    }
  };

  const handleArchiveModalClose = () => {
    setSelectedFolder(null);
    setArchiveModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.folders.edges.map(({ node }: any) => (
              <TableRow key={node.id}>
                <TableCell>{node.name}</TableCell>
                <TableCell>{node.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(node)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color={node.isArchived ? "secondary" : "primary"}
                    onClick={() => handleArchiveClick(node)}
                    sx={{ ml: 2 }}
                  >
                    {node.isArchived ? "Unarchive" : "Archive"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      {selectedFolder && (
        <UpdateFolderModal
          open={isModalOpen}
          handleClose={handleModalClose}
          folder={selectedFolder}
          refetch={refetch}
        />
      )}
      {selectedFolder && (
        <ArchiveModal
          open={isArchiveModalOpen}
          handleClose={handleArchiveModalClose}
          handleConfirm={handleArchiveConfirm}
          isArchived={selectedFolder.isArchived}
        />
      )}
    </div>
  );
};

export default FolderList;
