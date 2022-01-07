import React, { useContext, useState } from 'react';
import DataContext from '../DataContext';
import axios from 'axios';
import './NotePad.css';

function NotePad() {
  let driveData = useContext(DataContext);

  //States to store the styling and content of the Notepad
  let [fontFamily, setFont] = useState('sans-serif');
  let [fontSize, setFontSize] = useState(18);
  let [isBold, setIsBold] = useState(false);
  let [isItalic, setIsItalic] = useState(false);
  let [content, setContent] = useState('');
  let [fileName, setFolderName] = useState('');


  // Toggle(to store Notepad Fullscreen data)
  let [isFullscreen, setIsFullscreen] = useState(false)

  let docModalRef = new React.createRef()




  //Notepad table has 11 columns, so the first condition will only run if we have retrieved the data of an existing file
  //This will help in avoiding overwriting data in the states.
  //The following block of code is used to retrieve data from the database and store it in states, which will then be displayed on the UI
  if (Object.keys(driveData.currNotepadData).length == 11 && driveData.retrieved == false) {
    driveData.retrieved = true;
    setContent(driveData.currNotepadData.content)
    setFolderName(driveData.currNotepadData.file_name)
    setIsBold(driveData.currNotepadData.bold)
    setIsItalic(driveData.currNotepadData.italic)
    setFont(driveData.currNotepadData.font_family)
    setFontSize(driveData.currNotepadData.font_size)
  }


  //Create a new notepad by sending a POST request with the styling and the content
  let createNotepad = async () => {
    await axios.post('http://localhost:5000/', {
      parent_folder: driveData.currentBreadcrumbID,
      file_name: fileName,
      content: content,
      font_family: fontFamily,
      font_size: fontSize,
      is_bold: isBold,
      is_italic: isItalic,
      ext: ".txt"
    });

  }

  //function to handle updation of the data of an existing Notepad
  let updateNotepad = async (notepadID) => {
    console.log("Send update req");
    await axios.patch('http://localhost:5000/', {
      existing_id: notepadID,
      file_name: fileName,
      content: content,
      font_family: fontFamily,
      font_size: fontSize,
      is_bold: isBold,
      is_italic: isItalic,
      ext: ".txt"
    });
  }




  let myContentRef = new React.createRef();
  let changeFont = (currentFont) => {
    setFont(currentFont);
    driveData.currNotepadData.font_family = currentFont
    // console.log(font);
  };

  let increaseFont = () => {
    setFontSize(fontSize + 1);
    driveData.currNotepadData.font_size = fontSize + 1
    // console.log(fontSize);
  };

  let decreaseFont = () => {
    setFontSize(fontSize - 1);
    driveData.currNotepadData.font_size = fontSize - 1
  };

  let set_np_file_name = (currentFileName) => {
    setFolderName(currentFileName);
    driveData.currNotepadData.file_name = currentFileName
    // console.log(folderName);
  };

  let toggleBold = () => {
    setIsBold(!isBold);
    driveData.currNotepadData.bold = !isBold
    // console.log(isBold);
  };

  let toggleItalic = () => {
    setIsItalic(!isItalic);
    driveData.currNotepadData.italic = !isItalic
    // console.log(isItalic);
  };

  return (
    <>
      <div id='docModal' ref={docModalRef}>
        <div class='docModal-header-bar'>
          <div class='docModal-headerBar-left'>
            <div class='docIcon'>
              <span class='material-icons googleDocsIcon'> description </span>
            </div>
            <div class='docTextIcon'>Notepad</div>
          </div>
          <div class='docModal-headerBar-right'>
            {/* <!-- <div class="headerBar-right-iconDivBox minimize">
            <span class="material-icons-outlined"> remove </span>
          </div> --> */}
            <div
              class='headerBar-right-iconDivBox fullscreen'
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                if (isFullscreen === true) {
                  docModalRef.current.style.top='0rem'
                  docModalRef.current.style.height = '100%'
                  docModalRef.current.style.width = '100%'
                  // console.log(docModalRef.current.style);
                } else {
                  if (isFullscreen === false) {
                    docModalRef.current.style.top='5rem'
                    docModalRef.current.style.height = '';
                    docModalRef.current.style.width = '';
                    // console.log(docModalRef);
                  }
                }
              }}
            >
              <span class='material-icons-outlined'> fullscreen </span>
            </div>
            <div
              class='headerBar-right-iconDivBox close'
              onClick={() => {
                driveData.NotepadToggle();
                driveData.setCurrNotepadData({});
                setIsFullscreen(false);
                if (isFullscreen === true) {
                  docModalRef.current.style.top='5rem'
                  docModalRef.current.style.height = '';
                  docModalRef.current.style.width = '';
                }
                driveData.setBreadcrumbID(
                  driveData.breadcrumbArr[driveData.breadcrumbArr.length - 1].id
                );
                driveData.setDummyState(!driveData.dummyState);
                driveData.retrieved = false;
              }}
            >
              <span class='material-icons-outlined cancel'> close </span>
            </div>
          </div>
        </div>
        <div class='docModal-header'>
          <div class='headerIconDoc'>
            <span class='material-icons'> description </span>
          </div>
          <div class='header_folderName_fileMenu_container'>
            <div class='header_folderName_startBox_container'>
              <input
                class='header_folderName'
                placeholder='Untitled file'
                onChange={(e) => {
                  set_np_file_name(e.target.value);
                }}
                value={fileName}
              />
              <div class='header_star'>
                <span class='material-icons-outlined'> grade </span>
              </div>
            </div>
            <div class='header_FileMenu_container'>
              <div
                class='fileMenuBox fileBox'
                onClick={driveData.notePadSaveBtnToggle}
              >
                File
              </div>

              {driveData.notePadSaveToggle ? (
                <div
                  class='doc-saveButton'
                  onClick={() => {
                    // if the notepad is new, save it, otherwise update the data
                    if (driveData.check_exist_notepad == false) {
                      createNotepad();
                      driveData.NotepadToggle();
                    } else {
                      updateNotepad(driveData.currentBreadcrumbID);
                    }
                  }}
                >
                  {driveData.check_exist_notepad ? 'Update' : 'Save'}
                </div>
              ) : (
                ' '
              )}

              {/* <div class='doc-updateButton'>Save</div> */}
              <div class='fileMenuBox'>Edit</div>
              <div class='fileMenuBox'>View</div>
              <div class='fileMenuBox'>help</div>
            </div>
          </div>
          <div class='comment_share_account_boxContianer'>
            <div class='commentBox'>
              <span class='material-icons-outlined'> chat </span>
            </div>
            <div class='shareContainer'>
              <div class='shareLogo'>
                <span class='material-icons-outlined'> lock </span>
              </div>
              <div class='sharetext'>Share</div>
            </div>
          </div>
        </div>
        <div class='docModalEditOption'>
          <div class='fontSelectOption'>
            <select
              name='Font'
              id='fontOption'
              onChange={(e) => {
                changeFont(e.target.value);
              }}
            >
              <option value='sans-serif'>sans-serif</option>
              <option value='Times New Roman'>Times New Roman</option>
              <option value='Courier New'>Courier New</option>
            </select>
          </div>
          <div class='fontSizeContainer'>
            <div class='inner-fontSizeContainer'>
              <div class='subSize' onClick={decreaseFont}>
                <span class='material-icons-outlined'> remove </span>
              </div>
              <div class='textSizeValue'>{fontSize}</div>
              <div class='addSize' onClick={increaseFont}>
                <span class='material-icons-outlined'> add </span>
              </div>
            </div>
          </div>
          <div class='docStyleContainer'>
            <div class='inner-docStyleContainer'>
              <div class='docStyleBox docBold' onClick={toggleBold}>
                <span class='material-icons-outlined'> format_bold </span>
              </div>
              <div class='docStyleBox docItalic' onClick={toggleItalic}>
                <span class='material-icons-outlined'> format_italic </span>
              </div>
            </div>
          </div>
        </div>
        <div class='docContentArea'>
          <textarea
            id='notepadTextArea'
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: isBold ? 'bold' : '',
              fontStyle: isItalic ? 'italic' : '',
              fontFamily: `${fontFamily}`,
            }}
            ref={myContentRef}
            onChange={(event) => {
              setContent(event.target.value);
              driveData.currNotepadData.content = event.target.value;
            }}
            value={content}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default NotePad;
