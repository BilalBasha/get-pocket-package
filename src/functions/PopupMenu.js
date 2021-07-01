import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { screenLargeHandset } from '../responsive/screenSizes';
import useCorrectEffect from './useCorrectEffect';
import useViewport from './useViewPort';
import Modal from './Modal';
import Popup from './Popup';

const PopupMenu = ({
    children,
    id,
    title,
    trigger,
    appRootSelector,
    screenReaderLabel,
    onOpen,
    onClose,
    popperOptions,
    forceShow
}) => {

    const popupStyle$1 = "psmbvm8";
    const menuStyle = "m158lzzu";

    const viewport = useViewport(); // if viewport not available, we're probably SSR and so set the default to the
    const viewportWidth = viewport ? viewport.width : screenLargeHandset + 1;

    const checkIsMobile = viewportWidth <= screenLargeHandset;

    const [isMenuOpen, setIsMenuOpen] = useState(forceShow);
    const [isMobile, setIsMobile] = useState(checkIsMobile);

    const handleTriggerClick = () => setIsMenuOpen(!isMenuOpen);

    const handleModalClose = () => {
        if (!forceShow)
            setIsMenuOpen(false);
    }

    useCorrectEffect( () => {
        if (!trigger.current) return; // attach click event to trigger
        const triggerElement = trigger.current;
        triggerElement.addEventListener('click', handleTriggerClick);
        return function () {
          triggerElement.removeEventListener('click', handleTriggerClick);
        };
      }, []); // effect for handling open/close events (callbacks)

    useCorrectEffect( () => {
        if (isMenuOpen)
            onOpen(id);
        else
            onClose(id);
    }, [isMenuOpen]) // effect for handling window resize

      
    useCorrectEffect(function () {
        setIsMobile(viewportWidth <= screenLargeHandset);
    }, [viewportWidth]);

    const getContent = () => {
        return (
            <ul id={id} className={ classNames(menuStyle, { 'is-mobile': isMobile }) }>
                { children }
            </ul>
        )
    }
    let renderHtml;
    if (isMobile) {
        renderHtml = <Modal title={title} appRootSelector={appRootSelector} screenReaderLabel={screenReaderLabel} handleClose={handleModalClose} isOpen={isMenuOpen} forceMobile="true">
            { getContent() }
        </Modal>
    } else {
        renderHtml = <Popup trigger={trigger} className={popupStyle$1} popperOptions={popperOptions} forceShow={forceShow} onClose={handleModalClose}>
            { getContent() }
        </Popup>
    }
    return renderHtml;

}

PopupMenu.propTypes = {
    /**
     * Content for the menu. Use <PopupMenuGroup> and <PopupMenuItem> to assemble
     * the content of the menu.
     */
    children: PropTypes.node.isRequired,
  
    /**
     * Ref for the element or React node that will serve as the clickable trigger
     * for toggling the popup
     */
    trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  
    /**
     * Title of the menu, required for providing context to the user in the mobile
     * mode of the menu, in the header.
     */
    title: PropTypes.string.isRequired,
  
    /**
     * query selector specifying root element of React App
     */
    appRootSelector: PropTypes.string.isRequired,
  
    /**
     * String indicating how the content container should be announced
     to screen readers
     */
    screenReaderLabel: PropTypes.string.isRequired,
  
    /**
     * Provide an id if menu needs to be identified on the page, e.g.
     * during tests or analytics calls
     */
    id: PropTypes.string,
  
    /**
     * Called when the menu opens.
     */
    onOpen: PropTypes.func,
  
    /**
     * Called when the menu closes.
     */
    onClose: PropTypes.func,
  
    /**
     * Options object per the popperJS API that will be passed in when creating the
     * popperJS instance. See: https://popper.js.org/docs/v2/constructors/
     */
    popperOptions: PropTypes.object,
  
    /**
     * Set to true to have the popup shown. Mostly intended for debugging purposes
     * so that the popup stays open rather than closing on outside click.
     */
    forceShow: PropTypes.bool
};

PopupMenu.defaultProps = {
    id: '',
    onOpen: function onOpen(id) {},
    onClose: function onClose(id) {},
    forceShow: false
};

export default PopupMenu;