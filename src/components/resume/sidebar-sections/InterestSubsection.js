import React from "react";
import AutosizeInput from "../../parts/AutosizeInput";

class InterestSubsection extends React.Component {

    render() {
        return (
            <div class="subsection-row">
                <AutosizeInput placeholder="Interest Name" fontSize={.8} />
            </div>
        );
    }
}

export default InterestSubsection;