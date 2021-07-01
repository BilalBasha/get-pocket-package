import React, { useState } from 'react';
import classNames from 'classnames';
import { css } from 'linaria';


import useViewport from './useViewPort';
import useCorrectEffect from './useCorrectEffect';
import PageContainer from './PageContainer';
import { screenTinyTablet } from '../responsive/screenSizes';
import GlobalNavMobileMenu from './GlobalNavMobileMenu';
import Logo from './Logo';
import LogoMark from './LogoMark';
import GlobalNavLinks from './GlobalNavLinks';
import GlobalNavTools from './GlobalNavTools';
import GlobalNavAccount from './GlobalNavAccount';
import { breakpointLargeTablet } from '../responsive/breakpoints';
import { headerStyle } from '../styles';
import { linksStyle } from '../styles';
import { toolsStyle } from '../styles';
import { navStyle } from '../styles';

export const GlobalNavV2 = ({
    appRootSelector,
    pocketLogoOutboundUrl,
    selectedLink,
    isLoggedIn,
    isPremium,
    avatarSrc,
    accountName,
    profileUrl,
    onLinkClick,
    onToolClick,
    onAccountClick,
    links,
    tools,
    children
}) => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const viewport = useViewport();
    const viewportWidth = viewport ? viewport.width : screenTinyTablet + 1;

    const checkIsMobile = (viewportWidth <= screenTinyTablet);

    const [isMobile, setIsMobile] = useState(checkIsMobile);

    const handleLinkClick = (linkId, event) => {
        var _event$currentTarget;
    
        if (isMobile) {
          event.preventDefault();
          setIsMobileMenuOpen(true);
          return;
        }
    
        var linkUrl = event === null || event === void 0 ? void 0 : (_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 ? void 0 : _event$currentTarget.href;
        onLinkClick(linkId, linkUrl);
    }

    useCorrectEffect(function () {
        setIsMobile(viewportWidth <= screenTinyTablet);
    }, [viewportWidth]);
    
    return (
        <header className={ classNames(headerStyle, {'logged-in': isLoggedIn}) }>
            <PageContainer className="global-nav-container">
                <nav className={ navStyle }>
                    <div className="site-nav">
                        <GlobalNavMobileMenu
                            appRootSelector={ appRootSelector }
                            links={ links }
                            onLinkClick={ onLinkClick }
                            selectedLink={ selectedLink }
                            toggleClass="hamburger-icon"
                            isOpen={ isMobileMenuOpen }
                            toggleMenuOpen={ setIsMobileMenuOpen }
                        >
                        </GlobalNavMobileMenu>
                        <a id="pocket-logo-nav" className="pocket-logo" href={pocketLogoOutboundUrl} onClick={ () => handleLinkClick('pocket') }>
                            <Logo className="logo"></Logo>
                            { isLoggedIn ? <LogoMark/> : null }
                        </a>
                    </div>
                    {
                        children ? children
                        :
                        <React.Fragment>
                            <div className={linksStyle} aria-label="Page navigation">
                                <GlobalNavLinks selectedLink={selectedLink} className="links" links={links} onLinkClick={onLinkClick}>
                                </GlobalNavLinks>
                                <div className={classNames(toolsStyle, {'is-premium': isPremium})}>
                                </div>
                                <GlobalNavTools tools={tools} onToolClick={onToolClick}>
                                </GlobalNavTools>
                            </div>
                            <GlobalNavAccount appRootSelector={appRootSelector}
                                isPremium={isPremium}
                                isLoggedIn={isLoggedIn}
                                avatarSrc={avatarSrc}
                                accountName={accountName}
                                profileUrl={profileUrl}
                                onLinkClick={onLinkClick}
                                onAccountClick={onAccountClick}>
                            </GlobalNavAccount>
                        </React.Fragment>
                    }
                </nav>
            </PageContainer>

        </header>
    )
}

export default GlobalNavV2;