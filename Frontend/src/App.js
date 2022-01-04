import { useState } from 'react';
import DataContext from './Components/DataContext.jsx';
import DriveBody from './Components/DriveBody.jsx';

function App() {
  const [fileMenuToggle, setFileMenuToggle] = useState(false);
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [notePad, setNotePad] = useState(false);

  let NotepadToogle = () => {
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
