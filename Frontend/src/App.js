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

  let notePadSaveBtnToggle = () => {
    console.log(notePadSaveToggle);
    setNotePadSaveToggle(!notePadSaveToggle);
  };

  useEffect(() => {
    async function fetchPageData() {
      try {
        console.log(1);
        const getData = await axios.get('http://localhost:5000/');
        console.log(getData.data);
        return getData.data;
      } catch (err) {
        console.log(err);
      }
    }

    let data = await fetchPageData();
    let sortedData = await sortPageData(data)
    setPageData(sortedData);
    
    
  }, [])

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
  };

  let fileMenuToggleFn = () => {
    setFileMenuToggle(true);
    
  };

  let closeFileMenu = () => {
    setFileMenuToggle(false);
  };

  let sortPageData = async (pageData) => {
    
    
    async function sortIt(pageData){
      
      var rows = [];
      for (var i = 0; i < pageData.length; i++) {
        for(var j = 0; j < pageData[i].length; j++){
          rows.push(pageData[i][j]);
        }
      }
      return rows;
    }
    let data = await sortIt(pageData);

    data.sort(function (a, b) {
      return b.creation_date - a.creation_date ;
    });

    return await data;
    
  }

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
          sortPageData,
          pageData
        }}
      >
        <DriveBody />
      </DataContext.Provider>
    </>
  );
}

export default App;
