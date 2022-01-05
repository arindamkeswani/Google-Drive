
import './FolderBox.css'
import { useContext } from 'react';
import DataContext from './DataContext';
function Drive_FolderBox(props) {

  let folderData = props.folderDataInObj;
   let driveData = useContext(DataContext);
  let display_folder_id=(id,name)=>{
    driveData.setBreadcrumbID(id)
    driveData.setBreadcrumbArr([...driveData.breadcrumbArr, { name:name, id: id }])
    driveData.setDummyState(!driveData.dummyState)
   }
 return (
   <>
      <div
       class='folderBox'
       id={folderData.id}
       parent_folder={folderData.parent_folder}
       onClick={()=>{
         display_folder_id(folderData.id,folderData.folder_name)
       }}
     >
       <div class='editBox'>
         <div>
           <span
             class='material-icons-outlined editIcon'
             id={folderData.id}
             parent_folder={folderData.parent_folder}
           >
             edit
           </span>
         </div>
         <div>
           <span
             class='material-icons-outlined deleteIcon'
             id={folderData.id}
             parent_folder={folderData.parent_folder}
           >
             close
           </span>
         </div>
       </div>
       <div class='folderIcon'>
         <span class='material-icons'> folder </span>
       </div>
       <div class='folderName'>{folderData.folder_name}</div>
     </div> 
   </>
 );
}
export default Drive_FolderBox;