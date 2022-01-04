import { useState, useEffect } from 'react';
import axios from 'axios';
import DataContext from './Components/DataContext.jsx';
import DriveBody from './Components/DriveBody.jsx';

function App() {
  const [pageData, setPageData] = useState([])
  const [fileMenuToggle, setFileMenuToggle] = useState(false);
  const [createFolderModal, setCreateFolderModal] = useState(false);

  useEffect( () => {
    async function fetchPageData(){
      try {
        const data = await axios.get("http://localhost:5000/");
        console.log(data);
        return data
        
      } catch (err) {
        console.log(err);
      }
    }

    let data = fetchPageData()
    console.log(data);
  },[])
  
  
  let openCreateFolderModal = () => {
    setCreateFolderModal(true);
    // closeFileMenu();
  };

  let closeCreateFolderModal = () => {
    setCreateFolderModal(false);
  }

  let fileMenuToggleFn = () => {
    setFileMenuToggle(!fileMenuToggle);
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
        }}
      >
        <DriveBody />
      </DataContext.Provider>
    </>
  );
}

export default App;
