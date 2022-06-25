import React from "react";
import ContactInput from "./../../parts/ContactInput";

import EmailIcon from './../../../images/email.svg';
import PhoneIcon from './../../../images/smartphone.svg';
import AddressInput from "../../parts/AddressInput";

class ContactSubsection extends React.Component {
    render() {
        return (
            <div className="subsection-form">
                <ContactInput iconPath={EmailIcon} example="example@email.com" />
                <ContactInput iconPath={PhoneIcon} example="###-###-####" />
                <AddressInput icon={true}/>
            </div>
        )
    }
}

export default ContactSubsection;