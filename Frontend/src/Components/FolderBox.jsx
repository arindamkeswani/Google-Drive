
import './FolderBox.css'
import { useContext } from 'react';
import DataContext from './DataContext';
import EditModal from './Modal/EditModal';
function Drive_FolderBox(props) {

  let folderData = props.folderDataInObj;
  let driveData = useContext(DataContext);
  
  //Function to update the breadcrumb trail and selected folder details on clicking a folder to view its contents
  let display_folder_id = (id, name) => {
    driveData.setBreadcrumbID(id)
    driveData.setBreadcrumbArr([...driveData.breadcrumbArr, { name: name, id: id }])
    driveData.setDummyState(!driveData.dummyState)
  }
  return (
    <>
      <div
        class='folderBox'
        id={folderData.id}
        parent_folder={folderData.parent_folder}
      >
        <div class='editBox'>
          <div
            onClick={() => {
              //Set selected folder's data in the Edit Modal 
              driveData.setIsEditModalOpened([!driveData.isEditModalOpened[0], folderData.id, folderData.folder_name, "folder"]);
            }}
          >
            <span
              class='material-icons-outlined editIcon'
              id={folderData.id}
              parent_folder={folderData.parent_folder}
            >
              edit
            </span>
          </div>
          <div
            onClick={() => {
              //Set selected folder's data so that it can be sent via the Delete Modal 
              driveData.setIsDeleteModalOpened([!driveData.isDeleteModalOpened[0], folderData.id, folderData.folder_name, "folder"]);
            }}
          >
            <span
              class='material-icons-outlined deleteIcon'
              id={folderData.id}
              parent_folder={folderData.parent_folder}
            >
              close
            </span>
          </div>
        </div>
        <div
          class='folderIcon'
          onClick={() => {
            display_folder_id(folderData.id, folderData.folder_name);
          }}
        >
          <span class='material-icons'> folder </span>
        </div>
        <div class='folderName'>{folderData.folder_name}</div>
      </div>
    </>
  );
}
export default Drive_FolderBox;