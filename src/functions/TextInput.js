import React from 'react';
import PropTypes from 'prop-types';

import testIdAttribute from '../testIdAttribute';
import InputWrapper from './InputWrapper';

const TextInput = ({
    name,
    labelText,
    helperText,
    value,
    error,
    displayErrorInline,
    className,
    disabled,
    onChange,
    onFocus,
    onBlur,
    inputStyles
}) => {

    return (
        <InputWrapper
            labelText = {labelText}
            helperText = {helperText}
            error = {error}
            displayErrorInline = {displayErrorInline}
            className = {className}
            disabled = {disabled}
            name = {name}
            value = {value}
        >
            <input
                type="text"
                name = {name}
                value = {value}
                disabled = {disabled}
                onChange = {onChange}
                onFocus = {onFocus}
                onBlur = {onBlur}
                className={inputStyles}
                {...testIdAttribute('text-input')}
            >
            </input>
        </InputWrapper>
    )
};
  
  TextInput.propTypes = {
    /**
     * Name attribute to use with the text input
     */
    name: PropTypes.string.isRequired,
  
    /**
     * Label for the input. Required for accessibility purposes.
     */
    labelText: PropTypes.string.isRequired,
  
    /**
     * Helper text to display below the text input
     */
    helperText: PropTypes.string,
  
    /**
     * Current value of the input. Should be controlled by state in the parent form.
     */
    value: PropTypes.string,
  
    /**
     * If truthy, will apply an error visual state to the input. Pass a string value
     * to display as an error message below the input, which will take precedence
     * over any helperText.
     */
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  
    /**
     * Set to true to have the error message display inline below the text input, meaning
     * that it will take space in the layout and push other content below it, when
     * it appears.
     */
    displayErrorInline: PropTypes.bool,
  
    /**
     * CSS class name to apply to the containing div
     */
    className: PropTypes.string,
  
    /**
     * If true, will apply a disabled visual state and the input will not allow
     * user interaction.
     */
    disabled: PropTypes.bool,
  
    /**
     * Called when the input value changes
     */
    onChange: PropTypes.func,
  
    /**
     * Called when the user focuses the input
     */
    onFocus: PropTypes.func,
  
    /**
     * Called when the user blurs the input
     */
    onBlur: PropTypes.func
};

TextInput.defaultProps = {
    helperText: null,
    value: '',
    error: null,
    displayErrorInline: false,
    className: null,
    disabled: false,
    onChange: function onChange() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {}
};

export default TextInput;