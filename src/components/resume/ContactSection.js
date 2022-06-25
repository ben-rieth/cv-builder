import React from "react";
import styled from "styled-components";
import uniqid from 'uniqid';
import ModeContext from "../../mode-context";

import AddSectionDropdown from "../parts/AddSectionDropdown";
import { SocialMediaOptions } from "../resources/DropdownOptions";
import SocialMediaSubsection from "./sidebar-sections/SocialMediaSubsection";
import Subsection from "./Subsection";

const Container = styled.div`
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    & > hr {
        border: none;
        background-color: black;
        height: 2px;
        width: 100%:
        opacity: .4;
        margin: 5px 0;
    }

    & > .header {
        display: flex;
        align-items: center;
    }

    & .subsection-form {
        gap: 7px;
    }
`;

class ContactSection extends React.Component {

    constructor(props) {
        super(props);

        this.dropdownOptions = SocialMediaOptions;

        this.state = {
            subsections: [],
            options: this.dropdownOptions
        }

        this.addSection = this.addSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
    }

    addSection(sectionType) {
        this.setState((state) => ({
            subsections: state.subsections.concat(
                {
                    id: uniqid(),
                    type: sectionType
                }
            ),
            options: state.options.filter(option => option.optionName !== sectionType)
        }));
    }

    deleteSection(sectionToDelete) {
        this.setState((state) => ({
            subsections: state.subsections.filter(subsection => subsection.id !== sectionToDelete)
        }));

        this.setState((state) => ({
            options: this.dropdownOptions.filter(option => {
                return !state.subsections.map(subsection => {
                    return subsection.type;
                }).includes(option.optionName)
            }),
        }));
    }

    render() {

        const isPreviewMode = this.context.mode === "preview";

        return (
            <Container>
                <div className="header">
                    <h2>Contact</h2>
                </div>
                <hr />
                <Subsection type="Contact" />
                {this.state.subsections.map((subsection) => {
                    return <SocialMediaSubsection
                                key={subsection.id}
                                type={subsection.type}
                                onDelete={() => this.deleteSection(subsection.id)}
                            />
                })}
                {!isPreviewMode ? 
                    <AddSectionDropdown 
                    header="Add Another Social Media" 
                    isHeader={false} 
                    onSelection={this.addSection}
                    options={this.state.options} /> : <div></div>}

                
            </Container>
        );
    }
}
ContactSection.contextType = ModeContext;

export default ContactSection;