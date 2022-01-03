import './DriveHeader.css'

function DriveHeader() {
 return (
  <>
   <div class="header-container">
        <div class="searchBox_and_addBox_container">
          <div class="searchBox">
            <div class="searchIcon">
              <span class="material-icons-outlined"> search </span>
            </div>
            <div class="inputBox">
              <input type="text" id="searchBar" placeholder="Search" />
            </div>
            <div class="cancelBox">
              <span class="material-icons-outlined"> close </span>
            </div>
          </div>
          <button id="createBtn">
            <span class="material-icons-outlined"> add </span>
          </button>
        </div>
      </div>

  </>
 );
}

export default DriveHeader