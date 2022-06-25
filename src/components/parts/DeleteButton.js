import styled from 'styled-components';
import React from 'react';

import DeleteIcon from './../../images/delete.svg'

const ButtonContainer = styled.img`
    filter: invert(17%) sepia(73%) saturate(7442%) hue-rotate(356deg) brightness(101%) contrast(129%);
    width: ${props => props.width}rem;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

class DeleteButton extends React.Component {

    render() {
        const {onClick, onMouseEnter, onMouseLeave, buttonWidth} = this.props;
        
        return(
            <ButtonContainer 
                width={buttonWidth}
                src={DeleteIcon}
                alt="delete"
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        );
    }
}

export default DeleteButton;