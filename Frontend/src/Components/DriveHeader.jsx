import './DriveHeader.css';
import React from 'react';
import { useContext } from 'react';
import DataContext from './DataContext';
// import FileMenu from './Modal/FileMenu';

function DriveHeader() {
  let driveData = useContext(DataContext);

  let search_box_input = React.createRef();
  return (
    <>
      <div class='header-container'>
        <div class='searchBox_and_addBox_container'>
          <div class='searchBox'>
            <div class='searchIcon'>
              <span class='material-icons-outlined'> search </span>
            </div>
            <div class='inputBox'

              onChange={(event) => {
                // console.log(event.target.value);
                driveData.setSearchQuery(event.target.value)
                driveData.setDummyState(!driveData.dummyState)
                // console.log(driveData.searchQuery);
              }}>
              <input type='text' id='searchBar' placeholder='Search' 
              ref={search_box_input}/>
              
            </div>
            <div class='cancelBox' onClick={() => {
              driveData.setSearchQuery('')
              search_box_input.current.value=''
              driveData.setDummyState(!driveData.dummyState)
            }}>
              <span class='material-icons-outlined'> close </span>
            </div>
          </div>
          <button id='createBtn' onClick={driveData.fileMenuToggleFn}>
            <span class='material-icons-outlined'>add</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default DriveHeader;
