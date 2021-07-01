import React from 'react';
import { cx } from 'linaria';
import PropTypes from 'prop-types';

const WithTooltip = ({
    children,
    label,
    isBlockLevel,
    placement,
    delay
}) => {

    const tooltipStyles = "t1221eea";
    const placementBottom = "pzhe358";
    const placementTop = "pmdugmx";
    const delayStyle = "d1ihjjkq";
 
    if (typeof placement === 'undefined') {
        placement = 'bottom';
    }
    if (typeof delay === 'undefined') {
        delay = false;
    }

    const placementStyle = placement === 'bottom' ? placementBottom : placementTop;
    const tipStyle = cx(tooltipStyles, placementStyle, delay && delayStyle);

    return (
        isBlockLevel
        ? (
            <div className={tipStyle} aria-label={label} tooltip={label}>
                {children}
            </div>
        ) : (
            <span className={tipStyle} aria-label={label} tooltip={label}>
                {children}
            </span>
        )
    );
}

WithTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired
};

export default WithTooltip;