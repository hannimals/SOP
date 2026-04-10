import { type SelectHTMLAttributes, forwardRef } from "react";
/**
* this is the options the user has to select, we create it in a way where the user can easily add more options by just adding to the array, and we can reuse it in different places by just changing the options we give it.
*
* @interface SelectOption

*/
interface SelectOption {
    value: string;
    label: string;
}

/**
* this are the parameters our select component accepts, we extend the default select attributes and add our own custom ones, like label, error and options, this way we can reuse it in different places and alter it by just changing the props we give it.
*
* @interface Selectprops
* @implements {SelectOption}
* @extends {SelectHTMLAttributes<HTMLSelectElement>}
*/
interface Selectprops extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
}

/**
*As we export our Select component, notice how we dont give it default values for its propts as the user is the one who wil create those values by selecting a component.
We then create a map of what the user selects and we show the label of the option they selected (the value is what we use to know what they selected and the label is what we show to the user) and if there is an error we show it to the user as well.
*
* @summary Select component
* @interface Selectprops
* @implements {SelectOption, SelectHTMLAttributes<HTMLSelectElement>, forwardref}
*/
export const Select = forwardRef<HTMLSelectElement, Selectprops>(({ className = "", label, error, id, options, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (<label htmlFor={id} className="text-sm font-medium text-[var(--color-foreground)]"
            >
                {label}
            </label>
            )}
            <select ref={ref}
                id={id}
                className={`w-full px-4 py-2.5 bg-[var(--color-card)] border border(--color-border) rounded-xl text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-accent)] transition-colors cursor-pointer ${className}`}
                {...props}
            > {options.map((option) => (<option key={option.value} value={option.value}>
                {option.label}
            </option>))}

            </select>
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div> /* if there is an error we show it*/
    );
});



Select.displayName = "select" 