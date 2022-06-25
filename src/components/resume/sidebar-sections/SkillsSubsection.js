import React from "react";
import AutosizeInput from "../../parts/AutosizeInput";

class SkillsSubsection extends React.Component {

    render() {
        return(
            <div className="subsection-form">
                <div className="row">
                    <AutosizeInput placeholder="Skill Name" fontSize={.8} />
                    <p>-</p>
                    <AutosizeInput placeholder="Skill Level" fontSize={.8} />
                </div>
            </div>
        )
    }
}

export default SkillsSubsection;