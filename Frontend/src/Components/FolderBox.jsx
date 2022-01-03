import './FolderBox.css'

function Drive_FolderBox() {
 return (
   <>
     <div class='folderBox'>
       <div class='editBox'>
         <div>
           <span class='material-icons-outlined editIcon' >
             edit
           </span>

           
         </div>
         <div>
           <span class='material-icons-outlined deleteIcon' >
             close
           </span>
         </div>
       </div>
       <div class='folderIcon'>
         <span class='material-icons'> folder </span>
       </div>
       <div class='folderName'>Untitled</div>
     </div>
   </>
 );
}
export default Drive_FolderBox;