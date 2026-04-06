import { type ButtonHTMLAttributes, forwardRef } from "react";

/*parameters that our button accepts*/
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}
/* Forwardreffunction<Whattypeofelementweareworkingwith, whattypeofpropswearegivingit>((theparameters wetake)*/
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    /*the default values of the button props */
    const { className = "", variant = "primary", size = "md", children, ...restprops } = props;
    const baseStyles =
        "inline-flex items-center justify-center font-medium transition-colors rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
        primary:
            "bg-[var(--color-accent)] text-black hover:bg-[var(--color-accentHover)]",
        secondary:
            "bg-[var(--color-card)] text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-[var(--color-border)]",
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