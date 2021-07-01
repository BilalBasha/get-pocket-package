import React from 'react';
import PropTypes from 'prop-types';
import { pageContainerStyle } from '../styles';

const PageContainer = ({ children, className }) => {

    return (
        <div className={`${pageContainerStyle} ${className}`}>
            { children }
        </div>
    );
}

PageContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

PageContainer.defaultProps = {
    children: null,
    className: ''
}

export default PageContainer;