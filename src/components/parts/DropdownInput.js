import React from "react";
import styled from "styled-components";
import AutosizeInput from "./AutosizeInput";

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    padding: 0;
    background-color: white;
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

class DropdownInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownVisible: false
        }

        this.toggleDropdownItems = this.toggleDropdownItems.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
    }

    toggleDropdownItems() {
        this.setState({
            dropdownVisible: !this.state.dropdownVisible
        });
    }

    onOptionClick() {
        this.setState({
            dropdownVisible: false
        });
    }

    render() {
        const {placeholder, fontSize, options} = this.props;
        const {dropdownVisible} = this.state;

        return (
            <DropdownContainer>
                <AutosizeInput placeholder={placeholder} fontSize={fontSize}/>
                <DropdownContent visible={dropdownVisible}>
                    {options.map((option) => {
                        return <button key={option.id} onClick={() => this.onOptionClick(option.optionName)}>
                            {option.optionName}
                        </button>
                    })}
                </DropdownContent>
            </DropdownContainer>
        )
    }
}

export default DropdownInput;