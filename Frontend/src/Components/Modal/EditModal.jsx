
import { useContext } from 'react';
import DataContext from '../DataContext';
function EditModal() {
  let driveData = useContext(DataContext);
  return (
    <>
      <div class='modal' id='editFolderModal'>
        <div class='innerModal'>
          <div class='nameText'>Rename Folder</div>
          <div class='modal-inputBox'>
            <input
              id='renameFolderInput'
              type='text'
              placeholder='Rename Folder '
              onfocus='this.select()'
            />
          </div>
          <div class='cancel_confirm-box'>
            <div
              class='cancel-btn'
              id='cancelEditFolderModal'
              onClick={() => {
                driveData.setIsEditModalOpened(!driveData.isEditModalOpened);
              }}
            >
              Cancel
            </div>
            <div
              class='confirm-btn'
              id='editFolderBtn'
              onClick={() => {
                driveData.setIsEditModalOpened(!driveData.isEditModalOpened);
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

export default EditModal;
