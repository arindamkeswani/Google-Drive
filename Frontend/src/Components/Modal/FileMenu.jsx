import React, { useContext, useState } from 'react';
import DataContext from '../DataContext';
import '../Modal/FileMenu.css';
function FileMenu() {
  let driveData = useContext(DataContext);
  let [isGallerySubMenu, setIsGallerySubMenu] = useState(false);
 
  let inputFileReference = new React.createRef();
let [src,setSrc]=useState("")
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
          <div
            class='menu-multiple-box'
            onClick={() => {
              driveData.NotepadToggle();
              driveData.set_check_exist_notepad(false);
              // driveData.setCurrentNotepadDetails({})
            }}
          >
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
          <div
            class='menu-multiple-box cameraGallery'
            onClick={() => {
              setIsGallerySubMenu(!isGallerySubMenu);
            }}
          >
            <div class='menuIcon'>
              <span class='material-icons'>image</span>
            </div>
            <div class='menuFile-Name'>Gallery</div>

            {isGallerySubMenu ? (
              <div className='gallerySubMenu'>
                <div
                  className='g-textBox'
                  onClick={() => {
                    driveData.closeFileMenu();
                    inputFileReference.current.addEventListener(
                      'change',
                      function (e) {
                        // do something (this works!)
                        let imgFile = e.target.files[0];

                        let url = URL.createObjectURL(imgFile);
                        //URl-ImageBlob
                        console.log(url);
                      },
                      false
                    );
                    inputFileReference.current.click();
                  }}
                >
                  <input
                    ref={inputFileReference}
                    accept='image/png, image/jpeg'
                    id='icon-button-file'
                    type='file'
                    style={{ display: 'none' }}
                  />
                  Upload Image
                </div>

                <div
                  className='g-textBox'
                  onClick={() => {
                    driveData.toggleImageGallery();
                  }}
                >
                  Open Gallery
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      <img src={src} alt='imagef'/>
      </div>
    </>
  );
}

export default FileMenu;
