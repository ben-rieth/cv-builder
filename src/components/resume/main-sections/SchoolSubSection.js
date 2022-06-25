import React from "react";
import AutosizeInput from "../../parts/AutosizeInput";
import StartEndDateInput from "../../parts/StartEndDateInput";


class SchoolSubSection extends React.Component {
    render() {
        return (
            <div className="subsection-form">
                <AutosizeInput placeholder="Degree Name" fontSize={1.2}/>
                <AutosizeInput placeholder="School Name" fontSize={1}/>
                <StartEndDateInput />
            </div>
        );
    }
}

export default SchoolSubSection;