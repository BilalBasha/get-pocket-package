import { css } from "linaria";
import { breakpointLargeHandset } from "../responsive/breakpoints";

const accountLinkStyle = css`
  display: inline-block;
  position: relative;
  padding: var(--spacing075) var(--spacing050);
  margin-right: var(--spacing150);
  vertical-align: middle;
  line-height: 110%;
  font-family: var(--fontSansSerif);
  font-weight: 500;
  text-decoration: none;

  &:focus {
    outline: 0;

    &::before {
      content: '';
      display: block;
      box-sizing: border-box;
      position: absolute;
      left: -2px;
      right: -2px;
      top: -2px;
      bottom: -2px;
      border: 2px solid var(--color-actionPrimary);
      border-radius: 4px;
    }
  }

  &:hover {
    text-decoration: none;

    &::before {
      display: none;
    }
  }

  &:active {
    &::before {
      display: none;
    }
  }

  .icon {
    height: 1.5rem;
    margin-right: var(--spacing050);
  }
  ${breakpointLargeHandset} {
    &.login-link {
      display: none;
    }
  }
`

export default accountLinkStyle;