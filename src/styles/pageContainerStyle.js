import { css } from 'linaria';
import { breakpointLargeHandset, breakpointTinyTablet } from '../responsive/breakpoints';

const pageContainerStyle = css`e
    box-sizing: content-box;
    margin: 0 auto;
    max-width: 1128px;
    padding: var(--spacing250);
    ${breakpointTinyTablet} {
        padding:var(--spacing250) var(--spacing150);
    }
    ${breakpointLargeHandset} {
        padding:var(--spacing150) var(--spacing100);
    }
`

export default pageContainerStyle;