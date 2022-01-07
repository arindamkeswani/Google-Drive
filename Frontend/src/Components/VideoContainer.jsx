import './MediaContainer.css'

function VideoContainer() {
 
 return (<>
  <div className='mediaBox'>
   <div class='editBox-media'>
    <div>
     <span class='material-icons-outlined editIcon'>edit</span>
    </div>
    <div>
     <span class='material-icons-outlined deleteIcon'>close</span>
    </div>
   </div>
   <div className='innerImg'>
    <video src=""></video>
   </div>
   <div className='imageName'>Name Image</div>
  </div></>)
}

export default VideoContainer