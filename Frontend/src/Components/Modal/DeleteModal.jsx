
import { useContext } from 'react';
import DataContext from '../DataContext';
import axios from 'axios';
function DeleteModal() {
  let driveData = useContext(DataContext);

  let deleteElement = async (elementDetails) => {
    // console.log("Send delete request");
    // console.log(elementDetails[1],elementDetails[2],elementDetails[3]);
    await axios.delete('http://localhost:5000/', {
      data: {
        existing_id: elementDetails[1],
        name: elementDetails[2],
        file_type: elementDetails[3]
      }
    });
  }

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
                  [!driveData.isDeleteModalOpened[0], '', '', '']
                );
              }}
            >
              Cancel
            </div>
            <div
              class='confirm-btn'
              id='deleteFolderBtn'
              onClick={() => {
                deleteElement(driveData.isDeleteModalOpened)
                driveData.setIsDeleteModalOpened(
                  [!driveData.isDeleteModalOpened[0], '', '', '']
                );
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

export default DeleteModal;
