import { ipcRenderer } from "electron";
import React from "react";
import TextInput from "@/components/forms/TextInput";
import FileInput from "@/components/forms/FileInput";

import { useRef, useEffect, useState } from 'react'

function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}


export default function Config() {
  const [versionsPath, setVersionsPath] = React.useState<string>("");
  const isFirst = useIsFirstRender()
  const onSubmit = () => {
    console.log(`setting ${versionsPath} as versions path`)
    ipcRenderer.invoke("store-setting", {
      key: "versions-path",
      value: versionsPath,
    });
  }

  useEffect(() => {
    if (!isFirst) {
      return
    }
    ipcRenderer.invoke('get-setting', 'versions-path').then((data) => {
      console.log(`First render: ${data}`)
      setVersionsPath(data)
    });
  });


  return (
    <>
      <h1>Settings</h1>
      <div>
        <FileInput openMode="openDirectory" path={versionsPath} label={`Directory to store Godot executables`} pathChanged={(path: string) => {
          setVersionsPath(path)
          console.log(path)
      }}/>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "10px",
      }}>
        <button className="submit" onClick={onSubmit}>Update Settings</button>
      </div>
    </>
  );
}
