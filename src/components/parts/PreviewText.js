import React from "react";
import styled from "styled-components";

const Preview = styled.p`
    font-size: calc(${props => props.fontSize}rem * 1.1);
    font-family: Helvetica;
`;

class PreviewText extends React.Component {
    render() {
        const {text, fontSize, placeholder} = this.props;

        return (
            <div>
                <Preview fontSize={fontSize}> {text.length === 0 ? placeholder : text} </Preview>
            </div>
        );
    }
}

PreviewText.defaultProps = {
    text: "test",
    fontSize: 1
}


export default PreviewText;