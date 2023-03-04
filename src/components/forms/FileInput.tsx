import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ipcRenderer } from "electron";


interface FileInputProps {
  pathChanged: (path: string) => void,
  initialPath?: string
  openMode?: "openFile" | "openDirectory"
}

export default function FileInput({ pathChanged, openMode="openFile", initialPath = ""}: FileInputProps) {
  const [filepath, setFilePath] = useState(initialPath);
  const explore = () => {
    // open the user's file explorer and have them select a directory
    ipcRenderer.invoke("open-explorer", {
      title: "Select a directory",
      defaultPath: filepath,
      properties: [openMode],
    }).then((path: string) => {
      if (path !== undefined) {
        setFilePath(path);
        pathChanged(path);
      }
    });
  }

  return (
    <div className="file-input">
      <button type="button" onClick={explore}>
        <FontAwesomeIcon icon={faFolder} />
      </button>
      <p>{filepath}</p>
    </div>
  )
}