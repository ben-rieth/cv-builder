import React from "react";
import AutosizeInput from "../../parts/AutosizeInput";

class AwardSubSection extends React.Component {
    render() {
        return (
            <div className="subsection-form">
                <div className="row">
                    <AutosizeInput placeholder="Name of Award" fontSize={1.2} />
                    <p>·</p>
                    <AutosizeInput placeholder="yyyy" fontSize={1.2} addLip={false} characterLimit={4} pattern={/[1-2]\d{3}/}/>
                </div>
                <AutosizeInput placeholder="Awarding Organization" fontSize={.8}/>
            </div>
        );
    }
}

export default AwardSubSection;