import React from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import objectWithoutProperties from "../helpers/objectWithOutProperties";

const Pill = (props) => {
    const { children, promoted, href, className } = props;
    const remaining = objectWithoutProperties(_ref, ["children", "promoted", "href", "className"]);

    const elementProps = {
        className: classNames(pillStyle, className, {
            promoted: promoted
        }),
        href: href,
        ...remaining
    };
  
    if (href) {
        return (
            <a {...elementProps}>
                { children }
            </a>
        )
    } else {
        return (
            <button {...elementProps}>
                { children }
            </button>
        )
    }
};
  
Pill.propTypes = {
    /**
     * Content of the button (e.g. button label)
     */
    children: PropTypes.node.isRequired,
  
    /**
     * If true, will apply a visual style that differentiates the pill from the others.
     */
    promoted: PropTypes.bool,
  
    /**
     * Destination url for the button - if provided, will render the button as
     * an anchor styled like a button
     */
    href: PropTypes.string,
  
    /**
     * CSS class name if styles need to be provided/overridden.
     */
    className: PropTypes.string
};

Pill.defaultProps = {
    promoted: false,
    href: undefined,
    className: null
};

export default Pill;