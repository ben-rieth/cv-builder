import React from "react";
import ContactInput from "../../parts/ContactInput";

import InstaIcon from './../../../images/instagram.svg';
import FacebookIcon from './../../../images/facebook.svg';
import GithubIcon from './../../../images/github.svg';
import LinkedinIcon from './../../../images/linkedin.svg';
import WebsiteIcon from './../../../images/website.svg';

class SocialMediaSubsection extends React.Component {

    render() {
        const {type, onDelete} = this.props;

        let icon;
        switch (type) {
            case "Instagram":
                icon=InstaIcon;
                break;
            case "Facebook":
                icon=FacebookIcon;
                break;
            case "Github":
                icon=GithubIcon;
                break;
            case "Linkedin":
                icon=LinkedinIcon;
                break;
            case "Personal Website":
                icon=WebsiteIcon;
                break;
            default:
                icon=WebsiteIcon;
                break;
        }


        return (
            <div className="subsection-form">
                <ContactInput 
                    iconPath={icon} 
                    example="@account-name" 
                    canDelete={true} 
                    onIconClick={onDelete}/>
            </div>
        )
    }
}

export default SocialMediaSubsection;
