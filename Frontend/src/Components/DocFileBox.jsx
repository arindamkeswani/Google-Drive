
import { useEffect } from 'react';
import './DocFileBox.css'

function DocFileBox(props) {

  useEffect(() => {
    console.log(props.fileDataInObj)
  }, []);

  return (
   <>
    {console.log(props.fileDataInObj)}
      <div class='folderBox'>
        <div class='editBox'>
      <div>
       
            <span class='material-icons-outlined editIcon'>edit</span>
          </div>
          <div>
            <span class='material-icons-outlined deleteIcon'>close</span>
          </div>
        </div>
        <div class='folderIcon'>
          <span class='material-icons'> description </span>
        </div>
        <div class='folderName'>Untitled file</div>
      </div>
    </>
  );
}

export default DocFileBox;
