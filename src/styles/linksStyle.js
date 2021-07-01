import { css } from "linaria";
import { fontSansSerif } from "../responsive/fonts";
import { fontSize100 } from "../responsive/fontSizes";

const linksStyle = css`
  flex-grow: 2;
  justify-content: flex-start;
  display: flex;
  line-height: 1;
  white-space: nowrap;
  font-family: ${fontSansSerif};

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: ${fontSize100};
  }

  li {
    display: inline-block;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    line-height: 1.5rem;
  }
`

export default linksStyle;