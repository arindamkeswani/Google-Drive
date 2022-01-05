import { useContext } from 'react';
import DataContext from '../DataContext';
import '../Modal/FileMenu.css';
function FileMenu() {
  let driveData = useContext(DataContext);
  return (
    <>
      <div class='menu-FileOption'>
        <div
          class='menu-single-box menu-createFolderBtn'
          onClick={() => {
            driveData.openCreateFolderModal();
          }}
        >
          <div class='menuIcon'>
            <span class='material-icons-outlined'> create_new_folder </span>
          </div>
          <div class='menuFile-Name'>Folder</div>
        </div>
        <div class='multiple-single-box'>
          <div class='menu-multiple-box' onClick={() => {
            driveData.NotepadToggle()
            // driveData.setCurrentNotepadDetails({})
          }}>
            <div class='menuIcon'>
              <span class='material-icons googleDocsIcon'> description </span>
            </div>
            <div class='menuFile-Name'>Google Docs</div>
          </div>
          <div class='menu-multiple-box'>
            <div class='menuIcon'>
              <span class='material-icons sheetIcon'> note_add </span>
            </div>
            <div class='menuFile-Name'>Google Sheet</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FileMenu;
