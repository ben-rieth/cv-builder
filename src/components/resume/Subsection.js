import React from "react";
import styled from "styled-components";
import DeleteButton from "./../parts/DeleteButton";
import AwardSubSection from "./main-sections/AwardSubSection";
import OrganizationSubSection from "./main-sections/OrganizationSubSection";
import PositionSubSection from "./main-sections/PositionSubSection";
import ProjectSubSection from "./main-sections/ProjectSubSection";
import SchoolSubSection from "./main-sections/SchoolSubSection";
import ContactSubsection from "./sidebar-sections/ContactSubsection";
import InterestSubsection from "./sidebar-sections/InterestSubsection";
import LanguageSubsection from "./sidebar-sections/LanguageSubsection";
import SkillsSubsection from "./sidebar-sections/SkillsSubsection";

const SubsectionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 5px;
    max-width: 100%;

    & > .subsection-form {
        display: flex;
        flex-direction: column;
        gap: 2px;
        ${'' /* margin-bottom: 10px; */}
        max-width: 92%;

        & > .row {
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }

    & > .delete {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: red;
        opacity: 0.2;
        top: 0;
        left: -1px;
        pointer-events: none;
    } 

    & > .blank {
        position: absolute;
    }  
`;

class Subsection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveringOverDelete: false
        }

        this.overDeleteButton = this.overDeleteButton.bind(this);
        this.leaveDeleteBUtton = this.leaveDeleteBUtton.bind(this);
    }

    overDeleteButton() {
        this.setState({
            hoveringOverDelete: true
        });
    }

    leaveDeleteBUtton() {
        this.setState({
            hoveringOverDelete: false
        })
    }

    render() {
        const { type, id, onDelete, canDelete } = this.props;
        const {hoveringOverDelete} = this.state;


        let subsection;
        let deleteBtnSize = 2;
        switch(type) {
            case "Education":
                subsection=<SchoolSubSection/>;
                break;
            case "Work Experience":
                subsection=<PositionSubSection/>;
                break;
            case "Awards":
                subsection=<AwardSubSection />;
                break;
            case "Projects":
                subsection=<ProjectSubSection />;
                break;
            case "Organizations":
                subsection=<OrganizationSubSection />
                break;
            case "Contact":
                subsection=<ContactSubsection />
                break;
            case "Skills":
                subsection=<SkillsSubsection />
                deleteBtnSize = 1.2;
                break;
            case "Languages":
                subsection=<LanguageSubsection />
                deleteBtnSize = 1.2;
                break;
            case "Interests":
                subsection=<InterestSubsection />
                deleteBtnSize = 1.2;
                break;
            default:
                break;
        }

        return(
            <SubsectionContainer>
                {subsection}

                {canDelete ?
                    <DeleteButton 
                        onClick={() => {
                            onDelete(id)
                        }} 
                        onMouseEnter={this.overDeleteButton}
                        onMouseLeave={this.leaveDeleteBUtton}
                        buttonWidth={deleteBtnSize}
                        /> : <div></div>
                }  
                {hoveringOverDelete ? 
                    <div className="delete"></div> :
                    <div className="blank"></div> }
            </SubsectionContainer>
        );
    }
}



export default Subsection;