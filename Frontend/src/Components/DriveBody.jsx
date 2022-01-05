

import './DriveBody.css';
import DriveContent from './DriveContent';
import DriveHeader from './DriveHeader';
import FileMenu from './Modal/FileMenu';
import DataContext from './DataContext';
import { useContext } from 'react';
import AddFolderModal from './Modal/AddFolderModal';
import NotePad from './Modal/NotePad';
import EditModal from './Modal/EditModal';
import DeleteModal from './Modal/DeleteModal';


function DriveBody() {
let driveData = useContext(DataContext);
  return (
    <>
      <div className='main-container'>
        <DriveHeader />
        <DriveContent />
      </div>

      {driveData.isDeleteModalOpened&&<DeleteModal/>}
      {driveData.isEditModalOpened ? <EditModal /> : ''}
      {driveData.fileMenuToggle ? <FileMenu /> : ''}
      {driveData.createFolderModal ? <AddFolderModal /> : ''}
      {driveData.notePad ? <NotePad /> : ''}
    </>
  );
}

export default DriveBody;
