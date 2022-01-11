import "./WindowModal.css";
import NotePad from "./NotePad";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../DataContext";
function WindowModal(props) {
  // Toggle(to store Window Fullscreen data)
  let [isFullscreen, setIsFullscreen] = useState(true);
  let driveData = useContext(DataContext);
  let windowModalRef = new React.createRef();
  return (
    <>
      <div id="windowModal" ref={windowModalRef}>
        <div class="docModal-header-bar">
          <div class="windowModal-headerBar-left">
            <div class="windowIcon">
              <span
                class={`material-icons ${
                  props.childName == "Notepad"
                    ? "googleDocsIcon"
                    : "googleGalleryIcon"
                } `}
              >
                {" "}
                {(() => {
                  if (props.childName == "Notepad") {
                    return "description";
                  } else if (
                    props.childName == "Gallery" ||
                    props.childName == "Image Gallery"
                  ) {
                    return "image";
                  }
                })()}{" "}
              </span>
            </div>
            <div class="windowTextIcon">{props.childName}</div>
          </div>
          <div class="windowModal-headerBar-right">
            <div
              class="headerBar-right-iconDivBox fullscreen"
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                if (
                  props.childName == "Image Gallery" &&
                 isFullscreen
                  ) {
               
                  var ar =
                    driveData.image.current.height /
                    driveData.image.current.width;
                  driveData.image.current.style.height = 550 + "px";
                  driveData.image.current.style.width =
                    ar * driveData.image.current.style.height + "px";
                  driveData.image.current.style.height += "px";
                } else if (
                  props.childName == "Image Gallery" &&
                  isFullscreen == false
                ) {
                   console.log(":A");
                  var ar = driveData.image.current.height / driveData.image.current.width;
                driveData.image.current.style.height = 400 + "px";
                driveData.image.current.style.width =
                  ar * driveData.image.current.style.height + "px";
                driveData.image.current.style.height += "px";
                }
                if (isFullscreen === true) {
                  windowModalRef.current.style.top = "0rem";
                  windowModalRef.current.style.height = "100%";
                  windowModalRef.current.style.width = "100%";
                } else {
                  if (isFullscreen === false) {
                    windowModalRef.current.style.top = "5rem";
                    windowModalRef.current.style.height = "";
                    windowModalRef.current.style.width = "";
                  }
                }
              }}
            >
              <span class="material-icons-outlined"> fullscreen </span>
            </div>
            <div
              class="headerBar-right-iconDivBox close"
              onClick={() => {
                if (props.childName == "Notepad") {
                  driveData.WindowModalForNotepad();
                  driveData.setCurrNotepadData({});
                  setIsFullscreen(false);
                  driveData.setBreadcrumbID(
                    driveData.breadcrumbArr[driveData.breadcrumbArr.length - 1]
                      .id
                  );
                  driveData.setDummyState(!driveData.dummyState);
                  driveData.retrieved = false;
                  driveData.setNotePadSaveToggle(false);
                } else if (props.childName == "Gallery") {
                  driveData.WindowModalForGallery();
                } else if (props.childName == "Image Gallery") {
                  driveData.WindowModalForImageCarousel();
                }
              }}
            >
              <span class="material-icons-outlined cancel"> close </span>
            </div>
          </div>
        </div>
        <div className="winmodal-contnet-area">{props.childElement}</div>
      </div>
    </>
  );
}

export default WindowModal;
