import { css } from "linaria";
import { breakpointLargeHandset } from "../responsive/breakpoints";

const signupLinkStyle = css`
  font-weight: 500;
  vertical-align: middle;

  .icon {
    display: none;
  }
  ${breakpointLargeHandset} {
    // needed specificity to override secondary variant styles
    &.secondary {
      border: none;
  
      &:hover {
        background: none;
        color: var(--color-textLinkHover);
      }
  
      &:active {
        color: var(--color-textLinkPressed);
      }
  
      .label {
        position: absolute;
        left: -99999px;
      }
  
      .icon {
        height: var(--fontSize150);
        display: inline-block;
        margin-top: 0;
      }
    }
  }
`

export default signupLinkStyle;