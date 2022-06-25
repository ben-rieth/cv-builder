import React from "react";
import styled from "styled-components";

import AddIcon from './../../images/add.svg';

const Button = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin-left: -10px;

    &:hover {
        transform: scale(1.02);
    }

    & > img {
        width: ${props => props.fontSize}rem;
    }  

    & > p {
        font-size: ${props => props.fontSize}rem;
    }
`;

class AddAnotherButton extends React.Component {
    render() {
        const { name, onClick, fontSize } = this.props;

        return(
            <Button onClick={onClick} fontSize={fontSize}>
                <img src={AddIcon} alt="add" />
                <p>{`Add Another ${name}`}</p>
            </Button>
        )
    }
}

AddAnotherButton.defaultProps = {
    fontSize: 1
}

export default AddAnotherButton;