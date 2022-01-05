import './DriveContent.css'

import DriveFolderBox from './FolderBox';
import DataContext from './DataContext';
import { useContext } from 'react';
import DocFileBox from './DocFileBox';

function DriveContent() {
  let driveData = useContext(DataContext);
  let folderDataArr = driveData.pageData;
  let breadcrumbArr = driveData.breadcrumbArr;

  let update_arr_according_to_breadcrumb = (id, name) => {
    let currBreadcrumbFound = false
    let newArr = breadcrumbArr.filter((e) => {
      if (!currBreadcrumbFound) {
        if (e.id == id) {
          currBreadcrumbFound = true;
        }
        return e
      }
    })

    driveData.setBreadcrumbArr(newArr)

  }

  return (
    <>
      <div class='content-container' onClick={driveData.closeFileMenu}>
        <div class='path-container'>
          {/* ------------------------ */}
          {breadcrumbArr.map((e) => {
            return (
              <div class="rootBox-contianer" onClick={() => {
                update_arr_according_to_breadcrumb(e.id, e.name)
                
              }}>
                <div class="rootBox" id={e.id}>{e.name}</div>
                <span class="material-icons-outlined"> chevron_right </span>
              </div>
            )
          })}


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
