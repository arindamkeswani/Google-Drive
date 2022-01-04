import { useState, useEffect } from 'react';
import axios from 'axios';
import DataContext from './Components/DataContext.jsx';
import DriveBody from './Components/DriveBody.jsx';

function App() {
  const [pageData, setPageData] = useState([])
  const [fileMenuToggle, setFileMenuToggle] = useState(false);
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [notePad, setNotePad] = useState(false);

  let NotepadToogle = () => {
    setNotePad(!notePad);
     closeFileMenu();
  };


  useEffect( () => {
    async function fetchPageData(){
      try {
        console.log(1);
        const getData = await axios.get("http://localhost:5000/");
        console.log(getData.data);
        return data
        
      } catch (err) {
        console.log(err);
      }
    }

    let data = fetchPageData()
    setPageData(data);
  },[])
  
  
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
          notePad,
          NotepadToogle,
        }}
      >
        <DriveBody />
      </DataContext.Provider>
    </>
  );
}

export default App;
