import { useContext } from 'react';
import DataContext from '../DataContext';
import '../Modal/AddFolderModal.css'



function AddFolderModal() {
 let dataDrive = useContext(DataContext);
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
             onfocus='this.select()'
           />
         </div>
         <div class='cancel_confirm-box'>
           <div
             class='cancel-btn'
             id='canceladdFolderModal'
             onClick={dataDrive.createFolderModalToggle}
           >
             Cancel
           </div>
           <div
             class='confirm-btn'
             id='createFolderBtn'
             onClick={dataDrive.createFolderModalToggle}
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