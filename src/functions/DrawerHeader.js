import React from 'react';

import Button from './Button';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';

const DrawerHeader = ({ handleClose }) => {
    const drawerHeaderStyles = "dtc40ar";
    const iconStyle$1 = "i1pibbob";
    
    return (
        <div className={drawerHeaderStyles}>
            <Button onClick={handleClose} variant="inline" className={iconStyle$1}>
                <ChevronLeftIcon id="mobile-menu-chevron-icon" title="Close" description="Close the Pocket mobile menu"></ChevronLeftIcon>
            </Button>
        </div>
    )
}

export default DrawerHeader;