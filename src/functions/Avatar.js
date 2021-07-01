import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import ProfileIcon from '../icons/ProfileIcon';
import { avatarStyle, defaultStyle, imageStyle } from '../styles/avatarStyle';

const Avatar = ({
    id,
    src,
    altText,
    size,
    className
}) => {

    const avatarStyleVariables = {
      width: size,
      height: size
    };

    return (
        <span className={classNames(avatarStyle, { 'with-image': !!src, default: !src}, className)} style={avatarStyleVariables}>
            { src ? <img src={src} alt={altText} className={imageStyle}/> : <ProfileIcon className={defaultStyle}></ProfileIcon> }
        </span>
    )
}
  
Avatar.propTypes = {
    /**
     * Width/height of the avatar, in px or % (or other css string value). Since the
     * avatar will be square, this value is both width and height.
     */
    size: PropTypes.string.isRequired,
  
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
     * Alt text to include as a description of the Avatar for non-sighted users
     */
    altText: PropTypes.string,
  
    /**
     * Classname to be applied to the outer node that can be used to override
     * or supplement styles.
     */
    className: PropTypes.string
};

Avatar.defaultProps = {
    id: '',
    src: null,
    altText: 'Your avatar'
};

export default Avatar;