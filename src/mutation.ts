import { gql } from "@apollo/client";

export const CREATE_FOLDER = gql`
  mutation CreateFolder($input: CreateFolderInputType!) {
    createFolder(input: $input) {
      id
      name
      description
      labels
      emoteIcon
    }
  }
`;

export const UPDATE_FOLDER = gql`
  mutation UpdateFolder($input: FolderInputType!) {
    updateFolder(input: $input) {
      folder {
        id
        name
        description
        labels
      }
    }
  }
`;

export const ARCHIVE_FOLDER = gql`
  mutation ArchiveFolder($id: String!) {
    archiveFolder(input: { id: $id }) {
      folder {
        id
        isArchived
      }
    }
  }
`;

export const MOVE_FOLDER_TO_ACTIVE_ZONE = gql`
  mutation MoveFolderToActiveZone($id: String!, $targetFolderId: String) {
    updateFolderWorkflowItem(
      input: { id: $id, workflowId: "", targetFolderId: $targetFolderId }
    ) {
      folder {
        id
        isArchived
      }
    }
  }
`;
