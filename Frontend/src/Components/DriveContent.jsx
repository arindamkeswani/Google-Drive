import './DriveContent.css'

import DriveFolderBox from './FolderBox';
import DataContext from './DataContext';
import { useContext } from 'react';
function DriveContent() {
  let driveData = useContext(DataContext);

  return (
    <>
      <div class='content-container' onClick={driveData.closeFileMenu}>
        <div class='path-container'>
          <div class='rootBox-contianer'>
            <div class='rootBox' id='root'>
              My Drive
            </div>
            <span class='material-icons-outlined'> chevron_right </span>
          </div>
        </div>
        <div class='folder-container'>
          <div class='folder-navigation'>Folder</div>
          <div class='inner-folder-container'>
            <DriveFolderBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default DriveContent;
