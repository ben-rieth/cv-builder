import React from "react";
import styled from 'styled-components';

import Header from './resume/Header';
import ResumeColumn from "./resume/ResumeColumn";

const DisplayContainer = styled.div`
    margin: 10px auto 50px;
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: 1fr 11fr;
    grid-template-areas:
        "sidebar  header"
        "sidebar main";
    width: clamp(700px, 90vw, 1300px);
    aspect-ratio: 1 / 1.2941;
`;

class ResumeDisplay extends React.Component {

    render() {
        return (
            <DisplayContainer>
                <Header />
                <ResumeColumn type="sidebar" />
                <ResumeColumn type="main" />             
            </DisplayContainer>
        );
    }

}

export default ResumeDisplay;