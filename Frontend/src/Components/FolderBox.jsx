import './FolderBox.css'

function Drive_FolderBox(props) {
  let folderData = props.folderDataInObj;
 return (
   <>
     <div
       class='folderBox'
       id={folderData.id}
       parentFolder={folderData.parent_folder}
     >
       <div class='editBox'>
         <div>
           <span
             class='material-icons-outlined editIcon'
             id={folderData.id}
             parentFolder={folderData.parent_folder}
           >
             edit
           </span>
         </div>
         <div>
           <span
             class='material-icons-outlined deleteIcon'
             id={folderData.id}
             parentFolder={folderData.parent_folder}
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