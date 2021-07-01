import React from 'react';
import Modal from './Modal';

const Drawer = ({
    children,
    isOpen,
    handleClose,
    appRootSelector,
    screenReaderLabel
}) => {
    const drawerStyles = "dw4vh5s";

    return (
        <Modal appRootSelector={appRootSelector}
            screenReaderLabel={screenReaderLabel}
            handleClose={handleClose}
            isOpen={isOpen}
            className="modal-drawer" // necessary for style override
            overlayClassName="drawer" // necessary for style override
            portalClassName={drawerStyles}
            showCloseButton={false}
            closeTimeoutMS={200}>
            {children}
        </Modal>
    );
}

export default Drawer;