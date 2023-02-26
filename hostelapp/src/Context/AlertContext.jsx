import { createContext, useState } from "react";

export const AlertContext = createContext();

const AlertProvider = ({children}) => {
    const [isSignupAlert , setisSignupAlert] = useState(false);
    const [isDeleteAlert , setisDeleteAlert] = useState(false);

    return(
        <AlertContext.Provider value={{isSignupAlert , setisSignupAlert , isDeleteAlert , setisDeleteAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider;