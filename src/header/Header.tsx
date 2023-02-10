import { useLocation } from 'react-router-dom';
import "./header.scss";
import HeaderTab from './HeaderTab';

export default function Header() {
  const location = useLocation().pathname;
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
