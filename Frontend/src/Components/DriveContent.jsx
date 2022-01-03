import './DriveContent.css'
import DriveFolderBox from './FolderBox';
function DriveContent() {
  return (
    <>
      <div class='content-container'>
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
       <DriveFolderBox/>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriveContent;
