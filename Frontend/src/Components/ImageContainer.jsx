import './MediaContainer.css'

function ImageContainer(props) {
 // { console.log(props.fileDataInObj.url.split("blob:")) }



 return (
  <div className='mediaBox'>
   <div class='editBox-media'>
    <div>
     <span
      class='material-icons-outlined editIcon'

     >
      edit
     </span>
    </div>
    <div

    >
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
     src={props.fileDataInObj.url}
     alt=''
    />
   </div>
   <div className='mediaName'>{props.fileDataInObj.file_name}</div>
  </div>
 )
}
export default ImageContainer