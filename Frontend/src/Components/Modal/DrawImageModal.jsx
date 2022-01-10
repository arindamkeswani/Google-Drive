import React, { useContext, useState, useEffect } from "react";
import DataContext from "../DataContext";
import { useLocation, useParams } from "react-router-dom";

import "./DrawImageModal.css";

import axios from "axios";
function DrawImageModal(props) {
  let canvas = React.createRef();
  let imageContainer = React.createRef();
  let [isPen, setIsPen] = useState(false);

  // useEffect(() => {
  //   const ctx = canvas.current.getContext("2d");
  //   var imageObj1 = new Image();
  //   imageObj1.src = `http://localhost:5000/${props.state.url}`;
  //   let height = imageObj1.height;
  //   let width = imageObj1.width;
  //   canvas.current.style.height = height + "px";
  //   canvas.current.style.width = width + "px";
  //   console.log(canvas.current.style.height);
  //   imageObj1.onload = function () {
  //     ctx.drawImage(
  //       imageObj1,
  //       0,
  //       0,
  //       width/6,
  //       height/6);
  //   };
  // });

  return (
    <>
      <div
        className="mainDrawImageContainer"
        onClick={() => {
          setIsPen(!isPen);
        }}
      >
        <div className="draw-title-container">
          <div className="draw-box-span">
            <span class="material-icons-outlined">file_download</span>
          </div>

          <div className="draw-box-span">
            <span class="material-icons-outlined">save</span>
          </div>
          <div class="draw-line"></div>
          <div
            className="draw-box-span pen"
            onClick={() => {
              setIsPen(!isPen);
            }}
          >
            <span class="material-icons-outlined">edit</span>
          </div>
          <div className="draw-box-span">
            <span class="material-icons-outlined">crop_5_4</span>
          </div>
          <div class="draw-line"></div>
          <div className="draw-box-span">
            <span class="material-icons-outlined">add</span>
          </div>
          <div className="draw-box-span">
            <span class="material-icons-outlined">remove</span>
          </div>
        </div>

        <div className="imageContainer " ref={imageContainer}>
          <img src={'http://localhost:5000/'+ props.state.url } alt="" />
          {/* <canvas ref={canvas}></canvas> */}
        </div>
      </div>
      {isPen ? (
        <>
          <div className="penEditOption">
            <div className="optionLabel">Pen Width</div>
            <div className="pen-width-option">
              <div
                className="circle low-width"
                onClick={() => {
                  setIsPen(!isPen);
                }}
              ></div>
              <div
                className="circle mid-width"
                onClick={() => {
                  setIsPen(!isPen);
                }}
              ></div>
              <div
                className="circle large-width"
                onClick={() => {
                  setIsPen(!isPen);
                }}
              ></div>
            </div>
            <div className="optionLabel">Pen Width</div>
            <div className="pen-width-option">
              <div
                className="circle large-width red"
                onClick={() => {
                  setIsPen(!isPen);
                }}
              ></div>
              <div
                className="circle large-width blue"
                onClick={() => {
                  setIsPen(!isPen);
                }}
              ></div>
              <div
                className="circle large-width green"
                onClick={() => {
                  setIsPen(!isPen);
                }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default DrawImageModal;
