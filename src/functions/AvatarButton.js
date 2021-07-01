import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const AvatarButton = React.forwardRef(({
    id,
    size,
    label,
    src,
    onClick,
    className
}) => {

    const buttonStyles$1 = "b1344aws";
    

    return (
        <button type="button" className={classNames(buttonStyles$1, className)} title={label} onClick={onClick}>
            <Avatar size={size} src={src} altText={label}></Avatar>
        </button>
    )
});

AvatarButton.propTypes = {
    /**
     * Width/height of the avatar. Since the avatar will be square, this value is
     * both width and height.
     */
    size: PropTypes.string.isRequired,
  
    /**
     * Alt text to include as the button label of the Avatar for non-sighted users
     */
    label: PropTypes.string,
  
    /**
     * Provide an id if you have multiple instances per page and need unique
     * identifiers for tests.
     */
    id: PropTypes.string,
  
    /**
     * The src/url for the avatar image
     */
    src: PropTypes.string,
  
    /**
     * Callback called when the button is clicked.
     */
    onClick: PropTypes.func,
  
    /**
     * Classname to be applied to the outer node that can be used to override
     * or supplement styles.
     */
    className: PropTypes.string
};

AvatarButton.defaultProps = {
    label: '',
    id: '',
    src: null,
    onClick: function onClick() {},
    className: null
};

export default AvatarButton;