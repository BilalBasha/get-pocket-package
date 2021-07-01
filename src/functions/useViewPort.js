import React, { useContext } from 'react';
import { ViewPortContext } from './ViewPortProvider';

const useViewport = () => {
    const viewContext = useContext(ViewPortContext);
    const width = viewContext.width;
    const height = viewContext.height; // if we're in-browser and width/height is undefined, likely means that the provider
    // was not added to outer scope.
  
    if (typeof window !== 'undefined' && (width === undefined || height === undefined)) {
      console.warn('a component using the custom `useViewport` hook was missing `ViewPortContext`. Make sure your app or feature is wrapped in a `<ViewportProvider>` instance.');
    }
  
    return {
      width: width,
      height: height
    };
};

export default useViewport;