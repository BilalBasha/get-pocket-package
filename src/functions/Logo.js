import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { logoLabelStyle, logoStyle } from '../styles/logoStyle';

const Logo = ({ className }) => {

    return (
        <div className={ classNames(logoStyle, className) }>
            <span className={ logoLabelStyle }>Pocket</span>
        </div>
    );
};
  
Logo.propTypes = {
    className: PropTypes.string
};
Logo.defaultProps = {
    className: ''
};

export default Logo;