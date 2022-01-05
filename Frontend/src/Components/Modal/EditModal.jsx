
import { useContext, useState } from 'react';
import DataContext from '../DataContext';
import axios from 'axios';
function EditModal() {
  let driveData = useContext(DataContext);

  const [newName, setNewName] = useState('')

  let renameElement = async (elementDetails) => {
    console.log("Send rename request");
    await axios.patch('http://localhost:5000/', {
      existing_id: elementDetails[1],
      name: newName,
      file_type: elementDetails[3]
    });
  }

  return (
    <>
      <div class='modal' id='editFolderModal'>
        <div class='innerModal'>
          <div class='nameText'>Rename Folder</div>
          <div class='modal-inputBox'>
            <input
              id='renameFolderInput'
              type='text'
              defaultValue={driveData.isEditModalOpened[2]}
              onChange={(event) => { setNewName(event.target.value) }}

            />
          </div>
          <div class='cancel_confirm-box'>
            <div
              class='cancel-btn'
              id='cancelEditFolderModal'
              onClick={() => {
                driveData.setIsEditModalOpened([false, '', '', '']);
              }}
            >
              Cancel
            </div>
            <div
              class='confirm-btn'
              id='editFolderBtn'
              onClick={() => {
                renameElement(driveData.isEditModalOpened)
                driveData.setIsEditModalOpened([false, '', '', '']);
                driveData.setDummyState(!driveData.dummyState)
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
