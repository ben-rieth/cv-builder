import React from "react";
import styled from 'styled-components';
import AutosizeInput from "./AutosizeInput";

const DisplayWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Placeholder = styled.p`
    font-size: ${props => props.fontSize}rem;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

class InputDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            displayText: this.props.placeholder
        }

        this.turnOnEditMode = this.turnOnEditMode.bind(this);
        this.turnOffEditMode = this.turnOffEditMode.bind(this);
    }

    turnOnEditMode() {
        this.setState({
            editMode: true
        });
    }

    turnOffEditMode(newValue) {
        this.setState({
            editMode: false,
            displayText: newValue
        })
    }

    render() {
        const { editMode, displayText} = this.state;
        const { fontSize, exampleText } = this.props;

        if (editMode) {
            return (
                <DisplayWrapper>
                    <AutosizeInput 
                        fontSize={fontSize} 
                        placeholder={exampleText}
                        onBlur={this.turnOffEditMode} />
                </DisplayWrapper>
            )
        } else {
            return (
                <DisplayWrapper>
                    <Placeholder fontSize={fontSize} onClick={this.turnOnEditMode}>
                        {displayText}
                    </Placeholder>
                </DisplayWrapper>
            );
        }
    }
}

export default InputDisplay;