import axios from 'axios';
import React, { useEffect,useContext, useState } from 'react';

import DataContext from '../DataContext';
import ImageContainer from '../ImageContainer'
import './GalleryModal.css';
function GalleryModal() {

  let driveData = useContext(DataContext);
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
      for(let i=1; i<data.length; i++){

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
    </>
  );
}

export default GalleryModal;
