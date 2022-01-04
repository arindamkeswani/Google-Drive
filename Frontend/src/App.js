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
  const [dummyState, setDummyState] = useState(true)


  useEffect(async () => {
    async function fetchPageData() {
      try {
        const getData = await axios.get('http://localhost:5000/',{
          params: {
            current_folder:currentBreadcrumbID
          }
        });
        // console.log(getData.data.query_returned);
        return getData.data.query_returned;
      } catch (err) {
        console.log(err);
      }
    }

    let data = await fetchPageData();
    let sortedData = await sortPageData(data);
    setPageData(sortedData);
  }, [dummyState]);

  let notePadSaveBtnToggle = () => {
console.log(notePadSaveToggle);
    setNotePadSaveToggle(!notePadSaveToggle);
  };
  let NotepadToggle = () => {
    setNotePad(!notePad);
    closeFileMenu();
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
      console.log(b.creation_date -  a.creation_date);
      return b.creation_date - a.creation_date;
    });

    return await data;
  };

  return (
    <>
      <DataContext.Provider
        value={{
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
          pageData,
        }}
      >
        <DriveBody />
      </DataContext.Provider>
    </>
  );
}

export default App;
