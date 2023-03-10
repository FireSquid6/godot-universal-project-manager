
interface VersionBoxProps {
  version: string;
  installed?: boolean;
}


export default function VersionBox({version, installed = false}: VersionBoxProps) {
  return (
    <div className="version-box">
      <p>{version}</p>
      <div>
        {installed ? <button>Open</button> : <></>}
        {installed ? <button>Uninstall</button> : <button>Install</button>}
      </div>
    </div>
  )
}