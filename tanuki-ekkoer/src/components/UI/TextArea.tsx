import { type TextareaHTMLAttributes, forwardRef } from "react";
/**
* this is the interface for our TextArea component, we extend the default textarea attributes and add our own custom ones, like label and error, this way we can reuse it in different places and alter it by just changing the props we give it.
*
* @interface TextAreaProps
* @extends {TextareaHTMLAttributes<HTMLTextAreaElement>}
*/
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

/**
* Here we create a TextArea component using forwardRef, this allows us to pass a ref to the underlying textarea element, which can be useful for focusing the textarea or getting its value. We also define some custom props like label and error, which we can use to display a label above the textarea and an error message below it if needed. 
* 
* The component is styled using Tailwind CSS classes, and we allow for additional class names to be passed in through the className prop. Finally, we set the displayName of the component for better debugging and readability
* 
* Notice that we use the spread operator (...props) to pass aditional props to the textarea element, this way we can use all the default textarea attributes like placeholder, rows, etc. without having to define them explicitly in our TextAreaProps interface. Moreover, we use id to link the label to the textarea, so when the user clicks on the label the textarea will be focused, this improves user experience and accessibility.
*
* @summary TextArea component
*/
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className = "", label, error, id, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-[var(--color-foreground)]">
                    {label}
                </label>)}
            <textarea
                ref={ref}
                id={id}
                className={`w-full px-4 py-2.5 bg-[var(--color-card)] border border-[var(--color-border)]`}
                {...props} />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
});

TextArea.displayName = "TextArea"


