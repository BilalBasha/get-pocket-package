import React from 'react';
import Icon from '../helpers/Icon';
import OverflowMenu from '../Icons/OverflowMenu';

const PinIcon = (props) => {
    return (
        <Icon {...props}>
            <OverflowMenu></OverflowMenu>
        </Icon>
    )
}

export default PinIcon;