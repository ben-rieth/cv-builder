import React from "react";
import styled from 'styled-components';
import uniqid from 'uniqid';

import CheckCircleIcon from './../../images/check_circle.svg';
import ErrorIcon from './../../images/error.svg';
import DeleteIcon from './../../images/delete.svg';
import PreviewText from "./PreviewText";
import ModeContext from "../../mode-context";

/**
 * A StyledComponent div which contains the input, placeholder, and validity icon
 * @property {number} len - the length of the current value
 * @property {number} fontSize - the font size of the input, also used to leave space for the icon at the end of the input
 * @property {boolean} focused - whether or not the input is focused
 * @property {boolean} leaveSpaceForIcon - whether or not to leave space for the icon at the end of the input line
 * @property {boolean} addLip - whether or not to add a little extra line space to the end
 */
const InputWrapper = styled.div`
    width: calc(${props => props.len}ch + 
        ${props=>props.leaveSpaceForIcon ? props.fontSize : 0}rem + 
        ${props=>props.addLip ? 1 : 0}ch);
    max-width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    font-size: ${props => props.fontSize}rem;

    border-bottom: ${props => props.focused ? '2px solid dodgerblue' : '2px solid lightgrey'}
`;

/**
 * A StyledComponent div that represents the placeholder for the input
 */
const Placeholder = styled.div`
    opacity: 0.3;
    position: absolute;
    pointer-events: none;
    font-family: monospace;
`;

/**
 * A StyledComponent img for the icon
 * @property {number} iconWidth - the width of the icon, set the the fontSize of the input
 * @property {number} distance - the length of the input, makes sure the icon always stays at the edge of the input
 * @property {string} type - the type of icon to be displayed
 */
const Icon = styled.img`
    ${({type}) => {
        switch(type) {
            case "valid":
                return `
                    content: url(${CheckCircleIcon});
                    filter: invert(96%) sepia(81%) saturate(3047%) hue-rotate(79deg) brightness(96%) contrast(112%);`;
            case "delete":
                return `
                    content: url(${DeleteIcon});
                    filter: invert(17%) sepia(73%) saturate(7442%) hue-rotate(356deg) brightness(101%) contrast(129%);`;
            default:
                return `content: url(${CheckCircleIcon});`;

        }
    }}
    position: absolute;
    left: min(calc(${props => props.distance}ch + 5ch), 100%);
    width: ${props => props.iconWidth < 1 ? 1 : props.iconWidth}rem;

    &:hover {
        ${props => props.type === "delete" ?
            "cursor: pointer; transform: scale(1.2);" : ""
        }
    }
`;

/**
 * A StyledComponent div for the invalid input display
 * @property {number} offset - the offset from the top of the container
 */
const InvalidMessageDisplay = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1;
    top: calc(${props => props.offset}rem + 20px);
    background-color: white;
    color: red;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,.5);
    border: 1px solid black;
    border-radius: 5px;
    padding: 2px 10px;
    font-size: 1rem;

    & > img {
        width: 1rem;
        filter: invert(16%) sepia(80%) saturate(6167%) hue-rotate(357deg) brightness(90%) contrast(125%);
    }

    &:before, &:after {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
    }

    &:before {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid transparent;
        border-bottom: 10px solid black;
        left: 5%;
        top: -21px;
    }

    &:after {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid transparent;
        border-bottom: 10px solid #fff;
        left: 5%;
        top: -20px;
    }
`;

/**
 * A StyledComponent span for the input
 * @property {number} len - the length of the placeholder or the current input value, whichever is longer
 */
const Input = styled.span`
    width: min(${props => props.len}ch, 100%); /* sets the max width at the width of the input wrapper so input doesn't go off screen*/
    border: none;
    outline: none;
    padding: 0 0 2px 0;
    white-space: ${props => props.allowMultipleLines ? 'break-space' : 'nowrap'}; 
    overflow: hidden;
    font-family: monospace;
