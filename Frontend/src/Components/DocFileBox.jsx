
import './DocFileBox.css';
function DocFileBox(props) {
  let fileData = props.fileDataInObj;

  return (
    <>
       <div
        class='folderBox'
        id={fileData.id}
        parent_folder={fileData.parent_folder}
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
        <div class='folderIcon'>
          <span class='material-icons'> description </span>
        </div>
        <div class='folderName'>{fileData.file_name}</div>
      </div> 
    </>
  );
}

export default DocFileBox;
