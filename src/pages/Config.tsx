import { ipcRenderer } from "electron";



export default function Config() {
  const handleSubmit = async (data: any) => {
    data.preventDefault();

    const formData = Object.fromEntries(new FormData(data.target).entries());
    for (const key in formData) {
      // save all keys to settings using ipcRenderer
      ipcRenderer.send('save-setting', key, formData[key]);
    }

    console.log(formData);
  }

  return (
    <>
      <h1>Config Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="directory" name="projectsPath" defaultValue="C://gupm/GodotProjects/"></input>
        <input type="text" name="versionsPath" defaultValue="C://gupm/GodotVersions/"></input>
        <button type="submit">Update Settings</button>
      </form>
      
      
    </>
  );
}
