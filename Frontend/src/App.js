import { useState } from 'react';
import DataContext from './Components/DataContext.jsx';
import DriveBody from './Components/DriveBody.jsx';

function App() {
  const [fileMenuToggle, setFileMenuToggle] = useState(false);
  const [createFolderModal, setCreateFolderModal] = useState(false);

  let createFolderModalToggle = () => {
    setFileMenuToggle(false);
      setCreateFolderModal(!createFolderModal);
    console.log("dfcgvhnbjbhgfvds");
  };

  let FileMenuOptionToggle = () => {
    setFileMenuToggle(!fileMenuToggle);
  };

  return (
    <>
      <DataContext.Provider
        value={{
          fileMenuToggle,
          FileMenuOptionToggle,
          createFolderModal,
          createFolderModalToggle,
        }}
      >
        <DriveBody />
      </DataContext.Provider>
    </>
  );
}

export default App;
