import "./ImageCarousel.css";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import DataContext from "../DataContext";

function ImageCarousel() {
  let driveData = useContext(DataContext);
  driveData.image = React.createRef();

  let [imgArr, setImgArr] = useState([]);
  let [currImageIdx, setCurrImageIdx] = useState(0);

  useEffect(async () => {
    async function fetchPageData() {
      var ar = driveData.image.current.height / driveData.image.current.width;
      driveData.image.current.style.height = 400 + "px";
      driveData.image.current.style.width =
        ar * driveData.image.current.style.height + "px";
      driveData.image.current.style.height += "px";
      try {
        const getData = await axios.get("http://localhost:5000/gallery/", {
          params: {},
        });
        // console.log(getData.data.query_returned);
        return getData.data.query_returned;
      } catch (err) {
        console.log(err);
      }
    }

    async function getCurrImageIdx(sortedData) {
      try {
        for (let i = 0; i < sortedData.length; i++) {
          if (driveData.currentImageData.id == sortedData[i].id) {
            setCurrImageIdx(i);
            break;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    let data = await fetchPageData();
    let sortedData = await sortCarouselData(data);
    getCurrImageIdx(sortedData);
    setImgArr(sortedData);
  }, []);

  let sortCarouselData = async (pageData) => {
    let data = pageData.sort(function (a, b) {
      return b.creation_date - a.creation_date;
    });
    return data;
  };

  let showNextImage = async (imgArr) => {
    console.log("Right", currImageIdx, imgArr);
    if (currImageIdx < imgArr.length - 1) {
      driveData.setCurrentImageData(imgArr[currImageIdx + 1]);
      setCurrImageIdx(currImageIdx + 1)
    }
  };

  let showPrevImage = async (imgArr) => {
    console.log("Left", currImageIdx, imgArr);
    if (currImageIdx > 0) {
      driveData.setCurrentImageData(imgArr[currImageIdx - 1]);
      setCurrImageIdx(currImageIdx - 1)
    }
  };

  let show;
  return (
    <>
      <div className="imageCarousel-body">
        <div className="imgContainer-carousel">
          <img
            ref={driveData.image}
            src={"http://localhost:5000/" + driveData.currentImageData.url}
            alt=""
          />
        </div>
        <div className="array-carousel">
          {imgArr.map((e) => {
            return (
              <div className="imgDisplayBox">
                <img src={e.url} alt="" />
              </div>
            );
          })}
        </div>
        <div
          className="rightBtn"
          onClick={() => {
            showPrevImage(imgArr);
          }}
        >
          <span class="material-icons-outlined" >
chevron_left
</span>
        </div>
        <div className="leftBtn" onClick={() => {
            showNextImage(imgArr);
          }}>
          <span class="material-icons-outlined">chevron_right</span>
        </div>
      </div>
    </>
  );
}

export default ImageCarousel;
