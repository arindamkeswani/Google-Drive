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
import GalleryModal from './Modal/GalleryModal.jsx'


function DriveBody() {
  //Toggle UI elements based on the following conditions
let driveData = useContext(DataContext);
  return (
    <>
      <div className='main-container'>
        <DriveHeader />
        <DriveContent />
      </div>
      
      {driveData.isDeleteModalOpened[0]&&<DeleteModal/>}
      {driveData.isEditModalOpened[0]?<EditModal/>:''}
      {driveData.fileMenuToggle ? <FileMenu /> : ''}
      {driveData.createFolderModal ? <AddFolderModal /> : ''}
      {driveData.notePad ? <NotePad /> : ''}
      <GalleryModal/>
      {console.log('a')}
    </>
  );
}

export default DriveBody;
