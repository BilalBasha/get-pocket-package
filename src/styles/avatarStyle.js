import { css } from "linaria";
import { darkMode } from "../constants";

const avatarStyle = css`
  display: block;
  overflow: hidden;
  border-radius: 50%;
  position: relative;

  &.with-image {
    &::before {
      content: '';
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
  }

  &.default {
    background: var(--color-actionPrimarySubdued);
  }
  ${darkMode} {
    &.with-image {
      &::before {
        border: 1px solid rgba(255, 255, 255, 0.12);
      }
    }
  }
  
`

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  color: transparent;
`

const defaultStyle = css`
  height: 60%;
  position: absolute;
  margin-top: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export {
    avatarStyle,
    imageStyle,
    defaultStyle
};