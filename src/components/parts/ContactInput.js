import React from "react";
import styled from "styled-components";
import AutosizeInput from "./AutosizeInput";

const InputContainer = styled.div`
    display: flex;
    gap: 5px;

    & > img {
        width: 1rem;
        height: auto;
    }
`;

class ContactInput extends React.Component {

    render() {
        const {iconPath, example, canDelete, onIconClick} = this.props;

        return(
            <InputContainer>
                <img src={iconPath} alt="icon" />
                <AutosizeInput 
                    placeholder={example} 
                    fontSize={.85}
                    icon={canDelete ? "delete" : "none"}
                    onIconClick={onIconClick}
                    />
            </InputContainer>
        )
    }
}

ContactInput.defaultProps = {
    canDelete: false
}

export default ContactInput;