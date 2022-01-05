
import './DocFileBox.css';
import { useContext } from 'react';
import DataContext from './DataContext';
function DocFileBox(props) {
  let fileData = props.fileDataInObj;
  let driveData = useContext(DataContext);
  let display_file_id = (id,name) => {
    driveData.setBreadcrumbID(id)
  }

 let openNotepad=(id,name)=>{
   driveData.NotepadToggle();

  let currentNotepadData= driveData.pageData.find((ele)=> ele.id == id)
  // console.log(currentNotepadData);
   driveData.setCurrNotepadData(currentNotepadData)
  }

  return (
    <>
      <div
        class='folderBox'
        id={fileData.id}
        parent_folder={fileData.parent_folder}
        onClick={() => {
          display_file_id(fileData.id, fileData.file_name);
          openNotepad(fileData.id, fileData.file_name);
        }}
      >
        <div class='editBox'>
          <div>
            <span
              class='material-icons-outlined editIcon'
              id={fileData.id}
              parent_folder={fileData.parent_folder}
            >
              edit
            </span>
          </div>
          <div>
            <span
              class='material-icons-outlined deleteIcon'
              id={fileData.id}
              parent_folder={fileData.parent_folder}
            >
              close
            </span>
          </div>
        </div>
        <div class='fileIcon'>
          <span class='material-icons'> description </span>
        </div>
        <div class='folderName'>{fileData.file_name}</div>
      </div>
    </>
  );
}

export default DocFileBox;
