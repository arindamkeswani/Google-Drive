
import { useContext } from 'react';
import DataContext from '../DataContext';
function DeleteModal() {
    let driveData = useContext(DataContext);
  return (
    <>
      <div class='modal' id='deleteFolderModal'>
        <div class='innerModal'>
          <div class='nameText'>Delete Folder</div>
          <div class='modal-inputBox'>
            This folder will be deleted. Confirm?
          </div>
          <div class='cancel_confirm-box'>
            <div
              class='cancel-btn'
              id='cancelDeleteFolderModal'
              onClick={() => {
                driveData.setIsDeleteModalOpened(
                  !driveData.isDeleteModalOpened
                );
              }}
            >
              Cancel
            </div>
            <div
              class='confirm-btn'
              id='deleteFolderBtn'
              onClick={() => {
                driveData.setIsDeleteModalOpened(
                  !driveData.isDeleteModalOpened
                );
              }}
            >
              OK
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
