import React from 'react';
import PropTypes from 'prop-types';
import { cx } from 'linaria';
import { listStyle } from '../styles';

const GlobalNavLinks = ({ 
    links,
    selectedLink,
    onLinkClick,
    className
}) => {

    const handleClick = (event, linkName, linkUrl) => {
        onLinkClick(linkName, linkUrl);
    }

    return (
        <ul className={cx(listStyle, className)}>
            { links.map( (link) => {
                const isSelected = link.name === selectedLink;
                return <li key={`global-nav-link-${link.name}`} >
                    <a id={link.id} className={isSelected ? 'selected' : ''} href={link.url} onClick={ (event) => handleClick(event, link.name, link.url)}>
                        { link.label }
                    </a>
                </li>
            })}
        </ul>
    )

}
  
GlobalNavLinks.propTypes = {
    /**
     * Links to display. Accepted as a prop so that links can be customized per page
     * context via the GlobalNav parent. Each link should have a name (id), label
     * (for display), and url. Each link will be rendered as an anchor in a list.
     */
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      url: PropTypes.string
    })),
  
    /**
     * Name of a link that is selected, if any. Should match the name of one of the
     * links passed in with props. If a link matches this name, it will have an
     * "selected" style applied.
     */
    selectedLink: PropTypes.string,
  
    /**
     * Callback function called when any link is clicked. Gets passed the name and
     * url of that link.
     */
    onLinkClick: PropTypes.func
};

GlobalNavLinks.defaultProps = {
    links: [{
      name: 'discover',
      id: 'discover',
      label: 'Discover',
      url: 'https://getBlog.com/explore?src=navbar'
    }, {
      name: 'my-list',
      id: 'my-list',
      label: 'My List',
      url: 'https://getBlog.com/my-list?src=navbar'
    }],
    selectedLink: null,
    onLinkClick: function onLinkClick(event, linkName, linkUrl) {}
};

export default GlobalNavLinks;