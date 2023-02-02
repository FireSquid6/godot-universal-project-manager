import HeaderTab from './HeaderTab';
import { useState } from 'react';
import { Git, Github } from 'react-bootstrap-icons';

export default function Header() {
  const [route, setRoute] = useState('/');

  return (
    <header>
      <div className="header-tabs">
        <HeaderTab title="Projects" url="/" />
        <HeaderTab title="Versions" url="/versions" />
        <HeaderTab title="Config" url="/config" />
      </div>
    </header>
  );
}
