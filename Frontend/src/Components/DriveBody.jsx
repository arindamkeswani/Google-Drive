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
<<<<<<< HEAD

      {driveData.isDeleteModalOpened&&<DeleteModal/>}
      {driveData.isEditModalOpened ? <EditModal /> : ''}
=======
      {console.log(driveData.isEditModalOpened)}
      {driveData.isEditModalOpened[0]?<EditModal/>:''}
>>>>>>> 18e3d699f386c4537d763d7413385e620dac1111
      {driveData.fileMenuToggle ? <FileMenu /> : ''}
      {driveData.createFolderModal ? <AddFolderModal /> : ''}
      {driveData.notePad ? <NotePad /> : ''}
    </>
  );
}

export default DriveBody;
