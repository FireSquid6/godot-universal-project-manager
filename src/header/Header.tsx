import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import "./header.scss";
import HeaderTab from './HeaderTab';

export default function Header() {
  const noStatusText = "No background process";

  const location = useLocation().pathname;
  const [statusText, setStatusText] = useState(noStatusText);
  const [satusIsRunning, setStatusIsRunning] = useState(false);



  ipcRenderer.on('set-statusbar-name', (event, name: string) => {
    if (name === "") {
      setStatusText(noStatusText);
      setStatusIsRunning(false);
    }
    else {
      setStatusText(name);
      setStatusIsRunning(true);
    }
  })

  return (
    <>
      <header>
        <div className="header-tabs">
          <HeaderTab route={location} title="Projects" url="/" />
          <HeaderTab route={location} title="Versions" url="/versions" />
          <HeaderTab route={location} title="Config" url="/config" />
        </div>
      </header>
      <div className="status-bar">
          <p>
            <span id="statusLogo" className="status-bar-icon">Logo</span> 
            <span>{statusText}</span>
          </p>
      </div>
    </>
  );
}
