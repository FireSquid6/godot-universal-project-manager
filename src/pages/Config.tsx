import { ipcRenderer } from "electron";
import React from "react";
import TextInput from "@/components/forms/TextInput";
import FileInput from "@/components/forms/FileInput";



export default function Config() {
  const handleSubmit = async (data: any) => {
    data.preventDefault();


    const formData = Object.fromEntries(new FormData(data.target).entries());
    for (const key in formData) {
      // save all keys to settings using ipcRenderer
      ipcRenderer.invoke('store-setting', {key: key, value: formData[key]});
    }
  }

  const onClick = () => {
    console.log(ipcRenderer.invoke('get-setting', 'projectsPath'));
  }

  return (
    <>
      <h1>Config Page</h1>
      <FileInput pathChanged={(path: string) => console.log(path)}></FileInput>
      <form onSubmit={handleSubmit}>
        <TextInput label="Versions Folder" inputId="versions"/>
      </form>

      <button onClick={onClick}>Print settings to the console!</button>
    </>
  );
}
