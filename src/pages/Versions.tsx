import * as download from 'electron-dl';
import { ipcRenderer } from 'electron';


export default function Versions() {
  const handleClick = () => {
    ipcRenderer.send('crawl-tuxfamily');
  };

  return (
    <>
      <h1>Versions</h1>
      <button type="button" onClick={handleClick}>
        Crawl Tuxfamily Repository for new versions
      </button>
    </>
  );
}
