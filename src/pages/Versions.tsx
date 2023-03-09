import * as download from 'electron-dl';
import { ipcRenderer } from 'electron';


export default function Versions() {
  const handleClick = () => {
    ipcRenderer.send('crawl-tuxfamily');
  };

  const handleDebug = () => {
    ipcRenderer.invoke('download-godot', {
      version: '4.0',
      os: 'win64',
      release: 'stable',
      mono: false,
    }).then((result) => {
      console.log(result)
    });
  }

  return (
    <>
      <h1>Versions</h1>
      <button type="button" onClick={handleClick}>
        Crawl Tuxfamily Repository for new versions
      </button>
      <button type="button" onClick={handleDebug}>Print to Debug</button>
    </>
  );
}
