import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"


type ContainerProps = {
  children: React.ReactNode,
}

export default function Popup(props: ContainerProps) {
  const close = new CustomEvent('closePopup')
  

  return (
    <div className="popup">
      <button className="popup-close-button" onClick={() => dispatchEvent(close)}>
        <FontAwesomeIcon size="2x" icon={faCircleXmark} />
      </button>
      <div className="popup-content">
        {props.children}
        
      </div>
    </div>
  )
}