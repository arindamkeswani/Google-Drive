import axios from 'axios';
import React, { useEffect,useContext, useState } from 'react';

import DataContext from '../DataContext';
import ImageContainer from '../ImageContainer'
import './GalleryModal.css';
function GalleryModal() {
  let driveData = useContext(DataContext);
  let [isFullscreen, setIsFullscreen] = useState(false);
  let imgModalRef = new React.createRef();
  
  let [mediaData, setMediaData] = useState([]) //store a user's photos
  const [gallerySearchQuery, setGallerySearchQuery] = useState('') //will store the search query
  // const [currentDate, setCurrentDate] = useState(true); //Used to re-render the page


  useEffect(async () => {
    //send GET request with selected folder to retrieve it's data
    async function fetchPageData() {
      try {
        const getData = await axios.get('http://localhost:5000/gallery/', {
          params: {
            
          },
        });
        // console.log(getData.data.query_returned);
        return getData.data.query_returned;
      } catch (err) {
        console.log(err);
      }
    }



    let data = await fetchPageData();
    let sortedData = await sortMediaData(data); //sort the data in reverse chronological order
    await setMediaData(sortedData);
    // function searched(elem) { //filter out data according to search query
    //   if (elem.file_name && elem.file_name.includes(gallerySearchQuery)) {
    //     return elem;
    //   }

    //   if (elem.folder_name && elem.folder_name.includes(gallerySearchQuery)) {
    //     return elem;
    //   }
    // }

    // setMediaData(sortedData.filter(searched));
    // { console.log(mediaData) }
  }, [driveData.dummyState]);
  

  let sortMediaData = async (mediaData) => {

    var data = mediaData.sort(function (a, b) {
      
      return b.creation_date - a.creation_date;
    });

    var rows = [];
    if(data){
      var currentDate = data[0].formatted_date;
      var currDateIdx=0;
      
      rows.push({date:currentDate, media:[data[0]]})
      // console.log(data[0]);
      for(let i=1; i<data.length; i++){
        // console.log(data[i]);
        if(data[i].formatted_date==currentDate){ //add in media array same object
          rows[currDateIdx].media.push(data[i])
        }else{
          currentDate = data[i].formatted_date
          rows.push({date:currentDate, media:[data[i]]})
          currDateIdx+=1;
        }
      }
    }

    // console.log(rows);

    return await rows;
  };

  return (
    <>
      <div id='docModal' ref={imgModalRef}>
        <div class='docModal-header-bar'>
          <div class='docModal-headerBar-left'>
            <div class='docIcon'>
              <span class='material-icons'>image</span>
            </div>
            <div class='docTextIcon'>Gallery App</div>
          </div>
          <div class='docModal-headerBar-right'>
            <div
              class='headerBar-right-iconDivBox fullscreen'
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                if (isFullscreen === true) {
                  imgModalRef.current.style.top = '0rem';
                  imgModalRef.current.style.height = '100%';
                  imgModalRef.current.style.width = '100%';
                  // console.log(imgModalRef.current.style);
                } else {
                  if (isFullscreen === false) {
                    imgModalRef.current.style.top = '5rem';
                    imgModalRef.current.style.height = '';
                    imgModalRef.current.style.width = '';
                  }
                }
              }}
            >
              <span class='material-icons-outlined'> fullscreen </span>
            </div>
            <div
              class='headerBar-right-iconDivBox close'
              onClick={() => {
                driveData.setIsGallery(!driveData.isGallery);
                setIsFullscreen(false);
                imgModalRef.current.style.top = '5rem';
                imgModalRef.current.style.height = '';
                imgModalRef.current.style.width = '';
              }}
            >
              <span class='material-icons-outlined cancel'> close </span>
            </div>
          </div>
        </div>
        <div className='galleryArea'>
          {console.log(mediaData)}
           {mediaData.map((ele) => {
             
             
              if (ele) {
                // if (ele.ext == '.jpg' || ele.ext == '.png' || ele.ext == '.jpeg' || ele.ext == '.gif') {
                return (<>
                    <div className='dateSection'>{ele.date}</div>
                  <div className='dateWiseImageContainer'>
                    {ele.media.map((image) => {
                      return <ImageContainer fileDataInObj={image} />
                    })}
                  </div>
                  
                  </>)
                // } 
              }

             
            })}
        </div>
      </div>
    </>
  );
}

export default GalleryModal;
