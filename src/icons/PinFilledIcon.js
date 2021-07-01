import React from 'react';
import Icon from '../helpers/Icon';
import OverflowMenu from '../Icons/OverflowMenu';

const PinFilledIcon = (props) => {
    return (
        <Icon {...props}>
            <OverflowMenu></OverflowMenu>
        </Icon>
    )
}

export default PinFilledIcon;