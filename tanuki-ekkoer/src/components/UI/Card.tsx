
import { type HTMLAttributes, forwardRef } from "react";

/**
*parameters that our card accepts, we extend the default div attributes and add our own custom ones, like variant and size, this way we can reuse it in different places and alter it by just changing the props we give it.
*
* @interface Cardprops
* @extends {HTMLAttributes<HTMLDivElement>}
*/
interface Cardprops extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "bordered";
    size?: "sm" | "md" | "lg";
}


/**
* Here we create our card component in a way we can reuse it and alter it by varying between its atributes.
*
* @summary Card component
* @interface Cardprops
*/
export const Card = forwardRef<HTMLDivElement, Cardprops>(
    (props, ref) => {
        const { className = "", variant = "default", size = "md", children, ...restprops } = props;
        const variants = {
            default: "bg-[var(--color-card)]",
            bordered: "bg-[var(--color-card)] border border[var(--color-border)]",
        };
        const sizes = {
            sm: "max-w-[75] max-h-[25]",
            md: "max-w-[60] max-h-[150]",
            lg: "max-w-[150] max-h-[450]",
        };
        return (<div ref={ref}
            className={`rounded-2xl p-6 ${variants[variant]} ${sizes[size]} ${className} `}
            {...restprops}>
            {children}

        </div>
        );
    }

);

Card.displayName = "Card";

