import './MediaContainer.css'
import { useContext } from 'react';
import DataContext from './DataContext';

function ImageContainer(props) {

  let driveData = useContext(DataContext);
  let fileData = props.fileDataInObj

  // Decompress an LZW-encoded string
  function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i = 1; i < data.length; i++) {
      var currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
        phrase = data[i];
      }
      else {
        phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
    }
    return out.join("");
  }
  
  return (
    <div className='mediaBox'>
      <div class='editBox-media'>
        <div onClick={() => {
          //retrieve selected file's data and display the original name in the Edit File name modal
          driveData.setIsEditModalOpened([!driveData.isEditModalOpened[0], fileData.id, fileData.file_name, "media"]);
        }}>
          <span
            class='material-icons-outlined editIcon'

          >
            edit
          </span>
        </div>
        <div
          onClick={() => {
            //retrieve selected file's data and display the original name in the Edit File name modal
            driveData.setIsDeleteModalOpened([!driveData.isEditModalOpened[0], fileData.id, fileData.file_name, "media"]);
          }
          }>
          <span
            class='material-icons-outlined deleteIcon'

          >
            close
          </span>
        </div>
      </div>
      <div
        class='mediaActualData'

      >
        <img
          src={lzw_decode(props.fileDataInObj.url)}
          alt=''
        />
      </div>
      <div className='mediaName'>{props.fileDataInObj.file_name}</div>
    </div>
  )
}
export default ImageContainer