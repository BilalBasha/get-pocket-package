import React, { useRef } from 'react';
import { useState } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CrossIcon from '../icons/CrossIcon';
import isIosDevice from './isIosDevice';

var modalStyles = "m1gbisw7";
var overlayStyles = "o1ohlj7h";

var Modal = function Modal({
  title,
  appRootSelector,
  screenReaderLabel,
  isOpen,
  forceMobile,
  handleClose,
  shouldCloseOnOverlayClick,
  onAfterOpen,
  onAfterClose,
  modalContentClassName,
  overlayClassName,
  portalClassName,
  showCloseButton,
  doesAnimateTransition,
  children,
  className,
  closeTimeoutMS
}) {
  // aids in accessibility, http://reactcommunity.org/react-modal/accessibility/
  console.log(appRootSelector);
  ReactModal.setAppElement(appRootSelector);

  const [readyAnimate, setReadyAnimate] = useState(false);

  var modalContentRef = useRef(null);

  return (
    <React.Fragment>
      <ReactModal 
        isOpen={isOpen}
        contentLabel={screenReaderLabel}
        bodyOpenClassName="modal-open"
        onRequestClose={ () => { setReadyAnimate(false); handleClose(); } }
        onAfterOpen={ () => { setReadyAnimate(true); disableBodyScroll(modalContentRef); onAfterOpen(); } }
        onAfterClose={ () => { setReadyAnimate(false); enableBodyScroll(modalContentRef); clearAllBodyScrollLocks(); onAfterClose(); } }
        shouldCloseOnOverlayClick={ shouldCloseOnOverlayClick }
        className={classnames([className, modalStyles, modalContentClassName, {'animation-base': doesAnimateTransition,'animation-show': doesAnimateTransition && readyAnimate && isOpen,'animation-hide': doesAnimateTransition && readyAnimate && !isOpen,'force-mobile': forceMobile}])}
        overlayClassName={classnames([overlayStyles, overlayClassName, {'animation-base': doesAnimateTransition,'animation-show': doesAnimateTransition && readyAnimate && isOpen,'animation-hide': doesAnimateTransition && readyAnimate && !isOpen}])}
        portalClassName={classnames([portalClassName])}
        closeTimeoutMS={closeTimeoutMS}
        >
          { showCloseButton ? <CloseButton></CloseButton> : null}
          {children}
      </ReactModal>
    </React.Fragment>
  )
};

var closeButtonStyles = "c9xoh5";

var CloseButton = function CloseButton(_ref2) {
  var handleClose = _ref2.handleClose;
  return /*#__PURE__*/React.createElement("button", {
    className: closeButtonStyles,
    "aria-label": "Close",
    onClick: handleClose
  }, /*#__PURE__*/React.createElement(CrossIcon, null), /*#__PURE__*/React.createElement("span", {
    className: "visually-hidden"
  }, "Close"));
};

Modal.propTypes = {
  // Pocket Modal Props

  /**
   * title to display in ModalHeader
   */
  title: PropTypes.string,

  /**
   * query selector specifying root element of React App
   */
  appRootSelector: PropTypes.string.isRequired,
  // Exposing React Modal Props

  /**
   * Boolean indicating whether the modal should be open
   */
  isOpen: PropTypes.bool,

  /**
   * Set to true to force the modal into mobile styling.
   */
  forceMobile: PropTypes.bool,

  /**
   * String indicating how the content container should be announced
   to screen readers
   */
  screenReaderLabel: PropTypes.string.isRequired,

  /**
   * Function that will be run when the modal is requested
   to be closed (either by clicking on overlay or pressing ESC).
   Note: It is not called if isOpen is changed by other means.
   */
  handleClose: PropTypes.func.isRequired,

  /**
   * Boolean indicating whether to use a default close button
   */
  showCloseButton: PropTypes.bool,

  /**
   * Boolean indicating whether the modal close when a user clicks
   * on the overlay
   */
  shouldCloseOnOverlayClick: PropTypes.bool,

  /**
   * Function to run after the modal is opened
   */
  onAfterOpen: PropTypes.func,

  /**
   * Function to run after the modal is closed
   */
  onAfterClose: PropTypes.func,

  /**
   * Additional CSS class name to place on the modal content
   */
  modalContentClassName: PropTypes.string,

  /**
   * Additional CSS class name to place on the modal overlay
   */
  overlayClassName: PropTypes.string,

  /**
   * Additional CSS class name to place on the entire portal
   */
  portalClassName: PropTypes.string,

  /**
   * Boolean describing whether the modal should fade in and out
   */
  doesAnimateTransition: PropTypes.bool,

  /**
   * Milliseconds to delay close, useful for outgoing animations
   */
  closeTimeoutMS: PropTypes.number
};
Modal.defaultProps = {
  title: undefined,
  isOpen: false,
  forceMobile: false,
  shouldCloseOnOverlayClick: true,
  onAfterOpen: function onAfterOpen() {},
  onAfterClose: function onAfterClose() {},
  modalContentClassName: '',
  overlayClassName: '',
  portalClassName: '',
  showCloseButton: true,
  doesAnimateTransition: true,
  closeTimeoutMS: 75
};

