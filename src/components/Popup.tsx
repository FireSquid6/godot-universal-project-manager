import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"


type ContainerProps = {
  children: React.ReactNode,
  closeListener: () => void,
}

export default function Popup({children, closeListener}: ContainerProps) {
  const close = new CustomEvent('closePopup')
  

  return (
    <div className="popup">
      <button className="popup-close-button" onClick={closeListener}>
        <FontAwesomeIcon size="2x" icon={faCircleXmark} />
      </button>
      <div className="popup-content">
        {children}
      </div>
    </div>
  )
}