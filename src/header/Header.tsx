import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import "./header.scss";
import HeaderTab from './HeaderTab';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons'


export default function Header() {
  const noStatusText = "No background process";

  const location = useLocation().pathname;
  const [statusText, setStatusText] = useState(noStatusText);
  const [satusIsRunning, setStatusIsRunning] = useState(false);

  ipcRenderer.on('set-statusbar-name', (event, name: string) => {
    // when this is called from the main process, it leaks memory
    // not sure why this happens.
    // github copilot seems to think that it's because the event is not being cleaned up properly or something

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
          <p onClick={() => setStatusIsRunning(false)}>
            <FontAwesomeIcon icon={faAtom} spin={satusIsRunning}/>
            <span>{statusText}</span>
          </p>
      </div>
    </>
  );
}
