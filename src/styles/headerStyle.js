import { css } from 'linaria';
import { breakpointLargeTablet, breakpointSmallTablet } from '../responsive/breakpoints';

const headerStyle = css`
    width: 100%;
    background: var(--color-canvas);
    box-shadow: var(--raisedCanvas);
    /*bottom border custom color adds a subtle "shadow" effect */
    border-bottom: solid 1px var(--color-dividerTertiary);
    position: fixed;
    z-index: var(--zIndexTooltip);
    .pocket-logo {
    display: inline-block;
    position: relative;
    margin-right: 6rem;
    margin-left: calc(-1 * var(--spacing075));
    padding: var(--spacing050) var(--spacing050);
    line-height: 1;

    &:focus {
        outline: none;

        &::before {
        content: '';
        display: block;
        position: absolute;
        top: -2px;
        left: -2px;
        bottom: -2px;
        right: -2px;
        border: 2px solid var(--color-actionPrimary);
        border-radius: 4px;
        }
    }

    &:hover,
    &:active {
        &::before {
        display: none;
        }
    }
    }

    .logo-mark {
    display: none;
    }

    ${breakpointSmallTablet} {
    .pocket-logo {
        &:hover {
        cursor: pointer;
        }
    }
    }

    ${breakpointLargeTablet} {
    .pocket-logo {
        margin-right: 1rem;
    }
    &.logged-in {
        .logo {
        display: none;
        }
    }

    &.logged-in .logo-mark {
        display: block;
    }
    .links {
        display: none;
    }
    }

    .global-nav-container {
    padding-top: 0;
    padding-bottom: 0;
    height: var(--size400);
    }
`

export default headerStyle;