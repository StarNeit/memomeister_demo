import { gql } from "@apollo/client";

export enum FolderSortAfter {
  ID,
  CREATED_AT,
  ALPHABETICALLY,
  LAST_ACTIVITY,
  WORKFLOW_ITEM_CHANGED,
  LAST_MODIFIED,
}

export enum SortDirection {
  ASC,
  DESC,
}

export const GET_FOLDERS = gql`
  query GetFolders(
    $folderId: String
    $text: String
    $sortOrder: FolderSortAfter
    $sortDirection: SortDirection
  ) {
    folders(
      first: 100
      filter: { parentId: $folderId, text: $text, includeArchive: true }
      sortAfter: $sortOrder
      sortDirection: $sortDirection
    ) {
      edges {
        node {
          id
          hasSubfolders
          name
          description
          emoteIcon
          isArchived
          isRemoved
          breadcrumb {
            id
            description
            emoteIcon
            name
          }
        }
      }
    }
  }
`;
