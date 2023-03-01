import ProjectBox from "@/components/ProjectBox";
import Popup from "@/components/Popup";
import { faPlus, faFolder, faF } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function Projects() {
  const handleSubmit = () => {
    // TODO: link to backend when the form is submitted
    
    setPopupActuve(false);
  }

  const [popupActive, setPopupActuve] = useState(false);
  const [addType, setAddType] = useState('new');
  const [selectedPath, setSelectedPath] = useState('C://examplePath');
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddType(event.target.value);
  }

  const popup = (
    <Popup closeListener={() => setPopupActuve(false)}>
      <h3>Add Project</h3>
      <form onSubmit={handleSubmit}>
        <div className="file-input">
          <button type="button">
          <FontAwesomeIcon size="1x" icon={faFolder} />
        </button>
        <label>{selectedPath}</label>
        </div>

        
        <div className="version-input">
          <label>Version: </label>
          <input type="text" name="version"></input>
        </div>

        <div className="radio" onChange={onChangeValue}>
          <div>
            <p>Create New</p>
            <input type="radio" value="new" name="add-type" checked={addType == "new"}></input>
          </div>
          <div>
            <p>Import Existing</p>
            <input type="radio" value="import" name="add-type" checked={addType == "import"}></input>
          </div>
        </div>

        <button type="submit">Add Project</button>
      </form>
    </Popup>
  )

  return (
    <>
      <div className="projects-title">
        <h3></h3>
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
