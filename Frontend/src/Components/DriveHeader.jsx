import './DriveHeader.css';

import { useContext } from 'react';
import DataContext from './DataContext';
import FileMenu from './Modal/FileMenu';
// import FileMenu from './Modal/FileMenu';

function DriveHeader() {
  let driveData = useContext(DataContext);
  return (
    <>
      <div class='header-container'>
        <div class='searchBox_and_addBox_container'>
          <div class='searchBox'>
            <div class='searchIcon'>
              <span class='material-icons-outlined'> search </span>
            </div>
            <div class='inputBox'>
              <input type='text' id='searchBar' placeholder='Search' />
            </div>
            <div class='cancelBox'>
              <span class='material-icons-outlined'> close </span>
            </div>
          </div>
          <button id='createBtn' onClick={driveData.FileMenuOptionToggle}>
            <span class='material-icons-outlined'>add</span>
          </button>
          {driveData.fileMenuToggle ? <FileMenu /> : ''}
        </div>
      </div>
    </>
  );
}

export default DriveHeader;
