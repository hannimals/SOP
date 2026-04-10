import { AuthView } from "@neondatabase/neon-js/auth/react";
import { useParams } from "react-router-dom";

export default function Auth() {
    /** 
 * this is the Auth function where we use neondatabase to handle user sing-in ans sign-up.
 * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
 * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
 * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
 */
    const { pathname } = useParams(); /*hook of reack dom */
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
            <div className="max-w-md w-full">
                <AuthView pathname={pathname} />
            </div>
        </div>)
}