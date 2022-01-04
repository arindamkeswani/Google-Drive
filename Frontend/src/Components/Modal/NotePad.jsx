import { useContext } from 'react';
import DataContext from '../DataContext';
import  './NotePad.css'

function NotePad() {
  let driveData = useContext(DataContext)
  return (
    <>
      <div id='docModal'>
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
            <div class='headerBar-right-iconDivBox fullscreen'>
              <span class='material-icons-outlined'> fullscreen </span>
            </div>
            <div
              class='headerBar-right-iconDivBox close'
              onClick={driveData.NotepadToggle}
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
              <input class='header_folderName' placeholder='Untitled file' />
              <div class='header_star'>
                <span class='material-icons-outlined'> grade </span>
              </div>
            </div>
            <div class='header_FileMenu_container'>
              <div class='fileMenuBox fileBox'>File</div>
              <div class='doc-saveButton'>Save</div>
              <div class='doc-updateButton'>Update</div>
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
            <select name='Font' id='fontOption'>
              <option value='sans-serif'>sans-serif</option>
              <option value='Times New Roman'>Times New Roman</option>
              <option value='Courier New'>Courier New</option>
            </select>
          </div>
          <div class='fontSizeContainer'>
            <div class='inner-fontSizeContainer'>
              <div class='subSize'>
                <span class='material-icons-outlined'> remove </span>
              </div>
              <div class='textSizeValue'>18</div>
              <div class='addSize'>
                <span class='material-icons-outlined'> add </span>
              </div>
            </div>
          </div>
          <div class='docStyleContainer'>
            <div class='inner-docStyleContainer'>
              <div class='docStyleBox docBold'>
                <span class='material-icons-outlined'> format_bold </span>
              </div>
              <div class='docStyleBox docItalic'>
                <span class='material-icons-outlined'> format_italic </span>
              </div>
            </div>
          </div>
        </div>
        <div class='docContentArea'>
          <textarea id='notepadTextArea'></textarea>
        </div>
      </div>
    </>
  );
}

export default NotePad;
