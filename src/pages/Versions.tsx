import * as download from 'electron-dl';
import { ipcRenderer } from 'electron';
import VersionBox from '@/components/VersionBox';


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
    <div className="versions-page">
      <div className="filter">
        <div>
          <label htmlFor="version">Version</label>
          <input id="version" type="text"/>
        </div>
        
        <div>
          <label htmlFor="os">OS</label>
          <select id="os">
            <option value="win64">Windows 64</option>
            <option value="win32">Windows 32</option>
            <option value="linux64">Linux 64</option>
            <option value="linux32">Linux 32</option>
            <option value="osx">OSX</option>
          </select>
        </div>

        <div>
          <label htmlFor="show-unstable">Unstable Versions</label>
          <input id="show-unstable" type="checkbox"/>
        </div>

         <div>
          <label htmlFor="show-mono">Use Mono</label>
          <input id="show-mono" type="checkbox"/>
        </div>

        <button className="submit">Reload</button>
      </div>
      <div className="versions">
        <div id="installed-versions" className="versions-split">
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          <VersionBox version="4.5.7-beta" installed={true}/>
          
        </div>
        <div id="available-versions" className="versions-split">
          <VersionBox version="4.5.7-beta" installed={false}/>
        </div>
      </div>
    </div>
  );
}
