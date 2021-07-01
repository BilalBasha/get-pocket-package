import { css } from "linaria";

const buttonStyles = css`
  background: var(--color-actionPrimarySubdued);
  border-radius: 50%;
  margin: 0;
  padding: 0;
  color: var(--color-textPrimary);
  position: relative;

  span.default {
    transition: all 0.1s ease-out;
  }

  span.with-image {
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: all 0.1s ease-out;
      opacity: 0;
    }
  }

  &:focus {
    outline: none;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -4px;
      bottom: -4px;
      left: -4px;
      right: -4px;
      border-radius: 50%;
      border: 2px solid var(--color-actionPrimary);
    }
  }

  &:hover {
    background: none;

    & span.default {
      color: var(--color-textLinkHover);
    }

    & span.with-image {
      &::after {
        background-color: var(--color-actionPrimary);
        opacity: 0.38;
      }
    }
  }

  &:active {
    & span.default {
      color: var(--color-textLinkPressed);
    }

    & span.with-image {
      &::after {
        background-color: var(--color-actionPrimaryHover);
        opacity: 38%;
      }
    }
  }
`

export default buttonStyles;