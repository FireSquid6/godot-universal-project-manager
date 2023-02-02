import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Git, Github } from 'react-bootstrap-icons';

import HeaderTab from './HeaderTab';

export default function Header() {
  const location = useLocation().pathname;
  console.log(location);

  return (
    <header>
      <div className="header-tabs">
        <HeaderTab route={location} title="Projects" url="/" />
        <HeaderTab route={location} title="Versions" url="/versions" />
        <HeaderTab route={location} title="Config" url="/config" />
      </div>
    </header>
  );
}
