import React, { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import icon from "../../assets/images/baseline-cloud_upload-24px.svg";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  icon: {
    opacity: "0.3",
    height: "64px",
    width: "64px"
  }
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const thumbsStyles = {
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
  },
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%"
  }
};

const Dropzone = props => {
  const maxSize = 5242880;
  const [files, setFiles] = useState([]);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    rejectedFiles
  } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    accept: "image/*",
    minSize: 0,
    maxSize
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const thumbs = files.map(file => (
    <div style={thumbsStyles.thumb} key={file.name}>
      <div style={thumbsStyles.thumbInner}>
        <img alt="preview" src={file.preview} style={thumbsStyles.img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        {!isDragActive && (
          <img
            alt="upload"
            style={baseStyle.icon}
            src={icon}
            title="Click here or drop a file to upload!"
          />
        )}
        {isDragReject && "File type not accepted, sorry!"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">File is too large.</div>
        )}
      </div>
      <aside style={thumbsStyles.thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default Dropzone;
