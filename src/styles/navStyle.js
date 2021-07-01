import { css } from "linaria";
import { breakpointLargeTablet } from "../responsive/breakpoints";

const navStyle = css`
  display: flex;
  align-items: center;
  height: 100%;

  .site-nav {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  .hamburger-icon {
    display: none;
  }

  ${breakpointLargeTablet} {
    .hamburger-icon {
      display: block;
      margin-left: calc(-1 * var(--spacing075));
    }
  }
`

export default navStyle;