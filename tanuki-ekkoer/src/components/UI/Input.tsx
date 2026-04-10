
import { type InputHTMLAttributes, forwardRef } from "react";
/**
* The parameters that our input component acepts. (standart html + custom ones)
* @interface Inputprops
* @extends {InputHTMLAttributes<HTMLInputElement>}
*/
interface Inputprops extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

/**
* This is a reusable input component that we can use throughout our application. It accepts all the standard input props, as well as a label and an error message. The label is displayed above the input field, and the error message is displayed below it. The input field is styled with Tailwind CSS classes, and it changes its border color when focused. The component also forwards the ref to the underlying input element, allowing us to access it directly if needed.
*
* The `id` prop is used to associate the label with the input field. When the label's `htmlFor` attribute matches the input's `id`, clicking on the label will focus the input field, improving accessibility and user experience.
* the inputs id is the name of the input field, each input should have a unique id.
* @summary Input component
*/

export const Input = forwardRef<HTMLInputElement, Inputprops>(({ className = "", label, error, id, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-[var(--color-foreground)]">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                className={`w-full px-4 py-2.5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors ${className}`}
                {...props}
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
});

Input.displayName = "input"