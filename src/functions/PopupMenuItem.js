import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const PopupMenuItem = ({
    children,
    id,
    helperText,
    className,
    href,
    icon
}) => {
    const itemStyle = "iv7u18i";

    const getContent = () => {
        return (
            <React.Fragment>
                { icon }
                <span className="label">
                    { children }
                    { helperText ? <span className="label-secondary">{helperText}</span> : null }
                </span>
            </React.Fragment>
        )
    }

    return (
        <li className={classNames(itemStyle, className)}>
            { href ? <a href={href} id={id}> {getContent()} </a> : <button type="button" id={id}> {getContent()} </button>}
        </li>
    )

}

PopupMenuItem.propTypes = {
    /**
     * Will render the child as the text of a button/link.
     */
    children: PropTypes.node.isRequired,
  
    /**
     * Provide an id if menu item needs to be identified on the page, e.g.
     * during tests or analytics calls
     */
    id: PropTypes.string,
  
    /**
     * Text to be displayed below the primary label.
     */
    helperText: PropTypes.string,
  
    /**
     * CSS class to apply to the list item if needed to override styles for that
     * specific item.
     */
    className: PropTypes.string,
  
    /**
     * If the menu item should be a hyperlink, provide an href and it will be
     * rendered as an anchor rather than a button.
     */
    href: PropTypes.string,
  
    /**
     * Provide a JSX icon in order to display an icon before the text.
     */
    icon: PropTypes.node
};

PopupMenuItem.defaultProps = {
    helperText: null,
    className: '',
    href: null,
    icon: null
};

export default PopupMenuItem