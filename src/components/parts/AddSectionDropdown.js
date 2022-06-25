import React from "react";
import styled from 'styled-components';

import AddIcon from './../../images/add.svg';

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    padding: 0;
    background-color: white;
    width: 100%;
`;

const DropdownContent = styled.div`
    display: ${props => props.visible ? 'block' : 'none'};
    position: absolute;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width: 100%;
    background-color: transparent;

    & > button {
        color: black;
        padding: 12px 16px;
        width: 100%;
        cursor: pointer;
    }
`;

const DropButton = styled.button`
    border: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: ${props => props.isHeader ? 'center' : 'flex-start'};
    background-color: ${props => props.isHeader ? 'lightgrey' : 'transparent'};
    width: 100%;
    padding: 0;

    & > img {
        width: ${props => props.isHeader ? 35 : 20}px;
    }

    & > p {
        font-size: ${props => props.isHeader ? 1.5 : 1}rem;
    }

    &:hover {
        transform: ${props => props.isHeader ? "scale(1)" : "scale(1.02)"};
    }
`;

class AddSectionDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownVisible: false
        }

        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.toggleDropdownItems = this.toggleDropdownItems.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
        
    }

    toggleDropdownItems() {
        this.setState({
            dropdownVisible: !this.state.dropdownVisible
        });
    }

    onOptionClick(optionName, subName) {

        const { onSelection } = this.props;

        onSelection(optionName, subName)

        this.setState({
            dropdownVisible: false
        });
    }

    onMouseLeave() {
        this.setState({
            dropdownVisible: false
        });
    }

    render() {
        const {options, header, isHeader} = this.props;
        return(
            <DropdownContainer onMouseLeave={this.onMouseLeave} >
                <DropButton onClick={this.toggleDropdownItems} isHeader={isHeader}>
                    <img src={AddIcon} alt="add" />
                    <p>{header}</p>
                </DropButton>
                <DropdownContent visible={this.state.dropdownVisible}>
                    {options.map((option) => {
                        return <button key={option.id} onClick={() => this.onOptionClick(option.optionName, option.subName)}>
                            {option.optionName}
                        </button>
                    })}
                </DropdownContent>
            </DropdownContainer>
        )
    }

}

AddSectionDropdown.defaultProps= {
    options: [],
    isHeader: true
}

export default AddSectionDropdown;