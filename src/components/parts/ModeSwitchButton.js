import React from "react";
import styled from "styled-components";
import ModeContext from "../../mode-context";

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > button {
        font-size: 1rem;
        width: 100px;
        padding: 5px 20px;
        border: none;
        outline: none;

        &.current-mode {
            background-color: dodgerblue;
            pointer-events: none;
            color: white;
        }

        &.left {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        &.right {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        &:not(.current-mode) {
            cursor: pointer;
        }
    }
`;

class ModeSwitchButton extends React.Component {

    render() {
        return(
            <ModeContext.Consumer>
                {({mode, toggleMode}) => (
                    <ButtonContainer>
                        <button 
                            onClick={toggleMode}
                            className={mode === "working" ? "current-mode left" : "left"}>Edit</button>
                        <button 
                            onClick={toggleMode}
                            className={mode === "preview" ? "current-mode right" : "right"}>Preview</button>
                    </ButtonContainer>
                )
                }
            </ModeContext.Consumer>
        )
    }
}

export default ModeSwitchButton;