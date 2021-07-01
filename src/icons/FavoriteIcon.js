import React from 'react';
import Icon from '../helpers/Icon';
import Favorite from '../Icons/Favorite';

const FavoriteIcon = (props) => {
    return (
        <Icon {...props}>
            <Favorite></Favorite>
        </Icon>
    )
}

export default FavoriteIcon;