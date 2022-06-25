import React from "react";
import AutosizeInput from "../../parts/AutosizeInput";

class LanguageSubsection extends React.Component {

    render() {
        return(
            <div className="subsection-form">
                <div className="row">
                    <AutosizeInput placeholder="Language" fontSize={.8} />
                    <p>-</p>
                    <AutosizeInput placeholder="Fluency" fontSize={.8} />
                </div>
            </div>
        )
    }
}

export default LanguageSubsection;