export default Modal;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var locks = [];
var initialClientY = -1;
var documentListenerAdded = false;
var previousBodyOverflowSetting = void 0;
var previousBodyPaddingRight = void 0;
// returns true if `el` should be allowed to receive touchmove events.
var allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};



var setOverflowHidden = function setOverflowHidden(options) {
  // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
  // the responsiveness for some reason. Setting within a setTimeout fixes this.
  setTimeout(function () {
    // If previousBodyPaddingRight is already set, don't set it again.
    if (previousBodyPaddingRight === undefined) {
      var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
      var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

      if (_reserveScrollBarGap && scrollBarGap > 0) {
        previousBodyPaddingRight = document.body.style.paddingRight;
        document.body.style.paddingRight = scrollBarGap + 'px';
      }
    }

    // If previousBodyOverflowSetting is already set, don't set it again.
    if (previousBodyOverflowSetting === undefined) {
      previousBodyOverflowSetting = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  });
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
  // the responsiveness for some reason. Setting within a setTimeout fixes this.
  setTimeout(function () {
    if (previousBodyPaddingRight !== undefined) {
      document.body.style.paddingRight = previousBodyPaddingRight;

      // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
      // can be set again.
      previousBodyPaddingRight = undefined;
    }

    if (previousBodyOverflowSetting !== undefined) {
      document.body.style.overflow = previousBodyOverflowSetting;

      // Restore previousBodyOverflowSetting to undefined
      // so setOverflowHidden knows it can be set again.
      previousBodyOverflowSetting = undefined;
    }
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};


var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  if (isIosDevice) {
    // targetElement must be provided, and disableBodyScroll must not have been
    // called on this targetElement before.
    if (!targetElement) {
      // eslint-disable-next-line no-console
      console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
      return;
    }

    if (targetElement && !locks.some(function (lock) {
      return lock.targetElement === targetElement;
    })) {
      var lock = {
        targetElement: targetElement,
        options: options || {}
      };

      locks = [].concat(_toConsumableArray(locks), [lock]);

      targetElement.ontouchstart = function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch.
          initialClientY = event.targetTouches[0].clientY;
        }
      };
      targetElement.ontouchmove = function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch.
          handleScroll(event, targetElement);
        }
      };

      if (!documentListenerAdded) {
        document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
        documentListenerAdded = true;
      }
    }
  } else {
    setOverflowHidden(options);
    var _lock = {
      targetElement: targetElement,
      options: options || {}
    };

    locks = [].concat(_toConsumableArray(locks), [_lock]);
  }
};

var clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach(function (lock) {
      lock.targetElement.ontouchstart = null;
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }

    locks = [];

    // Reset initial clientY.
    initialClientY = -1;
  } else {
    restoreOverflowSetting();
    locks = [];
  }
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (isIosDevice) {
    if (!targetElement) {
      // eslint-disable-next-line no-console
      console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
      return;
    }

    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    locks = locks.filter(function (lock) {
      return lock.targetElement !== targetElement;
    });

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);

      documentListenerAdded = false;
    }
  } else {
    locks = locks.filter(function (lock) {
      return lock.targetElement !== targetElement;
    });
    if (!locks.length) {
      restoreOverflowSetting();
    }
  }
};