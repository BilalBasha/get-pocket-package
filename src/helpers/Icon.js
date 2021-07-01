import React from 'react';
import { css } from 'linaria';
import classNames from 'classnames';

const Icon = ({ children, className, id, title, description }) => {

    let iconStyle = css`{
        display:inline-block;
        height:1em;
        line-height:0;
        vertical-align:middle;
        margin-top:-.25em
        svg {
          height:100%
        }
    }`;

    const ariaTitle = '';
    const ariaDescription = '';

    return (
        <span className={ classNames(iconStyle, className) }>
            { React.cloneElement(
                    children,
                    {
                    // note: only pass valid html/svg attributes here
                    "aria-labelledby": ""
                        .concat(ariaTitle, " ")
                        .concat(ariaDescription)
                    }, // accessibility tags are passed as children
                    [
                    title
                        ? /*#__PURE__*/ React.createElement(
                            "title",
                            {
                            id: "".concat(id, "-title"),
                            key: "".concat(id, "-title")
                            },
                            title
                        )
                        : null,
                    description
                        ? /*#__PURE__*/ React.createElement(
                            "desc",
                            {
                            id: "".concat(id, "-description"),
                            key: "".concat(id, "-description")
                            },
                            description
                        )
                        : null
                    ]
                )
            }
        </span>
    )
}

export default Icon;