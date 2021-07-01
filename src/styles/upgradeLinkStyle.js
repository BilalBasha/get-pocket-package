import { css } from "linaria";
import { breakpointLargeHandset } from "../responsive/breakpoints";


const upgradeLinkStyle = css`
    ${breakpointLargeHandset} {
        margin-right: var(--spacing075);

        .icon {
            margin-right: 0;
        }

        .label {
            position: absolute;
            left: -99999px;
        }
    }
`

export default upgradeLinkStyle;