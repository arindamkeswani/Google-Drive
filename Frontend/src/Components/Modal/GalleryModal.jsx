import React, { useContext, useState } from 'react';

import DataContext from '../DataContext';
import ImageContainer from '../ImageContainer'
import './GalleryModal.css';
function GalleryModal() {
  let driveData = useContext(DataContext);
  let [isFullscreen, setIsFullscreen] = useState(false);
  let imgModalRef = new React.createRef();
  let folderDataArr = driveData.pageData

  return (
    <>
      <div id='docModal' ref={imgModalRef}>
        <div class='docModal-header-bar'>
          <div class='docModal-headerBar-left'>
            <div class='docIcon'>
              <span class='material-icons'>image</span>
            </div>
            <div class='docTextIcon'>Gallery App</div>
          </div>
          <div class='docModal-headerBar-right'>
            <div
              class='headerBar-right-iconDivBox fullscreen'
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                if (isFullscreen === true) {
                  imgModalRef.current.style.top = '0rem';
                  imgModalRef.current.style.height = '100%';
                  imgModalRef.current.style.width = '100%';
                  // console.log(imgModalRef.current.style);
                } else {
                  if (isFullscreen === false) {
                    imgModalRef.current.style.top = '5rem';
                    imgModalRef.current.style.height = '';
                    imgModalRef.current.style.width = '';
                  }
                }
              }}
            >
              <span class='material-icons-outlined'> fullscreen </span>
            </div>
            <div
              class='headerBar-right-iconDivBox close'
              onClick={() => {
                driveData.setIsGallery(!driveData.isGallery);
                setIsFullscreen(false);
                imgModalRef.current.style.top = '5rem';
                imgModalRef.current.style.height = '';
                imgModalRef.current.style.width = '';
              }}
            >
              <span class='material-icons-outlined cancel'> close </span>
            </div>
          </div>
        </div>
        <div className='galleryArea'>
         
           {folderDataArr.map((ele) => {

              if (ele.file_name) {
                if (ele.ext == '.jpg' || ele.ext == '.png' || ele.ext == '.jpeg' || ele.ext == '.gif') {
                  return <ImageContainer fileDataInObj={ele} />
                } 
              }
            })}
        
          
        </div>
      </div>
    </>
  );
}

export default GalleryModal;
