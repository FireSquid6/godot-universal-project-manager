import HeaderTab from './HeaderTab';

export default function Header() {
  return (
    <header>
      <h1>Godot Universal Project Manager</h1>
      <div className="header-tabs">
        <HeaderTab title="Projects" url="./projects.html" />
        <HeaderTab title="Versions" url="./versions.html" />
        <HeaderTab title="New" url="./new.html" />
        <HeaderTab title="Config" url="./config.html" />
      </div>
    </header>
  );
}
