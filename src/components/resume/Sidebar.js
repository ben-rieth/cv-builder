import React from "react";
import styled from "styled-components";
import AddSectionDropdown from "../parts/AddSectionDropdown";
import ContactSubsection from "./sidebar-sections/ContactSubsection";

const SidebarContainer = styled.div`
    border: 1px solid green;
    grid-area: sidebar;
`;

class Sidebar extends React.Component {
    dropdownOptions = [
        {
            optionName: "Skills",
            id: 1
        },
        {
            optionName: "Languages",
            id: 2,
        },
        {
            optionName: "Interests",
            id: 3
        }
    ]

    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            options: this.dropdownOptions
        }
    }  

    render() {
        const {options} = this.state;

        return(
            <SidebarContainer>
                <ContactSubsection />
                <AddSectionDropdown 
                    options={options}
                    header="Add Side Section"
                    />
            </SidebarContainer>
        );
    }
}

export default Sidebar;