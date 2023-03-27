import { createContext , useState  } from "react";
export const Authcontext = createContext();

const AuthProvider = (props) => {
    const [Islogged , setIslogged] = useState(
        localStorage.getItem('Token') !== null
    );
    const [isUserData , setisUserData] = useState([]);
    const [isEditIndex , setisEditIndex] = useState(0);
    const [isForcerender , setisForcerender] = useState(0);
    
    return(
        <Authcontext.Provider value={{Islogged , setIslogged , isUserData , setisUserData , isEditIndex , setisEditIndex , isForcerender , setisForcerender}}>
            {props.children}
        </Authcontext.Provider>
    )
}

export default AuthProvider;