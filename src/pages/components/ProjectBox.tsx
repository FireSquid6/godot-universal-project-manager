interface props {
    projectName: string,
    version: string,
    path: string,
}


export default function ProjectBox({ projectName, version, path }: props) {
    const icon = path + '/icon.png';
    return (
        <div className="project-box">
            <h2>{projectName}</h2>
            <p>{version}</p>
        </div>
    );
}