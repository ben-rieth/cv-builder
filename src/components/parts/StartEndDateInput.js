import React from "react";
import styled from "styled-components";
import uniqid from 'uniqid';
import ModeContext from "../../mode-context";
import DateInput from "./DateInput";

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    & > .present {
        border-bottom: ${props => props.preview ? "none" : "2px solid lightgrey"};
        font-family: ${props => props.preview ? "Helvetica" : "monospace"};
        padding:  ${props => props.preview ? "0" : "0 .75ch"};
    }

    & > p {
        font-size: ${props => props.preview ? .75 * 1.1 : .75}rem;
    }
`;

const PresentContainer = styled.div`
    display: flex;
    align-items:center;
    gap: 2px;

    & > label {
        font-size: .75rem;
    }

    & > input {
        margin: 0 0 0 5px;
    }

`;

class StartEndDateInput extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqid();

        this.state = {
            isEndDatePresent: false
        }

        this.onClick = this.onClick.bind(this);
    }

    componentDidUpdate() {
        if(this.state.isEndDatePresent && this.context.mode === "working") {
            document.getElementById(this.id).checked = true;
        }
    }

    onClick() {
        this.setState({
            isEndDatePresent: !this.state.isEndDatePresent
        });
    }

    render() {
        const {isEndDatePresent} = this.state;
        const {allowPresent} = this.props;

        const isPreviewMode = this.context.mode === "preview";

        return (
            <DateContainer preview={isPreviewMode}>
                <DateInput />
                <p>-</p>
                {isEndDatePresent ? 
                    <p className="present">Present</p> : <DateInput />}
                {allowPresent && !isPreviewMode ? 
                    <PresentContainer>
                        <input type="checkbox" id={this.id} onClick={this.onClick}/>
                        <label htmlFor={this.id}>Present?</label>
                    </PresentContainer> : <div></div>}
            </DateContainer>
        );
    }
}

StartEndDateInput.contextType = ModeContext;

StartEndDateInput.defaultProps = {
    allowPresent: true
}

export default StartEndDateInput;