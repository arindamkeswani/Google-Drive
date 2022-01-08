
import './DocFileBox.css';
import { useContext } from 'react';
import DataContext from './DataContext';
function DocFileBox(props) {
  let fileData = props.fileDataInObj;
  let driveData = useContext(DataContext);
  let display_file_id = (id, name) => {
  //   // driveData.setBreadcrumbArr([...driveData.breadcrumbArr, { name:name, id: id }])
  //   // driveData.setBreadcrumbID(id)
  }

  //open existing file and set its data in the UI
  let openNotepad = (id, name) => { 
    driveData.NotepadToggle();
    driveData.set_check_exist_notepad(true)
    let currentNotepadData = driveData.pageData.find((ele) => ele.id == id)

    driveData.setCurrNotepadData(currentNotepadData)
    driveData.setBreadcrumbID(id)
  }

  let truncate_name = (fileName)=>{
    if(fileName.length<12){
      return fileName
    }
    return fileName.substring(0,12)+"...";
  }

  return (
    <>
      <div
        class='folderBox'
        id={fileData.id}
        parent_folder={fileData.parent_folder}
      >
        <div class='editBox'>
          <div
            onClick={() => {
              //retrieve selected file's data and display the original name in the Edit File name modal
              driveData.setIsEditModalOpened([!driveData.isEditModalOpened[0], fileData.id, fileData.file_name, "notepad"]);
            }}
          >
            <span
              class='material-icons-outlined editIcon'
              id={fileData.id}
              parent_folder={fileData.parent_folder}
            >
              edit
            </span>
          </div>
          <div onClick={() => {
            //retrieve selected file's data and to be send via the Delete File name modal
            driveData.setIsDeleteModalOpened([!driveData.isDeleteModalOpened[0], fileData.id, fileData.file_name, "notepad"]);
          }}>
            <span
              class='material-icons-outlined deleteIcon'
              id={fileData.id}
              parent_folder={fileData.parent_folder}
            >
              close
            </span>
          </div>
        </div>
        <div
          class='fileIcon'
          onClick={() => {
            display_file_id(fileData.id, fileData.file_name);
            openNotepad(fileData.id, fileData.file_name);
          }}
        >
          <span class='material-icons'> description </span>
        </div>
        <div class='folderName'>{truncate_name(fileData.file_name)}</div>
      </div>
    </>
  );
}

export default DocFileBox;
