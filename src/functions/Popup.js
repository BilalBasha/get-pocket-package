import React, { useRef, useState } from 'react';
import { createPopper } from '@popperjs/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import useCorrectEffect from './useCorrectEffect';

var handleClickOutside = function handleClickOutside(event) {};

function handleClickOutsidePointer(event) {
  handleClickOutside(event);
}

const Popup = function Popup({
    children,
    trigger,
    id,
    className,
    animationDuration,
    alwaysRender,
    onOpen,
    onClose,
    popperOptions,
    forceShow
}) {
    const popupStyle = "p1is21nw";
    let popper, animationTimeout;
    const globalEvents = ['click', 'touch', 'focus'];
    
    const [isShowRequested, setIsShowRequested] = useState(forceShow);
    const [isShown, setIsShown] = useState(forceShow);
    const [isAnimationApplied, setIsAnimationApplied] = useState(forceShow);

    const contentRef = useRef(null);
  
    const createPopper$1 = () => {
      if (!popper) {
        popper = createPopper(trigger.current, contentRef.current, popperOptions);
      }
    }
  
    const destroyPopper = () => {
      if (popper) {
        popper.destroy();
        popper = null;
      }
    }
    /**
     * Remove Document Listeners
     * We remove listeners on multiple events. This just allows it to
     * reusable throughout our function
     */
  
  
    const removeDocumentListeners = () => {
      if (global && global.document) {
        globalEvents.forEach(function (event) {
          return global.document.removeEventListener(event, handleClickOutsidePointer);
        });
        global.removeEventListener('blur', handleWindowBlur);
      }
    }
    /**
     * Add Document Listeners
     * We add listeners to multiple events. This just allows it to
     * reusable throughout our function
     */
  
  
    const addDocumentListeners = () =>  {
      if (global && global.document) {
        globalEvents.forEach(function (event) {
          return global.document.addEventListener(event, handleClickOutsidePointer);
        });
        global.addEventListener('blur', handleWindowBlur);
      }
    }
    /**
     * Handle Click Outside is a check to make sure we are not blocking clicks
     * on the actual popup or trigger.  It also allows for `persistOnClick` if it
     * is set on the options. If this is set, the user must dismiss the
     * popover by clicking outside or by explicitly clicking a close button
     *
     * Note: this function gets redefined to an outer scope variable because of
     * pointer/scope issues with global event listener adding & removing, and React
     * functional components. See notes above definition of handleClickOutsidePointer
     * @param {object} event Click event passed though from the listener
     */
  
  
    const handleClickOutside = (event) => {
      var _trigger$current, _contentRef$current;
  
      if (!forceShow && !((_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : _trigger$current.contains(event.target)) && !((_contentRef$current = contentRef.current) === null || _contentRef$current === void 0 ? void 0 : _contentRef$current.contains(event.target))) {
        setIsShowRequested(false);
      }
    };
    /**
     * Handle Trigger Click is the handler for toggling the popup.
     * @param {object} event Click event passed though from the listener
     */
  
  
    const handleTriggerClick = (event) => {
      if (!forceShow) setIsShowRequested(function (prevShown) {
        return !prevShown;
      });
    }
    /**
     * Called when the window blurs via tabbing outside of the page and into browser
     * UI elements, or when window loses focus
     */
  
  
    function handleWindowBlur(event) {
      if (!forceShow) setIsShowRequested(false);
    } // Use Effect to create/set up popup on component mount
  
  
    useCorrectEffect(function () {
      if (!contentRef.current || !trigger.current) return; // attach click event to trigger
  
      var triggerElement = trigger.current;
      triggerElement.addEventListener('click', handleTriggerClick);
      return function () {
        triggerElement.removeEventListener('click', handleTriggerClick);
        removeDocumentListeners();
        clearTimeout(animationTimeout);
        destroyPopper();
      };
    }, []); // watch for state change to isShowRequested. This represents when the user
    // has clicked on the trigger to open or close the popup.
  
    useCorrectEffect(function () {
      if (isShowRequested) {
        createPopper$1();
        addDocumentListeners();
        setIsShown(true);
        onOpen(id);
      } else {
        removeDocumentListeners();
        setIsAnimationApplied(false);
        onClose(id);
        animationTimeout = setTimeout(function () {
          setIsShown(false);
        }, animationDuration);
      }
    }, [isShowRequested]); // state changes to whether the popup is actually visible or not, accounting
    // for animations
  
    useCorrectEffect(function () {
      if (isShown) {
        setIsAnimationApplied(true);
      }
    }, [isShown]);

    return (
      <div ref={contentRef} className={classNames(popupStyle, className)}>
        { alwaysRender || isShowRequested || isShown
          ?
          <div className={ classNames('popup-content', {enter: isShown, 'animate-to': isAnimationApplied}) }>
            { children }
          </div> 
          : 
          null }
      </div>
    )
  };
  
  Popup.propTypes = {
    /**
     * Content to put within the popup.
     */
    children: PropTypes.node.isRequired,
  
    /**
     * Ref for the element or React node that will serve as the clickable trigger
     * for toggling the popup
     */
    trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  
    /**
     * Provide an id if desired, for test markers or analytics.
     */
    id: PropTypes.string,
  
    /**
     * CSS class name that can be provided to override styles as well as animations
     * (using the animation selector class ('animate-to'))
     */
    className: PropTypes.string,
  
    /**
     * Animation duration in milliseconds that corresponds to any CSS transition
     * animations that will be applied. Necessary so that we don't remove the
     * animation classes and hide the popup until the animation is complete.
     */
    animationDuration: PropTypes.number,
  
    /**
     * When true, popper will remain rendered even when hidden. This would serve
     * SEO purposes to ensure hidden content is still available for crawlers, e.g.
     * navigational menu content. If content does not need to be available for SEO
     * and page weight/performance is a concern, set this to false.
     */
    alwaysRender: PropTypes.bool,
  
    /**
     * Called when the popup opens. Can be used for e.g. analytics tracking.
     */
    onOpen: PropTypes.func,
  
    /**
     * Called when the popup closes. Can be used for e.g. analytics tracking.
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
Popup.defaultProps = {
  id: '',
  className: '',
  animationDuration: 75,
  alwaysRender: true,
  onOpen: function onOpen(id) {},
  onClose: function onClose(id) {},
  popperOptions: {
    placement: 'bottom-start'
  },
  forceShow: false
};

export default Popup;


// var eventListeners = {
//   name: 'eventListeners',
//   enabled: true,
//   phase: 'write',
//   fn: function fn() {},
//   effect: effect,
//   data: {}
// };
// function popperOffsets({ state, name }) {
//   // Offsets are the actual position the popper needs to have to be
//   // properly positioned near its reference element
//   // This is the most basic placement, and will be adjusted by
//   // the modifiers in the next step
//   state.modifiersData[name] = computeOffsets({
//     reference: state.rects.reference,
//     element: state.rects.popper,
//     strategy: 'absolute',
//     placement: state.placement
//   });
// } // eslint-disable-next-line import/no-unused-modules

// var popperOffsets$1 = {
//   name: 'popperOffsets',
//   enabled: true,
//   phase: 'read',
//   fn: popperOffsets,
//   data: {}
// };

// function computeStyles({ state, options }) {
//   var _options$gpuAccelerat = options.gpuAcceleration,
//       gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
//       _options$adaptive = options.adaptive,
//       adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

//   if (process.env.NODE_ENV !== "production") {
//     var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || '';

//     if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
//       return transitionProperty.indexOf(property) >= 0;
//     })) {
//       console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
//     }
//   }

//   var commonStyles = {
//     placement: getBasePlacement(state.placement),
//     popper: state.elements.popper,
//     popperRect: state.rects.popper,
//     gpuAcceleration: gpuAcceleration
//   };

//   if (state.modifiersData.popperOffsets != null) {
//     state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
//       offsets: state.modifiersData.popperOffsets,
//       position: state.options.strategy,
//       adaptive: adaptive
//     })));
//   }

//   if (state.modifiersData.arrow != null) {
//     state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
//       offsets: state.modifiersData.arrow,
//       position: 'absolute',
//       adaptive: false
//     })));
//   }

//   state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
//     'data-popper-placement': state.placement
//   });
// } // eslint-disable-next-line import/no-unused-modules

// var computeStyles$1 = {
//   name: 'computeStyles',
//   enabled: true,
//   phase: 'beforeWrite',
//   fn: computeStyles,
//   data: {}
// };

// var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
// var createPopper = /*#__PURE__*/popperGenerator({
//   defaultModifiers: defaultModifiers
// }); // eslint-disable-next-line import/no-unused-modules
