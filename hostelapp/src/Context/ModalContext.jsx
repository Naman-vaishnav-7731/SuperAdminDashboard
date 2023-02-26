import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({children })  => {

    const [isSignupShow , setisSignupShow ] = useState(false);
    const [isSigninShow , setisSigninShow] = useState(false);
    const [isEditShow , setisEditShow] = useState(false);
    return(
        <ModalContext.Provider value={{isSignupShow , setisSignupShow , isSigninShow , setisSigninShow,isEditShow , setisEditShow}}>
            {children}
        </ModalContext.Provider>
    )
}
export default ModalProvider;
export {ModalContext};