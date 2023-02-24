import * as download from 'electron-dl';
import { ipcRenderer } from 'electron';


export default function Versions() {
  const handleClick = () => {
    ipcRenderer.send('crawl-tuxfamily');
  };

  const handleDebug = () => {
    ipcRenderer.invoke('get-setting', 'crawl-results').then((data) => {
      console.log(data)
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
