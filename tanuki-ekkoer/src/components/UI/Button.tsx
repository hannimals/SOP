import { type ButtonHTMLAttributes, forwardRef } from "react";
/**
* parameters that our button accepts (the defualt button atributes + custom ones like variant and size)
*
* @interface ButtonProps
* @extends {ButtonHTMLAttributes<HTMLButtonElement>}
*/


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}
/**
* This is a reusable button component that we can use throughout our application. It accepts all the standard button props, as well as custom props for variant and size. The variant prop determines the styling of the button (primary, secondary, or ghost), while the size prop determines the padding and font size (small, medium, or large). 
* 
* It implements forwardref which allows us to pass a ref to the parent component and acsess the underlying button element. this work because in react we create a component that wraps the native DOM element (in this case, a button), and we want to be able to access that DOM element directly from the parent component. By using forwardRef, we can pass a ref from the parent component down to the button component, and then attach that ref to the underlying button element. This allows us to call methods on the button element (like focus or click) directly from the parent component.
* 
* Our button is = Forwardreffunction<Whattypeofelementweareworkingwith, whattypeofpropswearegivingit>((theparameters wetake) => defaultvaluesforourprops)} returns (the JSX of our button) *JSX means the html like syntax of our components that gets tranformed into regular javascript by react*
* @summary Button component
* 
*/

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    /*the default values of the button props */
    const { className = "", variant = "primary", size = "md", children, ...restprops } = props;
    const baseStyles =
        "inline-flex items-center justify-center font-medium transition-colors rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
        primary:
            "bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)]",
        secondary:
            "bg-[var(--color-card)] text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-white",
        ghost:
            "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-card)]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-8 py-3 text-lg",
    };
    return (
        <button
            ref={ref}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...restprops}
        >
            {children}
        </button>
    );

});