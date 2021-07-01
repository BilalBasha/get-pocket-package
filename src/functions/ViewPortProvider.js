import React, { createContext, useContext, useEffect, useState } from 'react';
import _ from 'lodash';

const ViewPortContext = createContext({});

const ViewPortProvider = ({ children }) => {

    const setInitialHeight = global.innerHeight;
    const setInitialWidth = global.innerWidth;

    const [width, setWidth] = useState(setInitialWidth);
    const [height, setHeight] = useState(setInitialHeight);

    const handleWindowResize = () => {
        setWidth(global.innerWidth);
        setHeight(global.innerHeight);
    }
    
    var handleDebouncedWindowResize = _.debounce(handleWindowResize, 100);
    useEffect(() => {
        if (global && global.removeEventListener){
            global.removeEventListener('resize', handleDebouncedWindowResize);
        }
        if (global && global.addEventListener) {
            global.addEventListener('resize', handleDebouncedWindowResize);
        }
    }, [handleDebouncedWindowResize]); // store the width/height values in the value of the Provider */

    const value = {
        width,
        height
    };

    return (
        <ViewPortContext.Provider value={value}>
            { children }
        </ViewPortContext.Provider>
    );
}

export {
    ViewPortContext,
    ViewPortProvider
};