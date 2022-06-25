import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;

    & > button {       
        width: 20%;
        padding: 10px 0;
        background-color: dodgerblue;
        color: white;
        border-radius: 10px;
        border: none;
        outline: none;
        font-weight: bold;
        cursor: pointer;

        &:hover {
            background-color:white;
            outline: 1px solid dodgerblue;
            color: dodgerblue;
        }
    }

`;

class PrintButton extends React.Component {

    render() {
        return (
            <ButtonContainer>
                <button>
                    Print Your Resume!
                </button>
            </ButtonContainer>
        )
    }
    
}

export default PrintButton;