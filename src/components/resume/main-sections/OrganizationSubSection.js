import React from "react";
import AutosizeInput from "../../parts/AutosizeInput";
import StartEndDateInput from "../../parts/StartEndDateInput";

class OrganizationSubSection extends React.Component {

    render () {
        return (
            <div className="subsection-form">
                <AutosizeInput placeholder="Organization Name " fontSize={1.2}/>
                <StartEndDateInput />
            </div>
        );
    }
}

export default OrganizationSubSection;