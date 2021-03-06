import axios from 'axios';
import React, { useContext, useState, } from 'react';
import DataContext from '../DataContext';
import '../Modal/FileMenu.css';
function FileMenu() {
  let driveData = useContext(DataContext);
  let [isGallerySubMenu, setIsGallerySubMenu] = useState(false);
  let [currentMediaFile, setCurrentMediaFile] = useState({})
  let inputFileReference = new React.createRef();


  async function saveMediaInDB(url, fileName, extension, file) {
    console.log(`Saving ${fileName} with extention ${extension} in DB`);
    
    await axios.post('http://localhost:5000/', {
      parent_folder: driveData.currentBreadcrumbID,
      file_name: fileName,
      url: url,
      ext: "." + extension,
    })

    // await axios.post('http://localhost:5000/uploadMedia', file)

  }

  // async function saveMediaInFolder(file){
  //   console.log(`Saving file in folder`);
  //   console.log(file);
  //   await axios.post('http://localhost:5000/uploadMedia', file)
  // }

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
              driveData.WindowModalForNotepad()
              driveData.set_check_exist_notepad(false);
              driveData.closeFileMenu();
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
                      async function (e) {
                        e.stopPropagation();
                        // do something (this works!)
                        let file = e.target.files[0];
                        let name = file.name.split(".")[0];
                        let extension = file.name.split(".")[1];
                        const url = await readURL(file);
                        // console.log(url);
                        //URl-ImageBlob
                        // console.log(url);
                        // setTimeout(() => {
                        //   console.log("image timeout");
                        //   // driveData.setDummyState(!driveData.dummyState)
                        // }, 2000)

                        console.log(saveMediaInDB(url, name, extension, file));
                        // saveMediaInFolder(file)
                        //arbitrary timer to re-render page after uploading image
                        driveData.setIsLoading(true)
                        setTimeout(() => {
                          console.log("Timeout");
                          driveData.setDummyState(!driveData.dummyState)
                          driveData.setIsLoading(false)
                        }, 2000)
                        
                      }
                    );
                  }}

                >
                  <input
                    ref={inputFileReference}
                    accept='image/png, image/jpeg, image/jpg'
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
                           driveData.WindowModalForGallery();
                    //  driveData.toggleImageGallery();
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
