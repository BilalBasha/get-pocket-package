import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

import Button from './Button';
import MenuIcon from "../icons/MenuIcon";
import Drawer from "./Drawer";
import DrawerHeader from "./DrawerHeader";
import DiscoverIcon from '../icons/DiscoverIcon';
import ListViewIcon from '../icons/ListViewIcon';

const GlobalNavMobileMenu = ({
    links,
    selectedLink,
    onLinkClick,
    isUserLoggedIn,
    isUserPremium,
    onOpen,
    onClosed,
    appRootSelector,
    isOpen,
    toggleMenuOpen,
    toggleClass
}) => {

    const iconStyle$1 = "i1pibbob";

    const handleClick = (event, linkName, linkUrl) => {
        onLinkClick(linkName, linkUrl);
    }
    
    const handleClose = () => {
        onClosed();
        toggleMenuOpen(false);
    };
    
    const handleOpen = () => {
        onOpen();
        toggleMenuOpen(true);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant="inline" className={classNames(iconStyle$1, toggleClass)}>
                <MenuIcon id="mobile-menu-menu-icon" title="Open" description="Open the Pocket mobile menu"></MenuIcon>
            </Button>
            <Drawer appRootSelector={appRootSelector} isOpen={isOpen} handleClose={handleClose} screenReaderLabel="Pocket Mobile Menu">
                <DrawerHeader handleClose={handleClose}>
                </DrawerHeader>
                {/* <Menu$1 links={links} selectedLink={selectedLink} handleClick={handleClick} isUserPremium={isUserPremium} isUserLoggedIn={isUserLoggedIn}>
                </Menu$1> */}
            </Drawer>
        </React.Fragment>
    )
}


GlobalNavMobileMenu.propTypes = {
    /**
     * query selector specifying root element of React App (e.g. '#root'). This is
     * where the Drawer markup will be injected.
     */
    appRootSelector: PropTypes.string.isRequired,
  
    /**
     * Links to display. Accepted as a prop so that links can be customized per page
     * context via the GlobalNav parent. Each link should have a name (id), label
     * (for display), and url. Each link will be rendered as an MobileLink in a menu.
     */
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
      icon: PropTypes.node
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
    onLinkClick: PropTypes.func,
  
    /**
     * Callback function called when the mobile menu is opened. Useful for analytics
     */
    onOpen: PropTypes.func,
    toggleMenuOpen: PropTypes.func,
  
    /**
     * Callback function called when the mobile menu is closed. Useful for analytics
     */
    onClosed: PropTypes.func,
  
    /**
     * Boolean indicating whether the user is logged in
     * url of that link.
     */
    isUserLoggedIn: PropTypes.bool,
  
    /**
     * Boolean indicating whether the user is a Premium User
     */
    isUserPremium: PropTypes.bool,
  
    /**
     * Boolean targeting dev users and tests, to provide an initial open state
     * for mobile menu
     */
    forceShow: PropTypes.bool
};

GlobalNavMobileMenu.defaultProps = {
    links: [{
      name: 'discover',
      id: 'global-nav-discover-link',
      label: 'Discover',
      url: 'https://getBlog.com/explore?src=navbar',
      icon: <DiscoverIcon></DiscoverIcon>
    }, {
      name: 'my-list',
      id: 'global-nav-my-list-link',
      label: 'My List',
      url: 'https://getBlog.com/my-list?src=navbar',
      icon: <ListViewIcon></ListViewIcon>
    }],
    selectedLink: null,
    onLinkClick: function onLinkClick(event, linkName, linkUrl) {},
    onOpen: function onOpen() {},
    onClosed: function onClosed() {},
    toggleMenuOpen: function toggleMenuOpen() {},
    isUserLoggedIn: false,
    isUserPremium: false,
    forceShow: false
  };

export default GlobalNavMobileMenu;