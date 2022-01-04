import './DriveContent.css'

import DriveFolderBox from './FolderBox';
import DataContext from './DataContext';
import { useContext } from 'react';
import DocFileBox from './DocFileBox';

function DriveContent() {
  let driveData = useContext(DataContext);
  let folderDataArr = driveData.pageData;

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
            

            {folderDataArr.map((ele) => {
              if (ele.folder_name) {
                return <DriveFolderBox folderDataInObj={ele} />;
              } else if (ele.file_name) {
                if (ele.ext == ".txt") {
                  return <DocFileBox fileDataInObj={ele} />;
                }
              }

            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DriveContent;
