import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import blankIcon from '@/assets/no-project-icon.png';


interface props {
    projectName: string,
    versionString: string,
    projectPath: string,
    iconPath: string,
}


export default function ProjectBox({ iconPath="", projectName, versionString, projectPath }: props) {
    if (iconPath === "") {
        iconPath = "@/assets/no-project-icon.png";
    }

    const openProject = () => {
        console.log("Open project");
        //TODO
    }

    return (
        <div className="project-box" onClick={openProject}>
            <img src={blankIcon} width={96} height={96} alt="Project Icon" />
            <div className='project-box-info'>
                <h1>{projectName} - v{versionString}</h1>
                <p><FontAwesomeIcon icon={faFolder}></FontAwesomeIcon> - {projectPath}</p>
            </div>
            <div className='project-box-actions'>
                <button>Edit</button>
                <button>Run</button>
                <button>Open in Explorer</button>
                <button>Update Version</button>
            </div>
        </div>
    );
}