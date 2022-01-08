import { useContext, useState } from 'react';
import DataContext from '../DataContext';
import axios from 'axios';
function EditModal() {
  let driveData = useContext(DataContext);

  const [newName, setNewName] = useState('') //stores the data entered by the user in the input box

  let renameElement = async (elementDetails) => {//send PATCH request to rename the selected file/folder

    await axios.patch('http://localhost:5000/', {
      existing_id: elementDetails[1],
      name: newName,
      file_type: elementDetails[3]
    }).then(function (response) {
      console.log("Success");
      console.log(response);
    }).catch(function (error) {
      console.log(error);
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
                driveData.setIsLoading(true)
                setTimeout(() => {
                  console.log("Timeout");
                  driveData.setDummyState(!driveData.dummyState)
                  driveData.setIsLoading(false)
                }, 2000)
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
