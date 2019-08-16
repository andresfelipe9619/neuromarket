import React, { useState } from "react";
import "./dropzone.css";
import icon from "../../assets/images/baseline-cloud_upload-24px.svg";

const Dropzone = props => {
  const [hightlight, setHightlight] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const fileInputRef = React.createRef();

  // this.openFileDialog = this.openFileDialog.bind(this)
  // this.onFilesAdded = this.onFilesAdded.bind(this)
  // this.onDragOver = this.onDragOver.bind(this)
  // this.onDragLeave = this.onDragLeave.bind(this)
  // this.onDrop = this.onDrop.bind(this)

  const openFileDialog = () => {
    if (props.disabled) return;
    fileInputRef.current.click();
  };

  const onFilesAdded = evt => {
    if (props.disabled) return;
    const files = evt.target.files;
    let filteredFiles = [];
    let reader = new FileReader();
    for (let i = 0; i < files.length; i++) {
      switch (files[i].type) {
        case "image/png":
          filteredFiles.push(files[i]);
          break;
        case "image/jpg":
          filteredFiles.push(files[i]);
          break;
        case "image/jpeg":
          filteredFiles.push(files[i]);
          break;
        default:
          alert(
            "Unsupported file format: available formats are .png, .jpg, .jpeg"
          );
      }
    }

    if (props.onFilesAdded) {
      const array = fileListToArray(filteredFiles);
      props.onFilesAdded(array);
    }
    let url = reader.readAsDataURL(filteredFiles[0]);
    reader.onloadend = function(e) {
      setImgSrc(reader.result);
    };
  };

  const onDragOver = evt => {
    evt.preventDefault();

    if (props.disabled) return;

    setHightlight({ hightlight: true });
  };

  const onDragLeave = () => {
    setHightlight({ hightlight: false });
  };

  const onDrop = event => {
    event.preventDefault();

    if (props.disabled) return;

    const files = event.dataTransfer.files;
    let filteredFiles = [];
    for (let i = 0; i < files.length; i++) {
      switch (files[i].type) {
        case "image/png":
          filteredFiles.push(files[i]);
          break;
        case "image/jpg":
          filteredFiles.push(files[i]);
          break;
        case "image/jpeg":
          filteredFiles.push(files[i]);
          break;
        default:
          alert(
            "Unsupported file format: available formats are .png, .jpg, .jpeg"
          );
      }
    }
    if (props.onFilesAdded) {
      const array = fileListToArray(filteredFiles);
      props.onFilesAdded(array);
    }
    setHightlight({ hightlight: false });
  };

  const fileListToArray = list => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list[i]);
    }
    return array;
  };

  return (
    <div
      className={`Dropzone ${hightlight ? "Highlight" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: props.disabled ? "default" : "pointer" }}
    >
      <input
        ref={fileInputRef}
        className="FileInput"
        type="file"
        multiple
        onChange={onFilesAdded}
      />
      <img alt="upload" className="Icon" src={icon} />
    </div>
  );
};

export default Dropzone;
