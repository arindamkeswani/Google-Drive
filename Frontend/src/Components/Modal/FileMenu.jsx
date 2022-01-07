import axios from 'axios';
import React, { useContext, useState, } from 'react';
import DataContext from '../DataContext';
import '../Modal/FileMenu.css';
function FileMenu() {
  let driveData = useContext(DataContext);
  let [isGallerySubMenu, setIsGallerySubMenu] = useState(false);
  let [src, setSrc] = useState("")
  let inputFileReference = new React.createRef();


  async function saveMediaInDB(url, fileName, extension) {
    console.log(`Saving ${fileName} with extention ${extension} in DB`);
    await axios.post('http://localhost:5000/', {
      parent_folder: driveData.currentBreadcrumbID,
      file_name: fileName,
      url: url,
      ext: "." + extension
    });
  }

  const readURL = file => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.onerror = e => rej(e);
      reader.readAsDataURL(file);
    });
  };
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
                  onClick={(e) => {
                    e.stopPropagation();
                    driveData.closeFileMenu();
                    inputFileReference.current.click();
                    inputFileReference.current.addEventListener(
                      'change',
                      async function(e) {
                      e.stopPropagation();
                      // do something (this works!)
                      let file = e.target.files[0];
                      let name = file.name.split(".")[0];
                      let extension = file.name.split(".")[1];
                        const url = await readURL(file);
                        console.log(url.length);
                      //URl-ImageBlob
                      // console.log(url);
                      saveMediaInDB(url, name, extension)
                    }
                    );
                  }}

                >
                  <input
                    ref={inputFileReference}
                    // accept='image/png, image/jpeg'
                    id='icon-button-file'
                    type='file'
                    style={{ display: 'none' }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                  Upload media
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
      </div>
    </>
  );
}

export default FileMenu;
