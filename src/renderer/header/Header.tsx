import HeaderTab from './HeaderTab';
import { Git, Github } from 'react-bootstrap-icons';

export default function Header() {
  return (
    <header>
      <div className="header-top">
        <h3>Godot Universal Project Manager</h3>
        <a href="https://github.com/firesquid6" target="_blank">
          <Github size={20} />
        </a>
      </div>
      <div className="header-tabs">
        <HeaderTab title="Projects" url="./projects.html" />
        <HeaderTab title="Versions" url="./versions.html" />
        <HeaderTab title="New" url="./new.html" />
        <HeaderTab title="Config" url="./config.html" />
      </div>
    </header>
  );
}
