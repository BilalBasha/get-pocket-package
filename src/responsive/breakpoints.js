import {
    screenLargeHandset,
    screenLargeTablet,
    screenMediumDesktop,
    screenMediumHandset,
    screenMediumTablet,
    screenSmallDesktop,
    screenSmallHandset,
    screenSmallTablet,
    screenTinyHandset,
    screenTinyTablet } from "./screenSizes";

const breakpointTinyHandset = "@media (max-width: ".concat(screenTinyHandset, "px)");
const breakpointSmallHandset = "@media (max-width: ".concat(screenSmallHandset, "px)");
const breakpointMediumHandset = "@media (max-width: ".concat(screenMediumHandset, "px)");
const breakpointLargeHandset = "@media (max-width: ".concat(screenLargeHandset, "px)");
const breakpointTinyTablet = "@media (max-width: ".concat(screenTinyTablet, "px)");
const breakpointSmallTablet = "@media (max-width: ".concat(screenSmallTablet, "px)");
const breakpointMediumTablet = "@media (max-width: ".concat(screenMediumTablet, "px)");
const breakpointLargeTablet = "@media (max-width: ".concat(screenLargeTablet, "px)");
const breakpointSmallDesktop = "@media (max-width: ".concat(screenSmallDesktop, "px)");
const breakpointMediumDesktop = "@media (max-width: ".concat(screenMediumDesktop, "px)");

export {
    breakpointTinyHandset,
    breakpointSmallHandset,
    breakpointMediumHandset,
    breakpointLargeHandset,
    breakpointTinyTablet,
    breakpointSmallTablet,
    breakpointMediumTablet,
    breakpointLargeTablet,
    breakpointSmallDesktop,
    breakpointMediumDesktop
};