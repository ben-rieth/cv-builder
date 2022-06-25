import React from "react";
import AddressInput from "../../parts/AddressInput";
import AutosizeInput from "../../parts/AutosizeInput";
import EditableBulletList from "../../parts/EditableBulletList";
import StartEndDateInput from "../../parts/StartEndDateInput";

class PositionSubSection extends React.Component {

    render() {
        return(
            <div className="subsection-form">
                <AutosizeInput placeholder="Position/Title" fontSize={1.2} />
                <div className="row" >
                    <AutosizeInput placeholder="Company Name" fontSize={.8}/>
                    <p>·</p>
                    <AddressInput />
                </div>
                <StartEndDateInput />
                <EditableBulletList fontSize={.8} placeholder="Description of Achievements or Tasks"/>
            </div>
        );
    }
}

export default PositionSubSection;