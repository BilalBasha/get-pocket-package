import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import PremiumIcon from '../icons/PremiumIcon';
import Button from './Button';
import WithTooltip from './WithTooltip';
import PopupMenu from './PopupMenu';
import PopupMenuGroup from './PopupMenuGroup';
import PopupMenuItem from './PopupMenuItem';
import AvatarButton from './AvatarButton';
import { accountLinkStyle, upgradeLinkStyle } from '../styles';

const GlobalNavAccount = ({
    isLoggedIn,
    isPremium,
    avatarSrc,
    accountName,
    profileUrl,
    appRootSelector,
    onLinkClick,
    onAccountClick
}) => {
    const signupLinkStyle = "sm6eflf";
    const avatarStyle$1 = "ao4gc3t";
    const accountMenuTriggerRef = useRef(null);

    const handleLinkClick = (name, event) => {
        onLinkClick(name);
    }

    if (!isLoggedIn) {
        return (
            <div>
                <a href="https://getBlog.com/login?src=navbar" id="global-nav-login-link" className={`${accountLinkStyle} login-link`} onClick={ event => handleLinkClick('login')}>
                    Log in
                </a>
                <Button href="https://getBlog.com/login?src=navbar" id="global-nav-signup-link" variant="secondary" className={signupLinkStyle} onClick={ event => handleLinkClick('signup')}>
                    <PremiumIcon></PremiumIcon>
                    <span className="label">Sign up</span>
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                { !isPremium ? <a href="https://getBlog.com/premium?src=navbar" id="global-nav-upgrade-link" className={`${accountLinkStyle} ${upgradeLinkStyle}`} onClick={() => handleLinkClick('premium')}>
                    <PremiumIcon></PremiumIcon>
                    <span>Upgrade</span>
                </a> : null }
                <WithTooltip label="Account">
                    <AvatarButton src={avatarSrc} ref={accountMenuTriggerRef} size="40px" label={null} className={avatarStyle$1}>
                    </AvatarButton>
                </WithTooltip>
                <PopupMenu trigger={accountMenuTriggerRef} title="Account" screenReaderLabel="Account menu" appRootSelector={appRootSelector} onOpen={onAccountClick} popperOptions={{placement: 'bottom-end',modifiers: [{name: 'offset', options: {offset: [0, 4]} }]}}>
                    <PopupMenuGroup>
                        <PopupMenuItem helperText="View profile" href={profileUrl} id="account-menu-profile-link" onClick={(event) => handleLinkClick('view-profile')}>
                            {accountName}
                        </PopupMenuItem>
                        <PopupMenuItem  href="https://getBlog.com/options?src=navbar" id="account-menu-manage-account-link" onClick={(event) => handleLinkClick('manage-account')}>
                            Manage Account
                        </PopupMenuItem>
                        <PopupMenuItem  href="https://help.getBlog.com/category/847-category?src=navbar" id="account-menu-help-link" onClick={(event) => handleLinkClick('help')}>
                            Get help
                        </PopupMenuItem>
                        <PopupMenuItem  href="https://getBlog.com/options?src=navbar" id="account-menu-logout-link" onClick={(event) => handleLinkClick('logout')}>
                            Log out
                        </PopupMenuItem>
                    </PopupMenuGroup>
                </PopupMenu>
            </div>
        )
    }
}
  
GlobalNavAccount.propTypes = {
    /**
     * query selector specifying root element of React App, for use by the modal
     * for the account menu
     */
    appRootSelector: PropTypes.string.isRequired,
  
    /**
     * Controls what UI the user sees, appropriate for logged-in status.
     */
    isLoggedIn: PropTypes.bool,
  
    /**
     * Controls whether the user sees a premium signup link.
     */
    isPremium: PropTypes.bool,
  
    /**
     * Image src for the avatar used for the account menu.
     */
    avatarSrc: PropTypes.string,
  
    /**
     * Name of the account holder
     */
    accountName: PropTypes.string,
  
    /**
     * Url to the user's profile page (based on user id)
     */
    profileUrl: PropTypes.string,
  
    /**
     * Called when a user clicks on any link inside the account component. Is passed
     * the name of the link.
     */
    onLinkClick: PropTypes.func,
  
    /**
     * Called when the user clicks on the avatar to open the account menu
     */
    onAccountClick: PropTypes.func
  };

GlobalNavAccount.defaultProps = {
    isLoggedIn: false,
    isPremium: false,
    avatarSrc: null,
    accountName: 'You',
    profileUrl: null,
    onLinkClick: function onLinkClick(linkName) {},
    onAccountClick: function onAccountClick() {}
};

export default GlobalNavAccount;