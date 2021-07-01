import { css } from 'linaria';
import pocketLogoSvgLightMode from '../assets/pocket-logo-light-mode.9a20614bbcbaf69b221df81a80daa73d.svg';
import pocketLogoSvgDarkMode from '../assets/pocket-logo-dark-mode.a24d9ec3c81b642354a61fe27ae9edfb.svg';

const logoStyle = css`
    background:no-repeat url(${pocketLogoSvgLightMode});
    background-size:contain;
    width:94px;
    height:24px
    .colormode-dark & {
        background-image:url(${pocketLogoSvgDarkMode})
    }
`;

const logoLabelStyle = css`
    border:0;
    -webkit-clip-path:polygon(0 0,0 0,0 0);
    clip-path:polygon(0 0,0 0,0 0);
    height:1px;
    margin:-1px;
    overflow:hidden;
    padding:0;
    position:absolute;
    width:1px;
    white-space:nowrap
`;

export {
    logoStyle,
    logoLabelStyle
}