import ProjectBox from "@/components/ProjectBox";
import Popup from "@/components/Popup";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function Projects() {
  const [popupActive, setPopupActuve] = useState(false);
  const popup = (
    <Popup>
      
    </Popup>
  )

  return (
    <>
      <div className="projects-title">
        <h3>Projects</h3>
        <button onClick={() => setPopupActuve(!popupActive)}>
          <FontAwesomeIcon size="3x" icon={faPlus} />
        </button>
      </div>
      {popupActive ? popup : null}
      <div className="projects">
        <ProjectBox projectPath="C://Users/jdeis/source/teleorb/" projectName="Teleorb" versionString="1.0.0-stable" iconPath=""></ProjectBox>
      </div>
    </>
  );
}
