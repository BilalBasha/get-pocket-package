import { css } from "linaria";

const listStyle = css`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-family: var(--fontSansSerif);
  font-size: var(--fontSize100);
  font-weight: 500;

  li {
    padding: 0;
    margin: 0;
  }

  a {
    display: inline-block;
    padding: 1.25rem;
    text-decoration: none;
    position: relative;

    &:focus {
      outline: 0;

      &::before {
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        left: var(--spacing025);
        right: var(--spacing025);
        top: var(--spacing050);
        bottom: var(--spacing050);
        border: 2px solid var(--color-actionPrimary);
        border-radius: 4px;
      }
    }

    &:hover {
      &::before {
        display: none;
      }
    }

    &:active {
      color: var(--color-actionPrimaryHover);

      &::before {
        display: none;
      }
    }

    &.selected {
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0.625rem;
        right: 0.625rem;
        height: 4px;
        background-color: var(--color-actionPrimary);
      }

      &:active::after {
        background-color: var(--color-actionPrimaryHover);
      }
    }
  }
`

export default listStyle;