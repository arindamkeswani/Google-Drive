import { useState, useEffect } from 'react';
import axios from 'axios';
import DataContext from './Components/DataContext.jsx';
import DriveBody from './Components/DriveBody.jsx';
// import DrawImageModal from './Modal/DrawImageModal.jsx'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  // const [userName, setUserName] = useState('pepcoding')

  //Drive UI states
  const [pageData, setPageData] = useState([]); //used to store the details of the folders/files which are to be displayed currently
  // const [mediaData, setMediaData] = useState([])

  const [fileMenuToggle, setFileMenuToggle] = useState(false); //To open or close the file menu
  const [createFolderModal, setCreateFolderModal] = useState(false); //Open/Close create folder modal

  //Notepad UI toggle states
  const [notePad, setNotePad] = useState(false); //open/close notepad UI
  const [notePadSaveToggle, setNotePadSaveToggle] = useState(false); //Display/Hide Save Button in notepad

  //Breadcrumb states
  const [currentBreadcrumbID, setBreadcrumbID] = useState('root'); //Stores currently selected folder's ID
  const [breadcrumbArr, setBreadcrumbArr] = useState([
    { name: 'My Drive', id: 'root' },
  ]); //stores breadcrumb trail in an array



  const [dummyState, setDummyState] = useState(true); //Used to re-render the page

  //Notepad data states
  const [currNotepadData, setCurrNotepadData] = useState({}) //To store data of the selected Notepad
  const [retrieved, setRetrieved] = useState(false) //State to store whether a selected notepad's data has already been retrieved or not
  const [check_exist_notepad, set_check_exist_notepad] = useState(false)

  //Edit and Delete modal states
  const [isEditModalOpened, setIsEditModalOpened] = useState([false, '', '', '']) //[modal opened/closed, selected element's ID, selected element's name, selected element's file type]
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState([false, '', '', '']); //[modal opened/closed, selected element's ID, selected element's name, selected element's file type]

  //Search box state
  const [searchQuery, setSearchQuery] = useState('') //will store the search query

  //Image Gallery Modal State
  const [isGallery, setIsGallery] = useState(false)


  useEffect(async () => {
    //send GET request with selected folder to retrieve it's data
    async function fetchPageData() {
      try {
        const getData = await axios.get('http://localhost:5000/', {
          params: {
            current_folder: currentBreadcrumbID,
          },
        });
        return getData.data.query_returned;
      } catch (err) {
        console.log(err);
      }
    }



    let data = await fetchPageData();
    let sortedData = await sortPageData(data); //sort the data in reverse chronological order
    // console.log(sortedData);

    function searched(elem) { //filter out data according to search query
      if (elem.file_name && elem.file_name.includes(searchQuery)) {
        return elem;
      }

      if (elem.folder_name && elem.folder_name.includes(searchQuery)) {
        return elem;
      }
    }

    setPageData(sortedData.filter(searched));

  }, [dummyState]);

  //Display/Hide notepad save button
  let notePadSaveBtnToggle = () => {
    console.log(notePadSaveToggle);
    setNotePadSaveToggle(!notePadSaveToggle);
  };

  //Open/Close notepad UI
  let NotepadToggle = () => {
    setNotePad(!notePad);
    closeFileMenu();
    setDummyState(!dummyState);
    setRetrieved(false);
  };

  //Open modal used to create a new folder
  let openCreateFolderModal = () => {
    setCreateFolderModal(true);
    closeFileMenu();
  };

  //Close modal used to create a new folder
  let closeCreateFolderModal = () => {
    setCreateFolderModal(false);
    setDummyState(!dummyState);
  };

  //Open file menu
  let fileMenuToggleFn = () => {
    setFileMenuToggle(true);
  };

  //Close file menu
  let closeFileMenu = () => {
    setFileMenuToggle(false);
  };

  // sort data from queries according to timestamp
  let sortPageData = async (pageData) => {
    async function sortIt(pageData) {
      var rows = [];
      for (var i = 0; i < pageData.length; i++) {
        for (var j = 0; j < pageData[i].length; j++) {
          rows.push(pageData[i][j]);
        }
      }
      return rows;
    }
    let data = await sortIt(pageData);

    data = data.sort(function (a, b) {
      return b.creation_date - a.creation_date;
    });

    return await data;
  };

  let toggleImageGallery = () => {
    setIsGallery(!isGallery)
    closeFileMenu();
  }

  return (
    <>
      {/* <Router> */}
   
          <DataContext.Provider
            value={{
              pageData,
              setPageData,
              fileMenuToggle,
              fileMenuToggleFn,
              closeFileMenu,
              createFolderModal,
              openCreateFolderModal,
              closeCreateFolderModal,
              notePadSaveBtnToggle,
              notePad,
              NotepadToggle,
              notePadSaveToggle,
              sortPageData,
              currentBreadcrumbID,
              setBreadcrumbID,
              pageData,
              breadcrumbArr,
              setBreadcrumbArr,
              dummyState,
              setDummyState,
              currNotepadData,
              setCurrNotepadData,
              retrieved,
              setRetrieved,
              check_exist_notepad,
              set_check_exist_notepad,
              isEditModalOpened,
              setIsEditModalOpened,
              isDeleteModalOpened,
              setIsDeleteModalOpened,
              searchQuery,
              setSearchQuery,
              isGallery,
              setIsGallery,
              toggleImageGallery,
            }}
          >
              {/* <Route exact   path="/" > */}
            <DriveBody />
             {/* </Route> */}
              {/* <Route exact  path="sqq"> */}
              {/* <DrawImageModal /> */}
             {/* </Route> */}
          </DataContext.Provider>
{/*    
      </Router> */}
    </>
  );
}

export default App;
