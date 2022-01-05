import { useState, useEffect } from 'react';
import axios from 'axios';
import DataContext from './Components/DataContext.jsx';
import DriveBody from './Components/DriveBody.jsx';

function App() {
  const [pageData, setPageData] = useState([]);
  const [fileMenuToggle, setFileMenuToggle] = useState(false);
  const [createFolderModal, setCreateFolderModal] = useState(false);

  const [notePad, setNotePad] = useState(false);
  const [notePadSaveToggle, setNotePadSaveToggle] = useState(false);

  const [currentBreadcrumbID, setBreadcrumbID] = useState('root');
  const [breadcrumbArr, setBreadcrumbArr] = useState([{name: 'My Drive', id: 'root' }])

  const [dummyState, setDummyState] = useState(true);

  const [currNotepadData, setCurrNotepadData] = useState({})
  const [retrieved, setRetrieved] = useState(false)

  const [check_exist_notepad,set_check_exist_notepad] = useState(false)

  useEffect(async () => {
    async function fetchPageData() {
      try {
        const getData = await axios.get('http://localhost:5000/', {
          params: {
            current_folder: currentBreadcrumbID
          }
        });
        return getData.data.query_returned;
      } catch (err) {
        console.log(err);
      }
    }

    let data = await fetchPageData();
    let sortedData = await sortPageData(data);
    setPageData(sortedData);
    // console.log(currentBreadcrumbID,sortedData);
  }, [dummyState]);



  let notePadSaveBtnToggle = () => {
    console.log(notePadSaveToggle);
    setNotePadSaveToggle(!notePadSaveToggle);
  };
  let NotepadToggle = () => {
    setNotePad(!notePad);
    closeFileMenu();
    setDummyState(!dummyState)
    setRetrieved(false)
  };

  let openCreateFolderModal = () => {
    setCreateFolderModal(true);
    closeFileMenu();
  };

  let closeCreateFolderModal = () => {
    setCreateFolderModal(false);
    setDummyState(!dummyState)
  };

  let fileMenuToggleFn = () => {
    setFileMenuToggle(true);
  };

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
      // console.log(b.creation_date -  a.creation_date);
      return b.creation_date - a.creation_date;
    });

    return await data;
  };

  return (
    <>
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
          set_check_exist_notepad
        }}
      >
        <DriveBody />
      </DataContext.Provider>
    </>
  );
}

export default App;
