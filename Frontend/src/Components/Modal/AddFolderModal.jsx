import axios from 'axios';
import { useContext, useState } from 'react';
import DataContext from '../DataContext';
import '../Modal/AddFolderModal.css'



function AddFolderModal() {
 let driveData = useContext(DataContext);
  const [folder_input_value,set_folder_input_value] = useState('') //stores folder name
  

 async function createFolder(){ //send POST request to store new folder in the database

   await axios.post('http://localhost:5000/', {
     parent_folder: driveData.currentBreadcrumbID,
     folder_name:folder_input_value
    });
 }

 return (
   <>
     <div class='modal' id='addFolderModal'>
       <div class='innerModal'>
         <div class='nameText'>Add Folder</div>
         <div class='modal-inputBox'>
           <input
             id='createFolderInput'
             type='text'
             placeholder='Add Folder Name'
            //  onFocus='this.select()'
             onChange={event=>{
              set_folder_input_value(event.target.value)
             }}
           />
         </div>
         <div class='cancel_confirm-box'>
           <div
             class='cancel-btn'
             id='canceladdFolderModal'
             onClick={driveData.closeCreateFolderModal}
           >
             Cancel
           </div>
           <div
             class='confirm-btn'
             id='createFolderBtn'
             onClick={()=>{driveData.closeCreateFolderModal(); 
              driveData.setIsLoading(true)
              setTimeout(() => {
                console.log("Timeout");
                driveData.setIsLoading(false)
                driveData.setDummyState(!driveData.dummyState)
              }, 2000)
              createFolder()}}
           >
             OK
           </div>
         </div>
       </div>
     </div>
   </>
 );
}

export default AddFolderModal;