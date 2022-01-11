import './MediaContainer.css'
import { useContext } from 'react';
import DataContext from './DataContext';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ImageContainer(props) {
  let driveData = useContext(DataContext);
  let fileData = props.fileDataInObj
  let truncate_name = (fileName) => {
    if (fileName.length < 12) {
      return fileName
    }
    return fileName.substring(0, 12) + "...";
  }
  return (
    <>
      <div className='mediaBox'>
        <div class='editBox-media'>
          <div onClick={() => {
            //retrieve selected file's data and display the original name in the Edit File name modal
            driveData.setIsEditModalOpened([!driveData.isEditModalOpened[0], fileData.id, fileData.file_name, "media"]);
          }}>
            <span
              class='material-icons-outlined editIcon'
            >
              edit
            </span>
          </div>
          <div
            onClick={() => {
              //retrieve selected file's data and display the original name in the Edit File name modal
              driveData.setIsDeleteModalOpened([!driveData.isEditModalOpened[0], fileData.id, fileData.file_name, "media"]);
            }
            }>
            <span
              class='material-icons-outlined deleteIcon'
            >
              close
            </span>
          </div>
        </div>
        <div
          class='mediaActualData'
          onClick={() => {
          
            driveData.WindowModalForImageCarousel();
            driveData.setCurrentImageData(props.fileDataInObj)
          }}
        >
            <img
              src={"http://localhost:5000/" + props.fileDataInObj.url}
              alt=''
            />
        </div>
        <div className='mediaName'>{truncate_name(props.fileDataInObj.file_name)}</div>
      </div>
    </>
  )
}
export default ImageContainer;