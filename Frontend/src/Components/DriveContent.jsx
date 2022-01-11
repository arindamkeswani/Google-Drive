import './DriveContent.css'

import DriveFolderBox from './FolderBox';
import DataContext from './DataContext';
import { useContext } from 'react';
import DocFileBox from './DocFileBox';
import VideoContainer from './VideoContainer'
import ImageContainer from './ImageContainer'
function DriveContent() {
  let driveData = useContext(DataContext);
  let folderDataArr = driveData.pageData;
  let breadcrumbArr = driveData.breadcrumbArr;

  //Update the breadcrumb array and current breadcrumb ID (which represents the selected folder) on clicking a breadcrumb
  let update_arr_according_to_breadcrumb = (id, name) => {
    let currBreadcrumbFound = false

    for (let i = breadcrumbArr.length - 1; i >= 0; i--) {
      if (currBreadcrumbFound == false) {
        if (breadcrumbArr[i].id == id) {
          currBreadcrumbFound = true;
        } else {
          breadcrumbArr.pop()
        }
      }
      else {
        break;
      }
    }

    //Following statements need to be in order
    // console.log(driveData.breadcrumbArr);
    driveData.setBreadcrumbID(driveData.breadcrumbArr[driveData.breadcrumbArr.length - 1].id)
    // console.log(driveData.currentBreadcrumbID);
    driveData.setDummyState(!driveData.dummyState)
    // console.log(driveData.pageData);

  }

  return (
    <>
      <div class='content-container' onClick={driveData.closeFileMenu}>
        <div class='path-container'>
          {/* ------------------------ */}
          {breadcrumbArr.map((e) => {
            return (
              <div
                class='rootBox-contianer'
                onClick={() => {
                  update_arr_according_to_breadcrumb(e.id, e.name);
                }}
              >
                <div class='rootBox' id={e.id}>
                  {e.name}
                </div>
                <span class='material-icons-outlined'> chevron_right </span>
              </div>
            );
          })}
        </div>
        <div class='folder-container'>
          <div class='folder-navigation'>Folder</div>
          <div class='inner-folder-container'>
            {folderDataArr.map((ele) => {

              if (ele.folder_name) {
                return <DriveFolderBox folderDataInObj={ele} />;
              } else if (ele.file_name) {
                if (ele.ext == '.txt') {
                  return <DocFileBox fileDataInObj={ele} />;
                } else if (ele.ext == '.jpg' || ele.ext == '.png' || ele.ext == '.jpeg' || ele.ext == '.gif') {
                  return <ImageContainer fileDataInObj={ele} />
                } else if (ele.ext = 'mp4') {
                  return <VideoContainer fileDataInObj={ele} />
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
