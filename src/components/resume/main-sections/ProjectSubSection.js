import React from "react";
import AutosizeInput from "../../parts/AutosizeInput";
import EditableBulletList from "../../parts/EditableBulletList";

class ProjectSubSection extends React.Component {
    render() {
        return (
            <div className="subsection-form">
                <AutosizeInput placeholder="Project Name" fontSize={1.2} />
                <EditableBulletList placeholder="Description of Achievement/Contribution" fontSize={.8}/>
            </div>
        )
    }
}

export default ProjectSubSection;