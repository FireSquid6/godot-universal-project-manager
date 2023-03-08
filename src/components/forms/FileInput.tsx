import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ipcRenderer } from "electron";


interface FileInputProps {
  pathChanged: (path: string) => void,
  path: string
  label?: string
  openMode?: "openFile" | "openDirectory"
}

export default function FileInput({ label="", pathChanged, openMode="openFile", path = ""}: FileInputProps) {
  const explore = () => {
    // open the user's file explorer and have them select a directory
    ipcRenderer.invoke("open-explorer", {
      title: "Select a directory",
      defaultPath: path,
      properties: [openMode],
    }).then((path: string) => {
      if (path !== undefined) {
        pathChanged(path);
      }
    });
  }

  return (
    <div className="file-input">
      <p>{label}</p>
      <div className="inner-file-input">
        <button type="button" onClick={explore}>
          <FontAwesomeIcon icon={faFolder} />
        </button>
        <p>{path}</p>
      </div>
    </div>
  )
}