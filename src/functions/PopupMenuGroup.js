import React from 'react';

const PopupMenuGroup = ({children}) => {
    const groupStyle = "gx34gyr";

    return (
        <li className={groupStyle}>
            <ul>
                {children}
            </ul>
        </li>
    )
}

export default PopupMenuGroup;