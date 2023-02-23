import * as download from 'electron-dl';
import { ipcRenderer } from 'electron';


export default function Versions() {
  const handleClick = () => {
    ipcRenderer.invoke('crawl-tuxfamily', 'The status');
  };

  return (
    <>
      <h1>Versions</h1>
      <button type="button" onClick={handleClick}>
        Click me!
      </button>
    </>
  );
}