`;

/**
 * A component representing an input which will grow with the user's input
 */
class AutosizeInput extends React.Component {

    /**
     * Constructor for creating an input
     * 
     * @property {string}  [inputType="text"]   - controls the keyboard that the user sees
     * @property {string}  [placeholder=""]     - the string that is display before text is entered
     * @property {number}  [fontSize=1]         - the font size of the input in rem units
     * @property {string}  [initialValue=""]    - the initial value of the input before editing
     * @property {number}  [characterLimit=500] - the maximum amount of characters the input will allow
     * @property {regex}   [pattern='[\s\S]*']  - the regex pattern the string must match
     * @property {boolean} [icon=true]          - whether or not the validity icon is displayed
     * @property {string}  [invalidMessage]     - the message that displays when an invalid input is entered
     * @property {boolean} [addLip=true]        - whether or not to add a little extra space to the end of the input line
     * @property {boolean} [allowMultipleLines] - whether or not the input is allowed to be more than one line
     *
     * @param {object}  state                   - the React state object for this component
     * @param {string}  state.value             - the current value of the input
     * @param {boolean} state.placeholderShown  - whether or not the placeholder is currently shown
     * @param {boolean} state.focused           - whether or not the input is currently focused
     * @param {boolean} state.matchesPattern    - whether or not the input matches the pattern
     */
    constructor(props) {
        super(props);
        
        this.id = uniqid();

        this.state = {
            value: this.props.initialValue,
            placeholderShown: this.props.initialValue === "" ? true : false,
            focused: false,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.stopIfPastCharacterMax = this.stopIfPastCharacterMax.bind(this);
        this.doesInputMatchPattern = this.doesInputMatchPattern.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onPaste = this.onPaste.bind(this);
    }

    componentDidUpdate() {

        if(this.context.mode === "working") {
            document.getElementById(this.id).textContent = this.state.value;
        }
    }

    /**
     * Returns whether or not the input from the event matches the pattern
     * 
     * @param {Event} event - an event representing the user adding text to the input
     * 
     * @returns {boolean}   - whether or not the input matches the given pattern
     */
    doesInputMatchPattern(event) {
        const {pattern} = this.props;
        return pattern.test(event.target.textContent);    
    }

    /**
     * Updates the value of the component every time the user adds input
     * 
     * @param {Event} event - an event representing the user adding text to the input 
     */
    onInputChange(event) {
        const { characterLimit } = this.props;

        if (event.target.textContent.length <= characterLimit) {
            this.setState({
                value: event.target.textContent,
                placeholderShown: event.target.textContent === "" ? true : false,
                matchesPattern: this.doesInputMatchPattern(event)
            });
        }
    }

    /**
     * Prevents the user from using the enter key to create a new line
     * 
     * @param {Event} event - an event representing the user pressing down a key on the keyboard
     */
    stopNewLine(event) {
        if (event.code === "Enter") {
            event.preventDefault();
        }
    }

    /**
     * Prevents the user from entering more characters if they are past the maximum amount of characters
     * 
     * @param {Event} event - an event representing the user pressing down a key on the keyboard
     */
    stopIfPastCharacterMax(event) {
        const { characterLimit } = this.props;
        const printableKeys = [" ", "Decimal", "Multiply", "Add", "Divide", "Subtract", "Separator"]
        if(event.target.textContent.length >= characterLimit) {
            if(/^[\s\S]$/.test(event.key) ||
                    printableKeys.includes(event.key) ||
                    event.key.includes("Key")) {
                event.preventDefault();
            }
        }
    }

    /**
     * Checks to make sure the key entered is a valid input 
     * 
     * @param {Event} event - an event representing the user pressing down a key on the keyboard
     */
    onKeyDown(event) {
        this.stopNewLine(event);
        this.stopIfPastCharacterMax(event);
    }

    /**
     * Focuses the component
     */
    onFocus() {
        this.setState({
            focused: true
        })
    } 

    /**
     * Unfocuses the component
     */
    onBlur() {
        this.setState({
            focused: false
        })
    }

    /**
     * Ensures that pasted text gets inserted as plain text
     * @param {Event} event - an event representing the user pasting text into the input
     */
    onPaste(event) {
        const { characterLimit } = this.props;

        event.preventDefault();
        const text = event.clipboardData.getData('text/plain');
        const charactersLeft = characterLimit - event.target.textContent.length;
        event.target.textContent += text.slice(0, charactersLeft);

        this.setState({
            value: event.target.textContent,
            placeholderShown: event.target.textContent === "" ? true : false,
            matchesPattern: this.doesInputMatchPattern(event)
        })
    }

    /**
     * Renders the component on the page
     * @returns {Component} 
     */
    render() {
        const {
            placeholder, 
            fontSize, 
            icon, 
            inputType, 
            invalidMessage, 
            addLip, 
            allowMultipleLines, 
            onIconClick} = this.props;

        const {
            value, 
            placeholderShown, 
            matchesPattern, 
            focused} = this.state;

        if (this.context.mode === "working") {
            //the width of the input is set to the text length of the value if it is longer than the length of the placeholder
            //this is so that the minimum length of the input is always the length of the placeholder
            let elementLength = value.length >= placeholder.length ? value.length : placeholder.length;

            let showIcon;
            if (icon === "valid") {
                showIcon = matchesPattern && !placeholderShown;
            } else if (icon === "delete") {
                showIcon = true;
            } else {
                showIcon = false;
            }
            
            return(
                <InputWrapper 
                        fontSize={fontSize}                      //the font size of the element
                        len={elementLength}                      //the width of the input text
                        focused={focused}                        //whether or not the element is focused
                        leaveSpaceForIcon={icon !== "none"}      //whether or not the input should leave room for the validity marker       
                        addLip={addLip}                          //whether or not to add extra pixels at end
                        >

                    <Input
                        id={this.id}
                        len={elementLength}   
                        allowMultipleLines={allowMultipleLines}  //the width of the input text
                        role='textbox'                           //WAI-ARIA role stating that this object is a textbox
                        inputMode={inputType}                    //sets the keyboard mode of the input
                        contentEditable                          //makes the span editable
                        suppressContentEditableWarning="true"    //suppresses a warning about the content being editable
                        onInput={this.onInputChange}             //function to call when user types into input
                        onKeyDown={this.onKeyDown}               //function to call when user presses down a key
                        onFocus={this.onFocus}                   //function to call when user focuses on the input
                        onBlur={this.onBlur}                     //function to call when user unfocuses on the input
                        onPaste={this.onPaste}                   //function to call when user pastes text into the input
                        />

                    <Placeholder className="label">
                        {placeholderShown ? placeholder.replace(/ /g, '\u00a0') : ''}
                    </Placeholder>

                    {showIcon  ? 
                        <Icon 
                            iconWidth={fontSize} 
                            distance={elementLength} 
                            type={icon} 
                            onClick={onIconClick}/> : <div></div>}

                    {!matchesPattern && focused && !placeholderShown ? 
                        <InvalidMessageDisplay offset={fontSize}>
                            <img src={ErrorIcon} alt="error"/>
                            {invalidMessage}
                        </InvalidMessageDisplay> : <div></div>}
                </InputWrapper>
            );
        } else {
            return <PreviewText fontSize={fontSize} text={value} placeholder={placeholder} />
        }
    }

}

//default props, described at AutosizeInput constructor
AutosizeInput.defaultProps = {
    inputType: 'text',
    placeholder: '',
    fontSize: 1,
    initialValue: "",
    characterLimit: 500,
    pattern: /[\s\S]*/,
    icon: "none",
    invalidMessage: "Input is not valid",
    addLip: true,
    allowMultipleLines: false
}

AutosizeInput.contextType = ModeContext;

export default AutosizeInput;