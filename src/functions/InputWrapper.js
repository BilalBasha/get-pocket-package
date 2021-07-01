import React from 'react';
import classNames from 'classnames';

import testIdAttribute from '../testIdAttribute';

const InputWrapper = ({
    labelText,
    helperText,
    error,
    displayErrorInline,
    className,
    disabled,
    value,
    name,
    showCharacterLimit,
    characterLimit,
    children
}) => {

    const inputWrapper = "i1kkg3pa";
    const helperTextStyle = "h4j4419";
    const errorMessageStyle = "ef125g2";

    const characterCount = value === null || value === void 0 ? void 0 : value.length;
    const characterCountLabel = "".concat(characterCount, "/").concat(characterLimit);
    const characterLimitError = characterCount > characterLimit ? 'Character Limit Exceeded' : null;
    const errorWithLengthCheck = error || characterLimitError || null;

    return (
        <div className={classNames(inputWrapper, className, {
            invalid: !!errorWithLengthCheck,
            disabled: disabled
            })}
            {...testIdAttribute('email-input')}
        >
            { children }
            <span className={classNames('label-wrapper', {'has-value': !!value})}>
                <label htmlFor={name} {...testIdAttribute('input-label')}>
                    { labelText }
                </label>
            </span>
            {(helperText || showCharacterLimit) && !errorWithLengthCheck
                ?
                <span className={helperTextStyle} {...testIdAttribute('helper-text')}>
                    { showCharacterLimit ? characterCountLabel : helperText }
                </span>
                :
                null
            }
            {errorWithLengthCheck && typeof errorWithLengthCheck === 'string'
                ?
                <span className={classNames(helperTextStyle, errorMessageStyle, {
                    'inline-error': displayErrorInline
                })}
                {...testIdAttribute('error-text')}>
                    { errorWithLengthCheck }
                </span>
                :
                null
            }
        </div>
    )
};

export default InputWrapper;