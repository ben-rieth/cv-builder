import React from "react";
import styled from "styled-components";

import AutosizeInput from "../parts/AutosizeInput";


const HeaderContainer = styled.div`
    outline: 1px solid black;
    margin-top: 1px;
    margin-left: 1px; 
    grid-area: header;
    padding: 20px;

    display: flex;
    flex-direction: column;
`;

class Header extends React.Component {

    

    render() {
        return(
            <HeaderContainer>
                <AutosizeInput placeholder="First and Last Name" fontSize={2} />
                <AutosizeInput placeholder="Current Occupation" fontSize={1}  />
            </HeaderContainer>
        );
    }
}

export default Header;