import React from "react";
import styled from "styled-components";
import AutosizeInput from "./AutosizeInput";

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`;

class DateInput extends React.Component {

    render() {
        return (
            <DateContainer>
                <AutosizeInput placeholder="mm" fontSize=".75" characterLimit={2} pattern={/[0-1]\d/} icon="none" addLip={false}/>
                <p>/</p>
                <AutosizeInput placeholder="yyyy" fontSize=".75" characterLimit={4} pattern={/[1-2]\d{3}/} icon="none" addLip={false}/>
            </DateContainer>
        );
    }
}

export default DateInput;