import React from "react";
import styled from "styled-components";
import AutosizeInput from "./AutosizeInput";

import LocationIcon from "./../../images/location.svg";

const InputContainer = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;

    & > img {
        width: 1rem;
    }
`;

class AddressInput extends React.Component {
    

    render() {
        const {icon} = this.props;
        return(
            <InputContainer>
                {icon ? <img src={LocationIcon} alt="" /> : <div></div>}
                <AutosizeInput placeholder="City Name" fontSize={.8} />
                <p>,</p>
                <AutosizeInput placeholder="ST" fontSize={.8} characterLimit={2} addLip={false}/>
            </InputContainer>
        )
    }

}

AddressInput.defaultProps = {
    icon: false
}

export default AddressInput;