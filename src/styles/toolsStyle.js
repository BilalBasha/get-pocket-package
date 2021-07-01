import { css } from "linaria";

const toolsStyle = css`
  margin-right: var(--spacing100);
  padding-right: var(--spacing100);
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 20%;
    right: 0;
    width: 1px;
    height: 60%;
    border-right: var(--dividerStyle);
  }

  &.is-premium {
    padding-right: 0;

    &::after {
      display: none;
    }
  }
`

export default toolsStyle;