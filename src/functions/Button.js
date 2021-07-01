import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import objectWithoutProperties from '../helpers/objectWithOutProperties';


const Button = React.forwardRef( (props, ref) => {

    const { children, variant, size, href, disabled, className } = props;
    const remainingProps = objectWithoutProperties(props, ["children", "variant", "size", "href", "disabled", "className"]);

    const buttonStyles = "b1344aws";


    const classes = classNames(buttonStyles, className, {
        primary: variant === '' || variant === 'primary',
        secondary: variant === 'secondary',
        emphasized: variant === 'emphasized',
        brand: variant === 'brand',
        inline: variant === 'inline',
        large: size === 'large',
        small: size === 'small',
        disabled: disabled
    });

    const elementProps = {
      className: classes,
      disabled: disabled,
      href: href,
      ref: ref,
      ...remainingProps
    };

    if (href) {
        return (
            <a {...elementProps}>
                {children}
            </a>
        );
    } else {
        return (
            <button {...elementProps}>
                { children }
            </button>
        );
    }
});

Button.propTypes = {
    /**
     * Content of the button (e.g. button label)
     */
    children: PropTypes.node.isRequired,
  
    /**
     * Visual variant of the button, from design standards
     */
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'brand', 'emphasized', 'inline']),
  
    /**
     * Size of the button
     */
    size: PropTypes.oneOf(['normal', 'large', 'small']),
  
    /**
     * Destination url for the button - if provided, will render the button as
     * an anchor styled like a button
     */
    href: PropTypes.string,
  
    /**
     * CSS class name if styles need to be provided/overridden.
     */
    className: PropTypes.string
};

Button.defaultProps = {
    variant: 'primary',
    size: 'normal',
    href: undefined,
    className: null
};

export default Button;